import { USER_ROLE, USER_SEXY, USER_STATUS } from "./../constants/index";

export interface UserType {
    tele: string;
    name: string;
    role: USER_ROLE;
    status?: USER_STATUS;
    sexy: USER_SEXY;
    uid?: string;
    password: string;

}

export interface UserLoginType {
    name: string;
    password: string;
}

export interface UserQueryType {
    current?: number;
    pageSize?: number;
    name?: string;
    all?: boolean;
    status?: USER_STATUS;
}

export interface UserFormProps {
    title: string;
    editData?: UserType;
}
