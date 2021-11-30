import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

interface UserFauna {
  ref: {
    id: string;
  };
  data: {
    stripeCustomerId: string;
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user } = await getSession({ req });

    const userFauna = await fauna.query<UserFauna>(
      q.Get(q.Match(q.Index("users_by_email"), q.Casefold(user.email)))
    );

    if (!userFauna.data) throw new Error("User not found");

    let costumerId = userFauna.data.stripeCustomerId || null;

    if (!costumerId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), userFauna.ref.id), {
          data: {
            stripeCustomerId: costumerId,
          },
        })
      );

      costumerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: costumerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1JkvFSDtn5sEhF6Wjju3omyx",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: `${process.env.FRONT_URL}/posts`,
      cancel_url: process.env.FRONT_URL,
    });

    return res.status(201).json({
      sessionId: stripeCheckoutSession.id,
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
