import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { Users } from "../models/usersModel.js";
const key = "1234567"

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("authorization")?.replace("Bearer ", "")
     
    if (!token) {
      return res.satus(400).json({ sucess:false,message: "token not found" })
    }

    const dtoken = jwt.verify(token, key)
    const user = await Users.findById(dtoken?._id)

    if (!user) {
      return res.status(400).json({sucess:false, message: "user not found" })
    }

    req.user = user;

    return next()

  }
  catch (error) {
    res.json({sucess:false, message: "invalid access token" })
  }

})

export { auth }