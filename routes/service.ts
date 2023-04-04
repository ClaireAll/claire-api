import { Response } from "express";

export function formatResult(err: any, res: Response, result: any) {
    if (err) {
        res.send({
            status: res.statusCode,
            message: err.message,
            data: [],
        });
    }

    console.log(res)
    res.send({
        status: res.statusCode,
        message: err?.message,
        data: result,
    });
}
