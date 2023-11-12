import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { HeaderSearchBox } from "@components";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <HeaderSearchBox />
        <Image
          src="/images/logo.png"
          alt="Mazaady's logo"
          width={109}
          height={35}
          priority={true}
        />
      </div>
    </div>
  );
};

export default Header;
