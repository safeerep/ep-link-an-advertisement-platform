import jwt from "jsonwebtoken";

const checkTokenAndGetUserEmail = (token: any): Promise<any> => {
  return new Promise((resolve) => {
    const secret: string = process.env.JWT_TOKEN_SECRET || "";
    jwt.verify(token, secret, (err: any, decodedUser: any) => {
      if (err) resolve(false);
      else {
        resolve(decodedUser?.email);
      }
    });
  });
};

export default checkTokenAndGetUserEmail;
