import jwt from "jsonwebtoken";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;

      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        res.send({ msg: "ok", decodedToken });
      } else {
        res.status(403).send({ done: false, error: "access denied" });
      }
    } catch (error) {
      console.error("somthing went wrong in stats : ", error);
      res.status(500).send({ done: false, error });
    }
  }
};

export default stats;
