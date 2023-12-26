import { Avatar, Typography } from "@components";
import React from "react";
import { colors } from "tailwind.config";
import styles from "./styles.module.scss";

const AuctionStatus = () => {
  return (
    <div className={styles["auction-status"]}>
      <div className="broadcast-date">
        <Typography as="small" color={colors.white}>
          تاريخ البث
        </Typography>
        <Typography color={colors.white}>22-1-2022</Typography>
      </div>
      <div className="current-prices">
        <div className="price-card">
          <Typography as="small" color={colors.white}>
            القيمة الحالية للمزاد
          </Typography>
          <div className="price-amount">
            <Typography color={colors.white} as="h3" className="mb-0">
              5000
            </Typography>
            <Typography color={colors.white} as="p">
              $
            </Typography>
          </div>
          <div className="bidder">
            <Avatar src="/images/avatars/1.jpeg" size={16} />
            <Typography as="small">أحمد الرائد</Typography>
          </div>
        </div>
        <div className="price-card">
          <Typography as="small" color={colors.purple}>
            القيمة الحالية بعد الضريبة
          </Typography>
          <div className="price-amount">
            <Typography color={colors.purple} as="h3" className="mb-0">
              5050
            </Typography>
            <Typography color={colors.purple} as="p">
              $
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionStatus;
