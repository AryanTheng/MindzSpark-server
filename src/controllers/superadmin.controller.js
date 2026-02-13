import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { admin } from "../models/admin.model.js"

// 🔐 Generate Token
const generateToken = () => {
    return jwt.sign(
        { role: "superadmin" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

// 🔑 SuperAdmin Login
const superAdminLogin = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(400, "Username and password required")
    }

    if (
        username !== process.env.SUPERADMIN_USERNAME ||
        password !== process.env.SUPERADMIN_PASSWORD
    ) {
        throw new ApiError(401, "Invalid superadmin credentials")
    }

    const token = generateToken()

    return res
        .status(200)
        .json(new ApiResponse(200, { role: "superadmin", token }, "Login successful"))
})


// 👤 SuperAdmin Creates Admin
const createAdmin = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(400, "All fields required")
    }

    const existedAdmin = await admin.findOne({ username })

    if (existedAdmin) {
        throw new ApiError(400, "Admin already exists")
    }

    const newAdmin = await admin.create({
        username,
        password
    })

    return res
        .status(201)
        .json(new ApiResponse(201, newAdmin, "Admin created successfully"))
})

export { superAdminLogin, createAdmin }
