import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLogged = true;

  return isUserLogged ? (
    <button className={styles.signInButtonContainer}>
      <FaGithub color="#04d361" /> Rafael Alves{" "}
      <FiX color="737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButtonContainer}>
      <FaGithub color="#eba417" /> Entrar com Github
    </button>
  );
}
