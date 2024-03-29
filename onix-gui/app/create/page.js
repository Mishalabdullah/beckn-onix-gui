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
                    <p className={styles.mainText}>
                        Create a Production Network
                    </p>
                    <div className={styles.boxesContainer}>
                        <div className={styles.box}>
                            <img src="/arrow.png" />
                            <p className={styles.boxText}>Gateway</p>
                        </div>
                        <div className={styles.box}>
                            <img src="/arrow.png" />
                            <p className={styles.boxText}>BAP</p>
                        </div>
                        <div className={styles.box}>
                            <img src="/arrow.png" />
                            <p className={styles.boxText}>BPP</p>
                        </div>
                        <div className={styles.box}>
                            <img src="/arrow.png" />
                            <p className={styles.boxText}>Registry</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
