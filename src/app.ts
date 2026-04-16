import express,{Request, Response} from "express"
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes"
import logger from "./middleware/logger.middleware"
import errorMiddleware from "./middleware/error.middleware";
import { authMiddleware, AuthRequest} from "./middleware/auth.middleware";

const app = express();

//Middleware
app.use(logger)
app.use(express.json());



//Routes
app.use("/api/health", healthRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)


//For error testing
app.get('/error', (req:Request,res:Response)=>{
  throw new Error("Test error")
})

//For jwt testing
app.get('/api/protected',authMiddleware, (req:AuthRequest,res:Response)=>{
  res.json({
    success:true,
    message:"This is a protected route",
    email: req.user?.email
  })
})

app.get('/', (req:Request,res:Response)=>{
res.send("Hello world")
})

app.use(errorMiddleware)

export default app;