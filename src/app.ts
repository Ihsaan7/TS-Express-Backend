import express, { Request , Response } from "express"
import cors from "cors"
import  { requestLogger } from "./middlewares/logger.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js";
import productRoute from "./routes/product.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get("/health" , (_req: Request , res:Response)=>
    {
        res.status(200).json(
            {
                success:true,
                message:"Typescript Epxress server is Healthy"
            })
    })

// Routes
app.use("/api/v1/products", productRoute)

// 404 Catch-all
app.use((req: Request , res:Response)=>
    {
        res.status(404).json({
            success: false,
            message:`Route ${req.originalUrl} not found on this server`
        })
    })
// Error handler (MUST be LAST — has 4 params)
app.use(errorHandler);


export default app