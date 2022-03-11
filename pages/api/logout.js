import { removeCookie } from "../../lib/cookies";
import { magicAdmin } from "../../lib/magicAdmin";
import { verifyToken } from "../../lib/utils";

const logout = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({ message: "User is not logged in" });
      }

      const userId = verifyToken(token);
      removeCookie(res);
      try {
        await magicAdmin.users.logoutByIssuer(userId);
      } catch (error) {
        console.log("User's session with Magic already expired");
        console.error("Error occurred while logging out magic user", error);
      }
      res.writeHead(302, { Location: "/login" });
      res.end();
    } catch (error) {
      console.error({ error });
      res.status(401).json({ message: "User is not logged in" });
    }
  }
};

export default logout;
