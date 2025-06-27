"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("./userModel"));
// Create new user
const createUser = async (userData) => {
    const existingUser = await userModel_1.default.findOne({ email: userData.email });
    if (existingUser)
        throw new Error("User already exists with this email.");
    const user = await userModel_1.default.create(userData);
    return user;
};
exports.createUser = createUser;
// Login user and generate JWT token
const loginUser = async (email, password) => {
    const user = await userModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials.");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials.");
    }
    const accessToken = user.getJwtToken();
    const refreshToken = user.getRefreshToken();
    return { user, accessToken, refreshToken };
};
exports.loginUser = loginUser;
// Update user details
const updateUser = async (id, userData) => {
    const user = await userModel_1.default.findByIdAndUpdate(id, userData, { new: true });
    if (!user)
        throw new Error("User not found.");
    return user;
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (id) => {
    const user = await userModel_1.default.findByIdAndDelete(id);
    if (!user)
        throw new Error("User not found.");
    return user;
};
exports.deleteUser = deleteUser;
// // Get all users with pagination, search, and filters
// export const getAllUsers = async (
//   page = 1,
//   limit = 10,
//   filters = {},
//   search = ""
// ) => {
//   const query: any = {
//     ...filters,
//     $or: [
//       { name: { $regex: search, $options: "i" } }, // Search by name (case-insensitive)
//       { email: { $regex: search, $options: "i" } }, // Search by email (case-insensitive)
//     ],
//   };
//   const users = await User.find(query)
//     .skip((page - 1) * limit)
//     .limit(limit);
//   const totalUsers = await User.countDocuments(query);
//   const totalPages = Math.ceil(totalUsers / limit);
//   return { users, totalUsers, totalPages };
// };
const getAllUsers = async (page = 1, limit = 10, filters = {}, search = "") => {
    // কুয়েরি বিল্ডিং লজিক ঠিক করুন
    const query = { ...filters };
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    // ফিল্টার থেকে খালি ভ্যালু রিমুভ করুন
    Object.keys(query).forEach(key => {
        if (query[key] === "" || query[key] === undefined) {
            delete query[key];
        }
    });
    const users = await userModel_1.default.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }); // সর্টিং যোগ করুন
    const totalUsers = await userModel_1.default.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);
    return { users, totalUsers, totalPages };
};
exports.getAllUsers = getAllUsers;
// Get single user by ID
const getUserById = async (id) => {
    const user = await userModel_1.default.findById(id);
    if (!user)
        throw new Error("User not found.");
    return user;
};
exports.getUserById = getUserById;
