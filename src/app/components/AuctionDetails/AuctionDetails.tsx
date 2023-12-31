import { Avatar, Icon, Typography } from "@components";
import styles from "./styles.module.scss";
import { colors } from "tailwind.config";

const AuctionDetails = () => {
  return (
    <div className={styles["auction-details"]}>
      <div
        className="cover"
        style={{ backgroundImage: "url(/images/cars/1.jpeg" }}
      >
        <div className="flex justify-between gap-3 p-4">
          <div className="info">MISSING</div>
          <div className="icons">
            <div>
              <Icon name="share" strokeColor="white" />
            </div>
            <div>
              <Icon name="heart" strokeColor="white" />
            </div>
            <div>
              <Icon name="flag" strokeColor="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 pb-5">
        <div className="seller">
          <div className="avatar-wrapper">
            <Avatar src="/images/avatars/2.jpeg" size={44} />
            <div className="seller-love">
              <Icon name="heart" fillColor="#e3e3e3" size={16} />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <Typography as="h4" size={16} className="mb-1">
              اسم البائع
            </Typography>
            <Typography as="span" size={12} dir="ltr">
              +966598398
            </Typography>
          </div>
          <div className="flex gap-0 pt-2">
            <Icon name="star" size={18} fillColor={colors.gray[300]} />
            <Icon name="star" size={18} fillColor={colors.yellow} />
            <Icon name="star" size={18} fillColor={colors.yellow} />
            <Icon name="star" size={18} fillColor={colors.yellow} />
            <Icon name="star" size={18} fillColor={colors.yellow} />
          </div>
        </div>
        <Typography as="h3" className="mb-0">
          شراء مجموعة من السيارات من موديلات 1990
        </Typography>
        <Typography as="span" size={12} color={colors.gray[500]}>
          code 1234
        </Typography>
        <div className="flex justify-between items-stretch gap-2 mt-3">
          <div className="flex items-stretch gap-1">
            <div className="badge">
              <Typography color={colors.primary} dir="ltr">
                +10000
              </Typography>
            </div>
            <div className="badge">
              <Typography color={colors.primary} dir="ltr">
                +10050
              </Typography>
            </div>
            <div className="badge">
              <Typography color={colors.primary} dir="ltr">
                +10500
              </Typography>
            </div>
          </div>
          <div className="add-bid">
            <input type="text" placeholder="اكتب المبلغ" />
            <button>
              <Typography color={colors.white}>تأكيد</Typography>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
