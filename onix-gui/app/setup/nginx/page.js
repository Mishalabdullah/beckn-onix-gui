"use client";

import InputField from "@/components/InputField/InputField";
import styles from "../../page.module.css";
import { Ubuntu_Mono } from "next/font/google";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Nginx() {
  const [serverName, setServerName] = useState("");
  const [proxyname, setProxyName] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleSubscriberUrlChange = (event) => {
    setServerName(event.target.value);
  };

  const handleSubscriberIdChange = (event) => {
    setProxyName(event.target.value);
  };

  const installBap = useCallback(async () => {
    const toastId = toast.loading("Installing BAP...");
    setButtonDisable(true);
    try {
      const response = await fetch("/api/install-bap");
      if (response.ok) {
        console.log("BPP installed successfully");
        toast.update(toastId, {
          render: "BPP installed successfully 👌",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        console.error("Failed to install BAP");
        toast.update(toastId, {
          render: "Failed to install BAP 🤯",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.update(toastId, {
        render: "Bap installation done",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setButtonDisable(false);
  }, [serverName, proxyname]);

  return (
    <>
      <main className={ubuntuMono.className}>
        <div className={styles.mainContainer}>
          <button
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            Back
          </button>
          <p className={styles.mainText}>Setting Up Nginx</p>
          <div className={styles.formContainer}>
            <InputField
              label={"Proxy server for"}
              value={proxyname}
              onChange={handleSubscriberIdChange}
            />
            <InputField
              label={"Server Name"}
              value={serverName}
              onChange={handleSubscriberUrlChange}
            />

            <div className={styles.buttonsContainer}>
              {/* <SecondaryButton text={"Cancel"} /> */}
              <PrimaryButton
                disabled={buttonDisable}
                onClick={installBap}
                text={"Continue"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
