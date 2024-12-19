require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// WebSocket import


// Cybersecurity imports
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Custom middleware imports
const { notFound, errorHandler } = require("./middleware/errorHandler.js");

// Connection to database import
const connectDB = require("./config/connect.js");

// Cybersecurity
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}));
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));

// Required for Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Imports
const userRouter = require("./routes/userRoutes.js");
const crimeRouter = require("./routes/crimeRoutes.js");

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/crime", crimeRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6001;

const startServer = async () => {
	try {
		await connectDB();
		const server = app.listen(port, () => {
			console.log(`Server is listening on port ${port} ...`);
		});
		// Websocket here
	} catch (err) {
		console.log(err);
	}
};

startServer();