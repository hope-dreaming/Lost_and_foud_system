import qs from "qs"

import request from "@/utils/request";
import { ReturnitemQueryType } from "@/types";

export async function getAdiminReturnitemList(params?: ReturnitemQueryType) {
    const url = "/api/queryAdminReturnitemList";
    const res = await request.post(url, params);
    return res
}

getAdiminReturnitemList
export async function getUserReturnitemList(params?: ReturnitemQueryType) {
    const url = "/api/queryUserReturnitemList";
    const res = await request.post(url, params);
    return res
}
// 0 提交申请 const { uid, date, fid } = req.body
export async function addReturnitem(params: any) {
    const url = `/api/addReturnitem`;
    const res = await request.post(url, params);
    return res
}

// 0 审核申请 const { isok, rid, uaid, fid } = req.body
export async function updateReturnitem(params: any) {
    const url = `/api/updateReturnitem`;
    const res = await request.post(url, params);
    return res
}
// 0 删除申请 const { id } = req.body
export async function deleteReturnitem(params: any) {
    const url = `/api/deleteReturnitem`;
    const res = await request.post(url, params);
    return res
}