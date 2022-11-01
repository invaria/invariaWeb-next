import React, { useState } from "react";
import styles from "../styles/collapse.module.css";
import plus from "../assets/images/plus.png";
import minus from "../assets/images/minus.png";
import Image from "next/image";

const CollapseMenu = ({ heading, para }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={styles.quesWrapper}
      onClick={() => setExpanded((val) => !val)}
    >
      <div className={styles.questHeader}>
        <p style={{ color: expanded ? "white" : "#B4B7C0" }}>{heading}</p>
        <div className={styles.expandImg}>
          <Image src={expanded ? minus : plus} />
        </div>
      </div>
      {expanded && <div>{para}</div>}
    </div>
  );
};

export default CollapseMenu;
