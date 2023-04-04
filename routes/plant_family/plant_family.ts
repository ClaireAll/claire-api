import express, { Application, Request, Response } from "express";
import mysql from "mysql";
import { formatResult } from "../service";

const PlantFamily: Application = express();
const root = "/plant_family";
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "plant",
});

PlantFamily.get(
    `${root}/list`,
    (req: Request, res: Response) => {
        db.query("select * from plant_family", (err, result) => {
            formatResult(err, res, result);
        })
    }
);

export { PlantFamily };
