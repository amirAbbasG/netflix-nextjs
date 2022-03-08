import { useRouter } from "next/router";

import Modal from "react-modal";
import classnames from "classnames";

import { getYoutubeVideoById } from "../../lib/videos";
import NavBar from "../../components/nav/NavBar";
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

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

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