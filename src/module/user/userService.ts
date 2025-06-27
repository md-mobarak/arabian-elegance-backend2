


// 3rd 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./userModel";

// Create new user
export const createUser = async (userData: any) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error("User already exists with this email.");
  const user = await User.create(userData);
  return user;
};

// Login user and generate JWT token
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
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

// Update user details
export const updateUser = async (id: string, userData: any) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  if (!user) throw new Error("User not found.");
  return user;
};

// Delete user
export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found.");
  return user;
};

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
export const getAllUsers = async (
  page = 1,
  limit = 10,
  filters = {},
  search = ""
) => {
  // কুয়েরি বিল্ডিং লজিক ঠিক করুন
  const query: any = { ...filters };

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

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 }); // সর্টিং যোগ করুন

  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  return { users, totalUsers, totalPages };
};
// Get single user by ID
export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found.");
  return user;
};