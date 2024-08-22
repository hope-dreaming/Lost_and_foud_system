import qs from "qs"
import { FounditemQuery, FounditemType } from "@/types"
import request from "@/utils/request";

export async function getFoundItemList(params?: FounditemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryFoundItemList";
    const res = await request.post(url, params);

    return res
}

export async function getFoundItemInfo(params?: FounditemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryFoundItemInfo";
    const res = await request.post(url, params);

    return res
}

// export async function addFoundItemInform(params: LossitemType) {
//     const url = `/api/addFounditemInform`;
//     const res = await request.post(url, params);
//     return res
// }

// export async function deleteFounditem(id: string) {
//     const url = `/api/deleteFounditem?id=${id}`;
//     const res = await request.get(url);
//     return res
// }