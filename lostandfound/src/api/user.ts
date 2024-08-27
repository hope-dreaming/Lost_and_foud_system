import { UserQueryType, UserType } from "@/types";
import request from "@/utils/request";
import qs from "qs";



export async function getUserList(params?: any) {
    const url = "/api/queryUserList";
    const res = await request.post(url, params);
    return res
};

export async function getUserInfo(params?: any) {
    const url = "/api/queryUserInfo";
    const res = await request.post(url, params);
    return res
};

export async function addUserInfo(params?: any) {
    const url = "/api/addUserInfo";
    const res = await request.post(url, params);
    return res
};

// 修改用户信息
export async function updateUserInfo(params?: any) {
    const url = "/api/updateUserInfo";
    const res = await request.post(url, params);
    return res
};

export async function deleteUserInfo(params?: any) {
    const url = "/api/deleteUserInfo";
    const res = await request.post(url, params);
    return res
};

updateUserSatus

export async function updateUserSatus(params?: any) {
    const url = "/api/updateUserSatus";
    const res = await request.post(url, params);
    return res
};
