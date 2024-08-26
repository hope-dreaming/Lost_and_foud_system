import qs from "qs"

import request from "@/utils/request";
import { ReturnitemQueryType } from "@/types";

export async function getReturnItemList(params?: ReturnitemQueryType) {
    const url = "/api/queryReturnItemList";
    const res = await request.post(url, params);
    return res
}


export async function addReturnitem(params: any) {
    const url = `/api/addReturnitem`;
    const res = await request.post(url, params);
    return res
}

export async function updateReturnitem(params: any) {
    const url = `/api/updateReturnitem`;
    const res = await request.post(url, params);
    return res
}

export async function deleteReturnitem(params: any) {
    const url = `/api/deleteReturnitem`;
    const res = await request.post(url, params);
    return res
}