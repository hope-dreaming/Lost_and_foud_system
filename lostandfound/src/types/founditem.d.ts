// 拾物信息类型
export interface FounditemType {
    name: string;
    type?: string;
    date: string;
    address: string;
    desc?: string;
    uid: string;

}
// 拾物搜索类型
export interface FounditemQuery {
    current?: number;
    pageSize?: number;
    item_name?: string;
    item_type?: string;
    userId?: string;
}

// 
export interface FounditemLayoutType {
    title: string;

}
