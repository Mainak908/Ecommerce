import catchAsyncError from "../middleware/catchAsyncError";
import sendToken from "../utils/jwtToken";
import ErrorHandler from "../utils/errorHandler";
import Useracc from "../models/userAccModel";
import checkAuth from "../utils/checkAuth";

//register a user
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await Useracc.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res, "successfully registered");
});

//loginUser
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both or not
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email & Password", 400));
  }
  const user = await Useracc.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email & password", 401));
  }
  sendToken(user, 200, res, "successfully logged in");
});

//Logout User

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .cookie("myCookie", null, {
      expires: new Date(Date.now()),
      httpOnly: false,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      success: true,
    });
});

export const aboutUser = catchAsyncError(async (req, res, next) => {
  const user = await checkAuth(req);

  if (!user) return new ErrorHandler("Login First", 401);

  res.status(200).json({
    success: true,
    user,
  });
});
