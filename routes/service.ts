import { Response } from "express";

export function formatResult(err: any, res: Response, result: any) {
    if (err) {
        res.send({
            status: res.statusCode,
            message: err.message,
            data: [],
        });
    }

    res.send({
        status: res?.statusCode,
        message: err?.message,
        data: result,
    });
}