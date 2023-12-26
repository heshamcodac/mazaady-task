import React from "react";
import styles from "./styles.module.scss";
import { Icon } from "@components";

const CoverSlides = () => {
  const images = [
    {
      id: 1,
      src: "/images/cars/1.jpeg",
    },
    {
      id: 2,
      src: "/images/cars/2.jpeg",
    },
    {
      id: 3,
      src: "/images/cars/3.jpeg",
    },
    {
      id: 4,
      src: "/images/cars/4.jpeg",
    },
    {
      id: 5,
      src: "/images/cars/5.jpeg",
    },
  ];
  return (
    <div className={styles["cover-slides"]}>
      <div className="arrow up-arrow">
        <Icon name="chevronArrow" size={16} />
      </div>
      <div className="slides-list">
        {images.map((img) => (
          <div
            className="slide-item"
            key={img.id}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}
      </div>
      <div className="arrow down-arrow">
        <Icon name="chevronArrow" size={16} />
      </div>
    </div>
  );
};

export default CoverSlides;
