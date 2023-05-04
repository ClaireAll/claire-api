import { claireDelete, clairePost, deletePic } from "../database";
import { SortType } from "../enum";
import { generateRandomString } from "../service";

const root = "/clothes";

export function clothes() {
    /**
     * 分页查询衣服
     */
    clairePost(
        `${root}/list`,
        (query: any) => {
            const { price, quarters, addDate, page, pageSize } =
                JSON.parse(query);
            const index = page ?? 1;
            const size = pageSize ?? 8;
            const actualAua = quarters.length === 0 ? [1, 2, 3, 4] : quarters;
            const dateSort =
                addDate.sort === SortType.DESC
                    ? "desc"
                    : addDate.sort === SortType.NONE
                    ? ""
                    : "asc";
            const priceSort =
                price.sort === SortType.DESC
                    ? "desc"
                    : price.sort === SortType.NONE
                    ? ""
                    : "asc";
            let sortRule = '';
            if (dateSort && priceSort) {
                sortRule = `ORDER BY date ${dateSort}, price ${priceSort}`;
            } else if (dateSort) {
                sortRule = `ORDER BY date ${dateSort}`;
            } else if (priceSort) {
                sortRule = `ORDER BY price ${priceSort}`;
            }

            const sqlFunc = (type: string) =>
                `SELECT ${type} from clothes where price BETWEEN ${
                    price?.min || 0
                } AND ${
                    price?.max || 999999999
                } AND quarter IN (${actualAua.join(",")}) AND date BETWEEN ${
                    addDate?.min || 0
                } AND ${addDate?.max || 4080597113000}`;

            return `${sqlFunc("COUNT(*)")};${sqlFunc(
                "*"
            )} ${sortRule} LIMIT ${(index - 1) * size}, ${size};`;
        },
        () => {},
        (result: any) => {
            const [total, list] = result;

            return {
                total: total[0]["COUNT(*)"],
                list,
            };
        }
    );

    /**
     * 新添一件衣服
     */
    clairePost(
        `${root}/add`,
        () => "insert into clothes set ?",
        (query: any) => {
            const { pic, price, quarter } = JSON.parse(query);

            return {
                id: generateRandomString(8),
                pic,
                price,
                quarter,
                date: Date.now(),
            };
        },
        (data: any) => data
    );

    /**
     * 删除一件/多件衣服
     */
    claireDelete(
        `${root}/delete`,
        (info: any) =>
            info
                ? `DELETE FROM clothes WHERE id IN (${info
                      .map((item: any) => `"${item.id}"`)
                      .join(",")});`
                : "",
        (info: any) => {
            info.forEach((item: any) => deletePic(item.src));
        }
    );
}
