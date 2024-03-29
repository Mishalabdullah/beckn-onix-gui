"use client"

import InputField from "@/components/InputField/InputField";
import styles from "../../page.module.css";
import { Ubuntu_Mono } from "next/font/google";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { usePathname } from 'next/navigation'

const ubuntuMono = Ubuntu_Mono({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

export default function Home() {
    let pathname = usePathname()

    return (
        <>
            <main className={ubuntuMono.className}>
                <div className={styles.mainContainer}>
                    <p className={styles.currentRoute}>ONIX{pathname}</p>
                    <p className={styles.mainText}>BAP</p>
                    <div className={styles.formContainer}>
                        <InputField label={"Subscriber ID"} />
                        <InputField label={"Subscriber URL"} />
                        <InputField label={"Registry URL"} />
                        <InputField label={"Network configuration URL"} />

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
