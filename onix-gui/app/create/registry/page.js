import SecondaryButton from "@/components/Buttons/SecondaryButton";
import styles from "../../page.module.css";
import { Ubuntu_Mono } from "next/font/google";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField/InputField";

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
                        <InputField label={"Public Registry URL"} />

                        <div className={styles.buttonsContainer}>
                            <SecondaryButton text={"Cancel"} />
                            <PrimaryButton text={"Continue"} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
