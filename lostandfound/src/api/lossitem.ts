import qs from "qs"
import { LossitemQuery, LossitemType } from "@/types"
import request from "@/utils/request";

export async function getLossItemList(params?: LossitemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = `/api/queryLossitem?${qs.stringify(params)}`;
    const res = await request.get(url);

    return res
}

export async function addLossItemInform(params: LossitemType) {
    const url = `/api/addLossitemInform`;
    const res = await request.post(url, params);
    return res
}
