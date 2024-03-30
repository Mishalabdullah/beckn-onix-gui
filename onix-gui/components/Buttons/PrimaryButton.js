import React from "react";
import styles from "./Buttons.module.css";

const PrimaryButton = ({ label, onClick }) => {
  return (
    <button className={styles.primaryButton} onClick={onClick}>
      Continue
    </button>
  );
};

export default PrimaryButton;
