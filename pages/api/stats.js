import {
  findVideoByUserId,
  updateStats,
  createStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

const stats = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const { videoId } = req.query;
      const userId = verifyToken(token);
      const findVideo = await findVideoByUserId(token, userId, videoId);

      if (videoId) {
        if (req.method === "POST") {
          const { watched = true, favourited } = req.body;

          if (findVideo?.length > 0) {
            const data = await updateStats(token, {
              videoId,
              userId,
              watched,
              favourited,
            });

            res.send({ data, done: true });
          } else {
            const data = await createStats(token, {
              videoId,
              userId,
              watched,
              favourited,
            });

            res.send({ data, done: true });
          }
        } else {
          if (findVideo?.length > 0) {
            res.send({ findVideo });
          } else {
            res.status(404).send({ message: "video not found" });
          }
        }
      } else {
        res.status(400).send({ message: "videoId is required" });
      }
    } else {
      res.status(403).send({ done: false, error: "access denied" });
    }
  } catch (error) {
    console.error("somthing went wrong in stats : ", error);
    res.status(500).send({ done: false, error });
  }
};

export default stats;
