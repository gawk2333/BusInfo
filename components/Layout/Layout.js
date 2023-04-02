import Navbar from "@/components/NavBar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <main className={styles.main}>
        <Navbar />
        {children}
      </main>
    </>
  );
}
