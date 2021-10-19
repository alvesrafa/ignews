import { signIn, useSession, signOut } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const [session] = useSession();
  const { user } = session;
  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  return session ? (
    <button className={styles.signInButtonContainer} onClick={handleSignOut}>
      <FaGithub color="#04d361" /> {user.name}
      <FiX color="737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButtonContainer} onClick={handleSignIn}>
      <FaGithub color="#eba417" /> Entrar com Github
    </button>
  );
}
