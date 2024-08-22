import qs from "qs"
import { LossitemQuery, LossitemType } from "@/types"
import request from "@/utils/request";

export async function getLossItemList(params?: LossitemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryLossItemList";
    const res = await request.post(url, params);

    return res
}

export async function getLosttItemInfo(params?: LossitemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryLosttItemInfo";
    const res = await request.post(url, params);

    return res
}

export async function addLossItemInform(params: LossitemType) {
    const url = `/api/addLossitemInform`;
    const res = await request.post(url, params);
    return res
}
