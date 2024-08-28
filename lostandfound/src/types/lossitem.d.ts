export interface LossitemQuery {
    current?: number;
    pageSize?: number;
    item_name?: string;
    item_type?: string;
    role?: USER_ROLE;
    userId?: number;
    lid?: number;
    role?: USER_ROLE;
}

export interface LossitemType {
    lid?: number;
    name: string;
    type?: string;
    date: string;
    place: string;
    desc?: string;
    isfound?: number;
    uid?: number;
    tele?: string;
}

export interface LossitemOneQueryType {
    id: number;
}


// 对寻物信息进行修改更新时，查询返回的数据应该是LossitemGotType
export interface LossitemGotType {
    lid: number;
    name: string;
    date: string;
    place: string;
    type?: string;
    desc?: string;
    isfound: number;
    uid: number;
    tele?: string;
}

export interface LossitemLayoutType {
    title: string;
    editData?: LossitemGotType;
}
