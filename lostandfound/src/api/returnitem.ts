import qs from "qs"

import request from "@/utils/request";
import { ReturnitemQueryType } from "@/types";

// 用户查询待办事项
export async function getUserReturnNotList(params: ReturnitemQueryType) {
    const url = "/api/queryUserReturnNotList";
    const res = await request.post(url, params);
    return res
}
// 用户查询完成事项
export async function getUserReturnOkList(params: ReturnitemQueryType) {
    const url = "/api/queryUserReturnOkList";
    const res = await request.post(url, params);
    return res
}
// 管理员查询待办事项
export async function getAdminReturnNotList(params?: ReturnitemQueryType) {
    const url = "/api/queryAdminReturnNotList";
    const res = await request.post(url, params);
    return res
}
//管理员查询完成事项
export async function getAdminReturnOkList(params?: ReturnitemQueryType) {
    const url = "/api/queryAdminReturnOkList";
    const res = await request.post(url, params);
    return res
}


// 提交申请 const { uid, date, fid } = req.body
export async function addReturnitem(params: any) {
    const url = `/api/addReturnitem`;
    const res = await request.post(url, params);
    return res
}

// 审核申请 const { isok, rid, uaid, fid } = req.body
export async function updateReturnitem(params: any) {
    const url = `/api/updateReturnitem`;
    const res = await request.post(url, params);
    return res
}
//  删除申请 const { id } = req.body
export async function deleteReturnitem(params: any) {
    const url = `/api/deleteReturnitem`;
    const res = await request.post(url, params);
    return res
}