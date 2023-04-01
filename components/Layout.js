import Navbar from "@/components/navbar";
import styles from "@/styles/Layout.module.css";

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
