import React from "react";

import styles from "./sectionCard.module.css";
import Card from "./Card";

const Sectioncard = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Card id={index} key={index} imgUrl={video.imgUrl} size={size} />
        ))}
      </div>
    </section>
  );
};

export default Sectioncard;
