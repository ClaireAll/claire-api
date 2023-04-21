import { claireGet, getImg } from "../database";

const root = "/clothes";

export function clothes() {
    /**
     * 图片
     */
    getImg(`${root}/c1`, '1.jpg');
    /**
     * 获取所有衣服
     */
    claireGet(`${root}/list`, "select * from clothes");
}
