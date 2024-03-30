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
          <p className={styles.mainHeading}>ONIX</p>
          <p className={styles.mainText}>
            Open Network In A Box, is a project designed to effortlessly set up
            and maintain Beckn network that is scalable, secure and easy to
            maintain.
          </p>
          <div className={styles.boxesContainer}>
            <Link
              href="/join"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>Join an existing network</p>
              </div>
            </Link>
            <Link
              href="/create"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>Create new production network</p>
              </div>
            </Link>
            <Link
              href="/local"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>
                  Set up a network on your local machine
                </p>
              </div>
            </Link>
            <Link
              href="/merge"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>Merge multiple networks</p>
              </div>
            </Link>
            <Link
              href="/configure"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className={styles.box}>
                <img src="/arrow.png" />
                <p className={styles.boxText}>Configure Existing Network</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
