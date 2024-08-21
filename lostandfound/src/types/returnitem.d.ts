import { RETURN_ISOK, USER_ROLE } from "@/constants";

export interface ReturnitemQueryType {
    current?: number;
    pageSize?: number;
    item_fid?: string;
    item_tele?: string;
    role?: USER_ROLE;
    isok?: RETURN_ISOK;
    userId?: string;
    item_uaid?: string;
}

