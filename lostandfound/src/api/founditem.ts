import qs from "qs"
import { FounditemOneQueryType, FounditemQuery, FounditemType } from "@/types"
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

export async function deleteFoundItem(params?: any) {
    const url = "/api/deleteFoundItem";
    const res = await request.post(url, params);

    return res
}

export async function getFountitemType(params?: any) {
    const url = "/api/queryFountitemType";
    const res = await request.get(url);

    return res
}

