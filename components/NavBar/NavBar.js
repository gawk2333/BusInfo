import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.nav}>
        <h3>Home</h3>
      </Link>
      <Link href="/map" className={styles.nav}>
        <h3>Map</h3>
      </Link>
    </div>
  );
}
