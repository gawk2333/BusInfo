import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.grid}>
      <a href="/map" className={styles.card}>
        <h2 className={inter.className}>
          Map <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Find the bus stop number from the map.
        </p>
      </a>
    </div>
  );
}
