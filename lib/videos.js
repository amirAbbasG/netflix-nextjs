import { getWatchedVideos, getFavouritedVideos } from "./db/hasura";

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
      const snippet = item.snippet;

      return {
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
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

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};

export const getWatcheAgainVidos = async (token, userId) => {
  const videos = (await getWatchedVideos(token, userId)) || [];
  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};

export const getMyListVideos = async (token, userId) => {
  const videos = (await getFavouritedVideos(token, userId)) || [];
  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};
