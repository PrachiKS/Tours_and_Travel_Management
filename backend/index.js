import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'       // ✅ add this
import { dirname, join } from 'path'

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const port = process.env.PORT || 5000;

const corsOptions = {
    origin:true,
    credentials:true
}

//database connection 

mongoose.set('strictQuery', false);

const connect = () => {
    return mongoose.connect(process.env.MONGO_URI);
};


// //for testing
// app.get("/", (req, res) => {
//     res.send("api is working");
// });



//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth",authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);




const startServer = async () => {
    try {
        await connect();
        console.log("MongoDB database connected");
        app.listen(port, () => {
            console.log("server listening on port", port);
        });
    } catch (err) {
        console.error("MongoDB database connection failed", err.message);
        process.exit(1);
    }
};

startServer();