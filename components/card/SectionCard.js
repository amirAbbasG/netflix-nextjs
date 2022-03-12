import React from "react";

import Link from "next/link";

import classNames from "classnames";

import styles from "./sectionCard.module.css";
import Card from "./Card";

const Sectioncard = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={classNames(styles.cardWrapper, shouldWrap && styles.wrap)}
      >
        {videos.map((video, index) => (
          <Link href={`/video/${video.id}`}>
            <a>
              <Card
                id={index}
                key={video.id}
                imgUrl={video.imgUrl}
                size={size}
                shouldScale={shouldScale}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Sectioncard;
