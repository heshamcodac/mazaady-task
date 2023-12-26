import { Avatar, Typography } from "@components";
import styles from "./styles.module.scss";
import { colors } from "tailwind.config";

interface ICompetitor {
  id: number;
  avatar: string;
  name: string;
  time: string;
  bidAmount: number;
}

const Competitors = () => {
  const competitors: ICompetitor[] = [
    {
      id: 1,
      avatar: "/images/avatars/1.jpeg",
      name: "اسم المزايد",
      time: "13:59:00",
      bidAmount: 20,
    },
    {
      id: 2,
      avatar: "/images/avatars/2.jpeg",
      name: "اسم المزايد",
      time: "13:59:00",
      bidAmount: 20,
    },
    {
      id: 3,
      avatar: "/images/avatars/3.jpeg",
      name: "اسم المزايد",
      time: "13:59:00",
      bidAmount: 20,
    },
    {
      id: 4,
      avatar: "/images/avatars/4.jpeg",
      name: "اسم المزايد",
      time: "13:59:00",
      bidAmount: 20,
    },
    {
      id: 5,
      avatar: "/images/avatars/5.jpeg",
      name: "اسم المزايد",
      time: "13:59:00",
      bidAmount: 20,
    },
  ];
  return (
    <div className={styles.competitors}>
      <Typography as="h4">المتنافسون</Typography>
      <ul>
        {competitors.map((itm) => (
          <li key={itm.id}>
            <Avatar src={itm.avatar} size={44} />
            <div className="content">
              <Typography className="mb-0 font-bold" size={14}>
                {itm.name}
              </Typography>
              <Typography as="small" color="#808080">
                {itm.time}
              </Typography>
            </div>
            <div className="bid-amount" dir="ltr">
              <Typography
                className="mb-0 font-bold"
                size={20}
                color={colors.yellow}
              >
                +{itm.bidAmount}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Competitors;
