export const getCommonVideos = async (url) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const baseUrl = "youtube.googleapis.com/youtube/v3";

    const reposne = await fetch(
      `https://${baseUrl}/${url}&maxResults=25&key=${apiKey}`
    );

    const videosdata = await reposne.json();
    if (videosdata?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return videosdata?.items.map((item) => {
      const id = item.id?.videoId || item.id;

      return {
        imgUrl: item.snippet.thumbnails.high.url,
        id,
        title: item.snippet.title,
      };
    });
  } catch (error) {
    console.error("somthing went wrong in fetch videos : ", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const url = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(url);
};

export const getPopularVideos = () => {
  const url =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(url);
};
