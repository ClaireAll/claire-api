export interface Result {
    status: number;
    message: string;
    data: any;
}

/** 排序方式 */
export enum SortType {
    NONE = 0,
    /** 升序 */
    ASC = 1,
    /** 降序 */
    DESC = 2,
}