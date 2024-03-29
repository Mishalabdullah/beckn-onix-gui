import styles from "../../page.module.css";
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
                    <p className={styles.mainText}>Registry</p>
                    <div className={styles.formContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>
                                Public Registry URL
                            </label>
                            <input className={styles.inputField} type="text" />
                        </div>

                        <div className={styles.buttonsContainer}>
                            <button className={styles.cancelButton}>
                                Cancel
                            </button>

                            <button className={styles.submitButton}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
