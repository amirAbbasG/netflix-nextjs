import Image from "next/image";

import styles from "./card.module.css";

const Card = ({ imgUrl, size }) => {
  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    larg: styles.lgItem,
  };
  return (
    <div className={styles.container}>
      Card
      <div className={classMap[size]}>
        <Image
          src={imgUrl}
          layout="fill"
          alt="movie card"
          className={styles.cardImg}
        />
      </div>
    </div>
  );
};

export default Card;
