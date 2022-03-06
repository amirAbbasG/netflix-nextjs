// import videosdata from "../data/videos.json";
export const getVideos = async () => {
  const reposne = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[${process.env.YOUTUBE_API_KEY}]`
  );

  const videosdata = await reposne.json();
  console.log({ videosdata });

  return videosdata?.items.map((item) => {
    return {
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
      title: item.snippet.title,
    };
  });
};
