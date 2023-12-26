import { FC } from "react";
import styles from "./styles.module.scss";

interface IAvatar {
  src: string;
  size?: number;
}

const Avatar: FC<IAvatar> = ({ src, size = 24 }) => {
  return (
    <div
      className={styles.avatar}
      style={{ backgroundImage: `url(${src})`, width: size, height: size }}
    />
  );
};

export default Avatar;
