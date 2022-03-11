import { verifyToken } from "../lib/utils";

const useUserDetail = (context) => {
  const token = context.req ? context.req.cookies?.token : null;
  const userId = verifyToken(token);

  return {
    token,
    userId,
  };
};

export default useUserDetail;
