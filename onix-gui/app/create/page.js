import Link from "next/link";
import styles from "../page.module.css";
import { Ubuntu_Mono } from "next/font/google";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <main className={ubuntuMono.className}>
        <div className={styles.mainContainer}>
          <p className={styles.mainText}>Create a Production Network</p>
          <div className={styles.boxesContainer}>
            <Link
              href="/setup/gateway"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>Gateway</p>
              </div>
            </Link>
            <Link href="/setup/bap">
              <div
                className={styles.box}
                style={{ textDecoration: "none", color: "white" }}
              >
                <img src="/arrow.png" />
                <p className={styles.boxText}>BAP</p>
              </div>
            </Link>
            <Link href="/setup/bpp">
              <div
                className={styles.box}
                style={{ textDecoration: "none", color: "white" }}
              >
                <img src="/arrow.png" />
                <p className={styles.boxText}>BPP</p>
              </div>
            </Link>
            <Link
              href="/setup/registry"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>Registry</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
