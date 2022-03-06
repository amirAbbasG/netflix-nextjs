import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import classnames from "classnames";

import styles from "./card.module.css";

const Card = ({ imgUrl = "/static/movie.jpg", size = "medium", id }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    larg: styles.lgItem,
  };

  const handleError = () => {
    setImgSrc("/static/movie.jpg");
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={scale}
        className={classnames(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          layout="fill"
          alt="movie card"
          onError={handleError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
