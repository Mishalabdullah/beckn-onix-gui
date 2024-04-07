"use client";

import InputField from "@/components/InputField/InputField";
import styles from "../../page.module.css";
import { Ubuntu_Mono } from "next/font/google";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  let pathname = usePathname();
  const [subscriberUrl, setSubscriberUrl] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [registryUrl, setRegistryUrl] = useState("");
  const [networkconfigurl, setNetworkconfigurl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const handleSubscriberUrlChange = (event) => {
    setSubscriberUrl(event.target.value);
  };

  const handleSubscriberIdChange = (event) => {
    setSubscriberId(event.target.value);
  };

  const handleRegistryUrlChange = (event) => {
    setRegistryUrl(event.target.value);
  };
  const handleNetworkconfigurlChange = (event) => {
    setNetworkconfigurl(event.target.value);
  };
  const handleWebhookUrlChange = (event) => {
    setWebhookUrl(event.target.value);
  };

  const installBpp = useCallback(async () => {
    try {
      const response = await fetch("/api/install-bpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberUrl: subscriberUrl,
          subscriberId: subscriberId,
          registryUrl: registryUrl,
          networkconfigurl: networkconfigurl,
          webhookUrl: webhookUrl,
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
  }, [subscriberUrl, subscriberId, registryUrl, networkconfigurl]); // Added dependencies to useCallback

  return (
    <>
      <main className={ubuntuMono.className}>
        <div className={styles.mainContainer}>
          <p className={styles.currentRoute}>ONIX{pathname}</p>
          <p className={styles.mainText}>BAP</p>
          <div className={styles.formContainer}>
            <InputField
              label={"Subscriber ID"}
              value={subscriberId}
              onChange={handleSubscriberIdChange}
            />
            <InputField
              label={"Subscriber URL"}
              value={subscriberUrl}
              onChange={handleSubscriberUrlChange}
            />

            <InputField
              label={"Registry URL"}
              value={registryUrl}
              onChange={handleRegistryUrlChange}
            />
            <InputField
              label={"Webhook URL"}
              value={webhookUrl}
              onChange={handleWebhookUrlChange}
            />
            <InputField
              label={"Network Configuration URL"}
              value={networkconfigurl}
              onChange={handleNetworkconfigurlChange}
            />

            <div className={styles.buttonsContainer}>
              <SecondaryButton text={"Cancel"} />
              <PrimaryButton onClick={installBpp} text={"Continue"} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
