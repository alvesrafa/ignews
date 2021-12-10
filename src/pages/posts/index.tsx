import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postList}>
          <a>
            <time>12 de março de 2021</time>
            <strong>Titulo</strong>
            <p>breve paragrafo</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Titulo</strong>
            <p>breve paragrafo</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Titulo</strong>
            <p>breve paragrafo</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Titulo</strong>
            <p>breve paragrafo</p>
          </a>
        </div>
      </main>
    </>
  );
}
