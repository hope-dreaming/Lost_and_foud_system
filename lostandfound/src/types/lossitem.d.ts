export interface LossitemQuery {
    current?: number;
    pageSize?: number;
    item_name?: string;
    item_type?: string;
    role?: USER_ROLE;
    userId?: number;
    lid?: number;
}

export interface LossitemType {
    lid?: number;
    name: string;
    type?: string;
    date: string;
    place: string;
    desc?: string;
    isfound: number;
}

export interface LossitemLayoutType {
    title: string;
    editData?: LossitemType;
}
