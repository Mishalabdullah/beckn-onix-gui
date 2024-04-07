"use client";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import styles from "../../page.module.css";
import { Ubuntu_Mono } from "next/font/google";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField/InputField";
import { useState, useCallback } from "react";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  const [registryUrl, setRegistryUrl] = useState("");

  const handleRegistryUrlChange = (event) => {
    setRegistryUrl(event.target.value);
  };

  const installRegistry = useCallback(async () => {
    try {
      const response = await fetch("/api/install-registry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registryUrl: registryUrl,
        }),
      });
      if (response.ok) {
        console.log("Repository cloned successfully");
      } else {
        console.error("Failed to clone repository");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [registryUrl]); // Added dependencies to useCallback

  return (
    <>
      <main className={ubuntuMono.className}>
        <div className={styles.mainContainer}>
          <p className={styles.mainText}>Registry</p>
          <div className={styles.formContainer}>
            <InputField
              label={"Public Registry URL"}
              value={registryUrl}
              onChange={handleRegistryUrlChange}
            />
            <div className={styles.buttonsContainer}>
              <SecondaryButton text={"Cancel"} />
              <PrimaryButton onClick={installRegistry} text={"Continue"} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
