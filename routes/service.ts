import { Response } from "express";
import crypto from "crypto";

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

export function generateRandomString(length: number) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}
