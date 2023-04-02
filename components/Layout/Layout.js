import Navbar from "@/components/navbar";
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
