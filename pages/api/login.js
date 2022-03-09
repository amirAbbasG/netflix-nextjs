import jwt from "jsonwebtoken";

import { magicAdmin } from "../../lib/magicAdmin";

const login = async (req, res) => {
  if (req.method === "POST") {
    const auth = req.headers.authorization;

    const didToken = auth ? auth.substr(7) : "";

    const metadata = await magicAdmin.users.getMetadataByToken(auth);

    const token = jwt.sign(
      {
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      },
      process.env.JWT_SECRET
    );
    try {
      res.send({ done: true });
    } catch (error) {
      console.error("somthing went wrong in logging in : ", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};

export default login;
