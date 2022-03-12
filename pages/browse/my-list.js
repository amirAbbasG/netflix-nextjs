import Head from "next/head";

import Sectioncard from "../../components/card/SectionCard";
import Navbar from "../../components/nav/NavBar";
import styles from "../../styles/MyList.module.css";
import { getMyListVideos } from "../../lib/videos";
import { verifyToken } from "../../lib/utils";

export async function getServerSideProps(context) {
  const token = context.req ? context.req.cookies?.token : null;
  const userId = verifyToken(token);
  const myListVideos = await getMyListVideos(token, userId);

  return {
    props: {
      myListVideos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <Sectioncard
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
