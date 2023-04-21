import express, { Application, Request, Response } from "express";
import mysql from "mysql";
import { formatResult } from "./service";
import { clothes } from "./clothes/clothes";
import path from "path";
import multer from "multer";

const Claire: Application = express();
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "claire",
});

// 跨域请求处理
Claire.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // 追加允许的请求方法
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
    );
    // 客户端发了JSON 追加允许的请求头 Content-Type
    res.setHeader(
        "Access-Control-Allow-Headers",
        "x-requested-with,Content-Type"
    );
    res.header("X-Powered-By", "3.2.1");
    next();
});

// 公开静态文件夹，匹配`虚拟路径img` 到 `真实路径public` 注意这里  /img/ 前后必须都要有斜杠！！！
// Claire.use("/img/", express.static(path.join(__dirname, "/assets/imgs")));
Claire.use(express.static("D:/mine/claire-api/public"));
Claire.use(express.urlencoded({ extended: false }));
Claire.use(express.json());

// 跨域中间件
const cors = (
    req: any,
    res: { setHeader: (arg0: string, arg1: string) => void },
    next: () => void
) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
};

const storage = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination(_req: any, file: any, cb: Function) {
        console.log(12334456);
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            // 上传文件存在 public 下
            cb(null, "D:/mine/claire-api/public");
        } else {
            cb({ error: "不支持的文件类型" });
        }
    },
    // 配置文件上传后存储的路径和文件名
    filename(
        _req: any,
        file: { originalname: string },
        cb: (arg0: null, arg1: string) => void
    ) {
        // 使用时间戳作为上传的文件名
        const extname = path.extname(file.originalname);
        cb(null, Date.now() + extname);
    },
});

const multerConfig = multer({ storage });

Claire.post("/upload", cors, multerConfig.single("file"), (req, res) => {
    console.log(req.file)
    res.send({
        data: {
            name: req.file?.filename,
            url: req.file?.path,
            hello: 123,
        },
    });
});

export function claireGet(url: string, query: string) {
    Claire.get(url, (req: Request, res: Response) => {
        db.query(query, (err, result) => {
            formatResult(err, res, result);
        });
    });
}

export function getImg(url: string, name: string) {
    Claire.get(url, (_req, res) => {
        res.sendFile(path.join(__dirname, `/assets/imgs/${name}`));
    });
}

clothes();

export default Claire;
