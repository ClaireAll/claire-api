import express, { Application, Request, Response } from "express";

const Hello: Application = express();

Hello.get("/hello", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello Claire!",
    });
});

export { Hello };
