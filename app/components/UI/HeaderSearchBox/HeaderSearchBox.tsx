"use client";
import { FC, useState } from "react";
import { Icon, Typography } from "@components";
import styles from "./HeaderSearchBox.module.scss";
import { colors } from "tailwind.config";

const HeaderSearchBox: FC = () => {
  const [search_menu_options, set_search_menu_options] = useState<any>([]);
  const [selected_menu_option, set_selected_menu_option] = useState<any>({});

  return (
    <div className={styles["search-box"]}>
      <div className="search-box__menu">
        <div className="search-box__menu-trigger">
          <Typography className="text-primary text-sm">
            مزاد مباشر متعدد
          </Typography>
          <Icon name="chevronArrow" size={16} color={colors.primary} />
        </div>
      </div>
      <div className="search-box__field">
        <input type="search" placeholder="ابحث هنا" />
        <div className="search-box__icon">
          <Icon name="search" color="white" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchBox;
