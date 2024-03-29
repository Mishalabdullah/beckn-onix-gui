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
                    <p className={styles.mainText}>Join an existing network</p>
                    <div className={styles.boxesContainer}>
                        <Link
                            href="/join/gateway"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <div className={styles.box}>
                                <img src="/arrow.png" />
                                <p className={styles.boxText}>Gateway</p>
                            </div>
                        </Link>
                        <Link
                            href="/join/bap"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <div className={styles.box}>
                                <img src="/arrow.png" />
                                <p className={styles.boxText}>BAP</p>
                            </div>
                        </Link>
                        <Link
                            href="/join/bpp"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <div className={styles.box}>
                                <img src="/arrow.png" />
                                <p className={styles.boxText}>BPP</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
