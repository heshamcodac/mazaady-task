import { Typography } from "@components";
import styles from "./styles.module.scss";
import { colors } from "tailwind.config";

const AuctionPrices = () => {
  const prices = [
    {
      id: 1,
      label: "القيمة الابتدائية",
      amount: 5000,
    },
    {
      id: 2,
      label: "القيمة التقريبية",
      amount: 5000,
    },
    {
      id: 3,
      label: "العربون",
      amount: 5000,
    },
    {
      id: 4,
      label: "سعر الشراء الفورى",
      amount: 5000,
    },
    {
      id: 5,
      label: "قيمة زيادة المزاد",
      amount: 5000,
    },
  ];
  return (
    <div className={styles["auction-prices"]}>
      <ul>
        {prices.map((itm) => (
          <li key={itm.id}>
            <Typography as="small" color={colors.gray[800]}>
              {itm.label}
            </Typography>
            <Typography as="h3" color={colors.gray[500]} className="mb-0">
              {itm.amount}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionPrices;
