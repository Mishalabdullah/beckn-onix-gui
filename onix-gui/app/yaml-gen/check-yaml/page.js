"use client";
import { useState } from "react";
import { Ubuntu_Mono } from "next/font/google";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/InputField/InputField";
import Slider from "@/components/Slider/Slider";
import styles from "../../page.module.css";
import { toast } from "react-toastify";
import Link from "next/link";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function CheckYaml() {
  const [checked, setChecked] = useState(false);
  const [propertyLink, setPropertyLink] = useState("");

  const handleYamlChange = (event) => {
    setPropertyLink(event.target.value);
  };

  const handleOnclick = async () => {
    const toastId = toast.loading("Installing BAP...");
    try {
      const response = await toast.promise(
        fetch("/api/check-layer2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checked }),
        }),
        {
          success: "Layer 2 present",
          error: "Layer 2 not present",
        }
      );
      console.log("the response", response);
      if (response.ok) {
        console.log("BPP installed successfully");
        toast.update(toastId, {
          render: "Layer 2 present",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        console.error("Failed to install BPP");
        toast.update(toastId, {
          render: "Layer 2 not present",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.update(toastId, {
        render: "Layer 2 not present",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <main className={ubuntuMono.className}>
        <div className={styles.mainContainer}>
          <p className={styles.mainText}>
            <b>Yaml File Checker</b>
          </p>

          <div className={styles.formContainer}>
            <Slider
              label={checked ? "BPP" : "BAP"}
              checked={checked}
              toggleChecked={setChecked}
            />
            <InputField
              label={"Container Name"}
              value={checked ? "bpp-network" : "bap-network"}
            />
            {/* <InputField
              label={"Yaml  Link"}
              value={propertyLink}
              onChange={handleYamlChange}
            /> */}

            <div className={styles.buttonsContainer}>
              <PrimaryButton text={"Continue"} onClick={handleOnclick} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
