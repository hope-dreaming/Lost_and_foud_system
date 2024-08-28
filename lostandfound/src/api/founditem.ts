import qs from "qs"
import { DeleteType, FounditemOneQueryType, FounditemQuery, FounditemType } from "@/types"
import request from "@/utils/request";

export async function getFoundItemList(params?: FounditemQuery) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryFoundItemList";
    const res = await request.post(url, params);

    return res
}

export async function getFoundItemInfo(params?: FounditemQuery | number) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/queryFoundItemInfo";
    const res = await request.post(url, params);

    return res
}

export async function addFoundItem(params?: any) {
    const url = "/api/addFoundItem";
    const res = await request.post(url, params);

    return res
}

// 更新失物信息
export async function updateFoundItem(params?: any) {
    const url = "/api/updateFoundItem";
    const res = await request.post(url, params);

    return res
}

export async function getOneFoundItem(params: FounditemOneQueryType) {
    const url = "/api/queryOneFoundItem";
    const res = await request.post(url, params);

    return res
}

// 0 const { id } = req.body
export async function deleteFoundItem(params: DeleteType) {
    const url = "/api/deleteFoundItem";
    const res = await request.post(url, params);

    return res
}

// 0 
export async function getFountitemType(params?: any) {
    const url = "/api/queryFountitemType";
    const res = await request.get(url);

    return res
}

// 0 const { fid, status } = req.body
export async function editFoundItemStatus(params: DeleteType) {
    const url = "/api/editFoundItemStatus";
    const res = await request.post(url, params);

    return res
}