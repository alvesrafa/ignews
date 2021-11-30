import { signIn, useSession } from "next-auth/client";
import { apiNextRoute } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButton {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButton) {
  const [session] = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn();
    }

    try {
      const response = await apiNextRoute.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (e) {
      alert(e.message);
      console.error("Falha", e);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButtonContainer}
      onClick={handleSubscribe}>
      Inscreva-se agora
    </button>
  );
}
