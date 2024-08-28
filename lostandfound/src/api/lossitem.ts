import qs from "qs"
import { DeleteType, LossitemOneQueryType, LossitemQuery, LossitemType } from "@/types"
import request from "@/utils/request";
import axios from "axios";

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

// 0 const {id} = req.body
export async function deleteLossItem(params: DeleteType) {
    const url = "api/deleteLossItem"
    const res = await request.post(url, params);
    return res
}

// 0  const { name, type, date, place, desc, lid, uid } = req.body
export async function updateLossItemInform(params: LossitemType) {
    const url = "api/updateLossItem";
    const res = await request.post(url, params);
    return res
}

// 0
export async function getLossItemType(params: LossitemQuery) {
    const url = "api/queryLossItemType"
    const res = await request.get(url);
    return res
}

// 0 const { lid, status } = req.body
export async function editLossItemStatus(params: any) {
    const url = "api/editLossItemStatus"
    const res = await request.post(url, params);
    return res
}