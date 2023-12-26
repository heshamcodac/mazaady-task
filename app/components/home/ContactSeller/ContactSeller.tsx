import { Icon, Typography } from "@components";
import styles from "./styles.module.scss";

const ContactSeller = () => {
  return (
    <div className={styles["contact-seller"]}>
      <Typography as="h4">ارسال رسالة الى البائع</Typography>
      <Typography>
        يمكنك في وقت البث المباشر ارسال رسالة الى البائع للاستفسار
      </Typography>
      <div className="send-msg">
        <input type="text" placeholder="اكتب سؤالك" />
        <button>
          <Icon name="send" strokeColor="white" />
        </button>
      </div>
      <form></form>
    </div>
  );
};

export default ContactSeller;
