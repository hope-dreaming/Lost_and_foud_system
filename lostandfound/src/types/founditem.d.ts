// 拾物信息类型
export interface FounditemType {
    name: string;
    type?: string;
    date: string;
    place: string;
    desc?: string;
    uid?: number;
    fid?: number;//获取时有
    isreturn?: number;//获取时有
}

export interface FounditemGotType {
    name: string;
    type?: string;
    date: string;
    place: string;
    desc?: string;
    uid: number;
    fid: number;
    tele: string;
    isreturn: number;
}

export interface FounditemOneQueryType {
    id: number;
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
    editData?: FounditemGotType;
}
