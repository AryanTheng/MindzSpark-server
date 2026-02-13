import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifySuperAdmin = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (decoded.role !== "superadmin") {
    throw new ApiError(403, "Access denied");
  }

  next();
};
