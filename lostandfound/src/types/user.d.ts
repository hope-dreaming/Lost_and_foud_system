import { USER_ROLE, USER_SEXY, USER_STATUS } from "./../constants/index";

export interface UserInfoType {
    tele: string;
    name: string;
    role: USER_ROLE;
    status?: USER_STATUS;
    sexy: USER_SEXY;
    uid?: number;
    password?: string;
    createdAt?: string;
    updatedAt?: string;

}
export interface UserOneQueryType {
    id: number;
}
export interface UserEditInfoType {
    tele?: string;
    name?: string;
    role: USER_ROLE;
    status?: USER_STATUS;
    sexy: USER_SEXY;
    uid?: number;
    password?: string;
    createdAt?: string;
    updatedAt?: string;

}
export interface UserCurrentType {
    uid: number;
    tele: string;
    name: string;
    uno?: string;
    sexy: string;
    role: string;
}

export interface UserType {
    info: UserCurrentType;
    token: string;
}

export interface UserLoginType {
    tele: string;
    password: string;
}

export interface UserQueryType {
    current?: number;
    pageSize?: number;
    item_name?: string;
    item_tele?: string;
    item_status?: USER_STATUS;
}

export interface UserFormProps {
    title: string;
    editData?: UserEditInfoType;
}

export interface DeleteType {
    id: number;
}