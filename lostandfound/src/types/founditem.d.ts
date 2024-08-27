// 拾物信息类型
export interface FounditemType {
    name: string;
    type?: string;
    date: string;
    address: string;
    desc?: string;
    uid?: number;
    fid?: number;

}
// 拾物搜索类型
export interface FounditemQuery {
    current?: number;
    pageSize?: number;
    item_name?: string;
    item_type?: string;
    userId?: number;
}

// 
export interface FounditemLayoutType {
    title: string;
    editData?: FounditemType;
}
