import styles from "./home.module.scss";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Olá, bem-vindo(a)</span>
          <h1>
            Novidades sobre o mundo do <span>React</span>. <br />
          </h1>
          <p>
            Tenha acesso a todas as postagens
            <span> por R$9,99/mês</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Garota desenvolvendo" />
      </main>
    </>
  );
}
