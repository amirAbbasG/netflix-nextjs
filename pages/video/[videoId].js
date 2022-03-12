import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import Modal from "react-modal";
import classnames from "classnames";

import { getYoutubeVideoById } from "../../lib/videos";
import NavBar from "../../components/nav/NavBar";
import Dislike from "../../components/icons/DislikeIcon";
import Like from "../../components/icons/LikeIcon";
import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const { videoId } = context.params;
  const videoList = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoList.length > 0 ? videoList[0] : {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideo = ["mYfJxlgR2jw", "DbBe5U8m_KU", "sQcdkDYlyHE"];
  const paths = listOfVideo.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;
  const [likeOrDislike, setLikeOrDislike] = useState("");

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { findVideo } = await response.json();

      if (findVideo && findVideo.length > 0) {
        const favourite = findVideo[0].favourited;

        if (favourite === 0) {
          setLikeOrDislike("dislike");
        } else if (favourite === 1) {
          setLikeOrDislike("like");
        }
      }
    };
    fetchVideo();
  }, [videoId]);

  const ratingService = async (favourited) => {
    const response = await fetch(`/api/stats?videoId=${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favourited,
      }),
    });
    return await response.json();
  };

  const handleClickLike = async () => {
    const result = await ratingService(1);
    if (result.done) {
      setLikeOrDislike("like");
    }
  };

  const handleClickDislike = async () => {
    const result = await ratingService(0);
    if (result.done) {
      setLikeOrDislike("dislike");
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        className={styles.modal}
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        contentLabel="Watch videol"
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`}
          frameborder="0"
        ></iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <button onClick={handleClickLike} className={styles.likeBtnWrapper}>
            <div className={styles.btnWrapper}>
              <Like selected={likeOrDislike === "like"} />
            </div>
          </button>
          <button
            onClick={handleClickDislike}
            className={styles.likeBtnWrapper}
          >
            <div className={styles.btnWrapper}>
              <Dislike selected={likeOrDislike === "dislike"} />
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={classnames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={classnames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
