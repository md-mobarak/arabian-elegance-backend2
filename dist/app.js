"use strict";
// import express, { NextFunction, Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import rootRoute from './module/routes';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// // Use express.json() and express.urlencoded(): Ensure these middlewares are set for parsing form data.
// // Middleware
// app.use(express.json());
// app.use(cors({ origin: 'https://arabian-elegance-03.vercel.app', credentials: true }));
// app.use(cors({ origin: "https://arabian-elegance-03.vercel.app" }));
// app.use(express.urlencoded({ extended: true })); // For handling URL encoded data
// app.use(cookieParser());
// // CORS কনফিগারেশন
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));
// // CORS Configuration
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://arabian-elegance-03.vercel.app'] 
//     : 'http://localhost:3000',
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// };
// // OPTIONS রিকোয়েস্ট হ্যান্ডেলিং
// app.options('*', cors());
// // Use the routes defined in RootRouters
// app.use('/api/v1',rootRoute)
// // Test Route
// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to Arabian Elegance E-commerce API');
// });
// // Sample route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
// // Allow specific origins in production
// app.use(cors(corsOptions));
// // Global error handling middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//    res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//   });
// });
// export default app;
// // export default app;
// import express, { NextFunction, Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import rootRoute from './module/routes';
// dotenv.config();
// const app = express();
// // Configure CORS first
// const allowedOrigins = [
//   'https://arabian-elegance-03.vercel.app',
//   // 'https://arabianelegancebd.com',
//   'http://localhost:3000'
// ];
// const corsOptions: cors.CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// };
// // Apply CORS middleware before other routes
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Handle preflight requests
// // Standard middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// // Routes
// app.use('/api/v1', rootRoute);
// // Test routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to Arabian Elegance E-commerce API');
// });
// // Error handling
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//   });
// });
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./module/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS Configuration (Production & Mobile Friendly)
const allowedOrigins = [
    'https://arabian-elegance-03.vercel.app',
    'https://arabian-elegance-03.vercel.app',
    '*',
    'https://arabianelegancebd.com',
    'http://localhost:3000',
    // Mobile-specific domains or IPs (if any)
];
const corsOptions = {
    origin: (origin, callback) => {
        if (process.env.NODE_ENV === 'development' || !origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log('Blocked CORS for:', origin); // Debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 86400, // Preflight cache for mobile
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
// Performance Middleware
app.use(express_1.default.json({ limit: '20mb' })); // Prevent large payloads
app.use(express_1.default.urlencoded({ extended: true, limit: '20mb' }));
app.use((0, cookie_parser_1.default)());
// API Response Compression (Install 'compression' package)
const compression_1 = __importDefault(require("compression"));
app.use((0, compression_1.default)());
// Cache Headers Middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=300'); // 5min cache for mobile
    next();
});
// Routes
app.use('/api/v1', routes_1.default);
// // Test routes
app.get('/', (req, res) => {
    res.send('Welcome to Arabian Elegance E-commerce API');
});
// Test Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: Date.now() });
});
// Error Handling
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
    });
});
exports.default = app;
