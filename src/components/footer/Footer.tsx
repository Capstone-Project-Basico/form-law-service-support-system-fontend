import styles from "./footer.module.css";

const Footer = () => {
  return (
    // <div className={styles.container}>
    <div className="flex bg-[#222] text-[#838383] h-[85px] justify-center items-center">
      <p className="text-[16px]">
        Copyright © 2008 - 2024{" "}
        <a href="/" className="text-white hover:text-[#ff0000]">
          Basico
        </a>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
