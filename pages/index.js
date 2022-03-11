import Head from "next/head";

import Banner from "../components/banner/Banner";
import Navbar from "../components/nav/NavBar";
import SectionCard from "../components/card/SectionCard";
import {
  getVideos,
  getPopularVideos,
  getWatcheAgainVidos,
} from "../lib/videos";
import useUserDetail from "../utils/userDetail";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const { token, userId } = useUserDetail(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const disneyVideos = await getVideos("disney trailer");

  const travelVideos = await getVideos("travel");

  const productivityVideos = await getVideos("productivity");

  const popularVideos = await getPopularVideos();

  const watchedAgainVideos = await getWatcheAgainVidos(token, userId);

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchedAgainVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  watchedAgainVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId="XdKzUbAiswE"
          title="childford a red dog"
          subTitle="a very butifull dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title="Disney" videos={disneyVideos} size="larg" />

          <SectionCard
            title="Watch it again"
            videos={watchedAgainVideos}
            size="small"
          />
          <SectionCard title="Travel" videos={travelVideos} size="small" />

          <SectionCard
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />

          <SectionCard title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
