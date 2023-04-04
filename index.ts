import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Hello } from "./routes/hello";
import { PlantFamily } from "./routes/plant_family/plant_family";

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
app.use(Hello);
app.use(PlantFamily);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
