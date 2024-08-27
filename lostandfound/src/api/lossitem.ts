import qs from "qs"
import { LossitemOneQueryType, LossitemQuery, LossitemType } from "@/types"
import request from "@/utils/request";

export async function getLossItemList(params?: LossitemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryLossItemList";
    const res = await request.post(url, params);

    return res
}

export async function getLostItemInfo(params?: LossitemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryLosttItemInfo";
    const res = await request.post(url, params);

    return res
}

export async function getOneLossItem(params: LossitemOneQueryType) {
    const url = "/api/queryOneLossItem";
    const res = await request.post(url, params);

    return res
}

export async function addLossItemInform(params: LossitemType) {
    const url = `http://locahost:3000/api/addLossItem`;
    const res = await request.post(url, params);
    return res
}

export async function deleteLossItem(params: number) {
    const url = "api/deleteLossItem"
    const res = await request.post(url, params);
    return res
}


export async function updateLossItemInform(params: LossitemType) {
    const url = "api/updateLossItem";
    const res = await request.post(url, params);
    return res
}


export async function getLossItemType(params: LossitemQuery) {
    const url = "api/queryLossItemType"
    const res = await request.get(url);
    return res
}
