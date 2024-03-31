"use client";

import InputField from "@/components/InputField/InputField";
import styles from "../../page.module.css";
import { Ubuntu_Mono } from "next/font/google";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  let pathname = usePathname();

  const installGateway = useCallback(async () => {
    try {
      // This response var is calling the API endpoint that clones the repository
      const response = await fetch("/api/clonning-repo");
      if (response.ok) {
        console.log("Repository cloned successfully");
      } else {
        console.error("Failed to clone repository");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  return (
    <>
      <main className={ubuntuMono.className}>
        <div className={styles.mainContainer}>
          <p className={styles.currentRoute}>ONIX{pathname}</p>
          <p className={styles.mainText}>Gateway</p>
          <div className={styles.formContainer}>
            <InputField label={"Publicly Accessible Gateway URL"} />
            <InputField label={"Registry URL"} />
            <InputField label={"Network Configuration URL"} />

            <div className={styles.buttonsContainer}>
              <SecondaryButton text={"Cancel"} />
              <PrimaryButton onClick={installGateway} text={"Continue"} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
