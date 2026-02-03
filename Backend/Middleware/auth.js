import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const projectAuth = async (req, res, next) => {
  // Authentication logic here
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
 
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: "User not found",
          statusCode: 401,
        });
      }

      next();
    } catch (error) {
      console.log("Auth middleware error", error.message);

      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          error: "token is expired",
          statusCode: 401,
        });
      }

      return res.status(401).json({
        success: false,
        error: "Not Authorized, Token failed",
        statusCode: 401,
      });
    }
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "token not found", statusCode: 401 });
  }
};
