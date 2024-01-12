import ErrorHandler from "./errorHandler";
import jwt from "jsonwebtoken";
import Useracc from "../models/userAccModel";
import { Request } from "express";

const checkAuth = async (req: Request) => {
  const { myCookie } = req.cookies;

  if (!myCookie) {
    return new ErrorHandler("Please Login to access this resource", 401);
  }
  const decodeData = jwt.verify(myCookie, process.env.JWT_SECRET as string) as {
    id: string;
  };

  const user = await Useracc.findById(decodeData.id);
  return user;
};

export default checkAuth;

// The jwt.verify method returns an object with a shape like { id: string }, so I've specified that type explicitly.
