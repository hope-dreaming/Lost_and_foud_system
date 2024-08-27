'use client'
import { getLossItemList, getLostItemInfo, getOneLossItem } from "@/api";
import LossitemLayout from "@/components/LossitemForm/page";
import dayjs from "dayjs";
import moment from "moment";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
export default function LossitemAdd() {
    let pathname = usePathname();
    pathname = pathname.toString();
    const id = parseInt(pathname.replace("/backend/lossitem/edit/", ''), 10)
    const [data, setData] = useState();
    const params = useMemo(() => ({ id }), [id]);

    const fetchData = useCallback(
        () => {
            getOneLossItem(
                params
            ).then((res) => {
                res.data.date = (dayjs(res.data.date).format('YYYY-MM-DD HH:mm:ss'))
                res.data.date = moment(dayjs(res.data.date).toDate())
                setData(res.data);
            });
        },
        [params]
    );
    console.log(id);
    useEffect(() => {
        fetchData()
    }, [params, fetchData]);
    return (
        <LossitemLayout title="修改寻物信息" editData={data} />
    );
}