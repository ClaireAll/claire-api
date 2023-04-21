import express, { Application, Request, Response } from "express";
import cors from "cors";
import Claire from "./routes/database";

const app: Application = express();
const port = 9000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 根路由
app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello World!",
    });
});
app.use(Claire);
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}