import qs from "qs"

import request from "@/utils/request";
import { ReturnitemQueryType } from "@/types";

export async function getReturnItemList(params?: ReturnitemQueryType) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryReturnItemList";
    const res = await request.post(url, params);

    return res
}



export async function addReturnItemInform(params: any) {
    const url = `/api/addReturnItemInform`;
    const res = await request.post(url, params);
    return res
}
