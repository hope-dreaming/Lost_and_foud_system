export interface LossitemQuery {
    current?: number;
    pageSize?: number;
    item_name?: string;
    item_type?: string;
    role?: USER_ROLE;
    userId?: string;
}

export interface LossitemType {
    name: string;
    type?: string;
    time: string;
    address: string;
    desc?: string;
    uid: string;
}
export interface LossitemLayoutType {
    title: string;

}
