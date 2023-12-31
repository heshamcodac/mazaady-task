import React from "react";
import styles from "./styles.module.scss";
import { Icon, Typography } from "..";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <ul>
          <Typography as="li">الرئيسية</Typography>
          <Typography as="li">
            <Link href="/categories">التصنيفات</Link>
          </Typography>
          <Typography as="li">مشترياتى</Typography>
          <Typography as="li">حسابى</Typography>
        </ul>
        <div className="nav-icons">
          <div className="icon-wrapper">
            <Icon name="priceExchange" fillColor="white" />
          </div>
          <div className="icon-wrapper">
            <Icon name="bell" fillColor="white" />
          </div>
          <div className="icon-wrapper">
            <Icon name="heart" fillColor="white" />
          </div>
          <div className="lang-switcher">
            <Typography>عربية</Typography>
            <Icon name="chevronArrow" strokeColor="white" size={16} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
