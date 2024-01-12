import { CookieOptions, Response } from "express";
import { UserAccDocument } from "../models/userAccModel";

const sendToken = (
  user: UserAccDocument,
  statusCode: number,
  res: Response,
  msg: string
): void => {
  const token = user.getJWTToken();
  const options: CookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.COOKIE_EXPIRE as string, 10) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    // withCredentials: true,
  };

  res.cookie("myCookie", token, options).status(statusCode).json({
    success: true,
    message: msg,
    user,
    token,
  });

  console.log("cookie set");
};

export default sendToken;
