// design on XD: https://xd.adobe.com/view/d359e3d4-a5db-45fa-9417-27756a1e1642-860a/specs/
import React from "react";
import styles from "./styles.module.scss";
import {
  AuctionDetails,
  AuctionPrices,
  AuctionStatus,
  Competitors,
  ContactSeller,
  CoverSlides,
} from "..";

const HomeLandingPage = () => {
  return (
    <main className={`${styles.main} container`}>
      <div className="col">
        <CoverSlides />
      </div>
      <div className="col lg">
        <AuctionDetails />
        <ContactSeller />
      </div>
      <div className="col w-[320px] flex flex-col gap-5">
        <AuctionStatus />
        <Competitors />
        <AuctionPrices />
      </div>
    </main>
  );
};

export default HomeLandingPage;
