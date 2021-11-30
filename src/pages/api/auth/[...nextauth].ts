import { query as q } from "faunadb";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { fauna } from "../../../services/fauna";

interface IUser {
  email: string;
  name: string;
  avatar_url: string;
}
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { email, image, name } = user;

      try {
        await fauna.query(
          q.If(
            // Condição
            q.Not(
              q.Exists(q.Match(q.Index("users_by_email"), q.Casefold(email)))
            ),
            // Se não existir, cria o usuário
            q.Create(q.Collection("users"), {
              data: {
                email,
                name,
                image,
              },
            }),
            // Se existir, atualiza o usuário
            q.Get(q.Match(q.Index("users_by_email"), q.Casefold(email)))
          )
        );

        return true;
      } catch (e) {
        console.log("error", e);
        return false;
      }
    },
  },
});
