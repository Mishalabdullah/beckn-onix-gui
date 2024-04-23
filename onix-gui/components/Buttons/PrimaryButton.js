import React from "react";
import styles from "./Buttons.module.css";

const PrimaryButton = ({ label = "continue", onClick }) => {
  return (
    <button className={styles.primaryButton} onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
