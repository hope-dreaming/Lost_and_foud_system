import qs from "qs"
import { UserLoginType } from "@/types"
import request from "@/utils/request";

export async function getLogin(params?: UserLoginType) {
    // https://apifoxmock.com/m1/4946855-4604544-default/queryLossitem?name=xxx&type=xxx
    const url = "/api/login";
    const res = await request.post(url, params);

    return res
}
