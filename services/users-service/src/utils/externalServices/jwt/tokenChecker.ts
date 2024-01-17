import jwt from "jsonwebtoken";

const verifyToken = (token: any): Promise<boolean> => {
  return new Promise((resolve) => {
    const secret: string = process.env.JWT_TOKEN_SECRET || "";
    jwt.verify(token, secret, (err: any, decodedUser: any) => {
      if (err) resolve(false);
      else {
        console.log(decodedUser);
        resolve(true);
      }
    });
  });
};

export default verifyToken;
