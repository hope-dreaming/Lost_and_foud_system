// 拾物信息类型
export interface FounditemType {
    name: string;
    type?: string;
    time: string;
    address: string;
    desc?: string;
    uid: string;

}
// 拾物搜索类型
export interface FounditemQuery {
    name?: string;
    type?: string;
}

// 
export interface FounditemLayoutType {
    title: string;

}
