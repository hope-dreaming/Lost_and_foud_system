'use client'

import { getFoundItemInfo, getOneFoundItem } from "@/api";
import FounditemLayout from "@/components/FounditemForm/page";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import LossitemLayout from "@/components/LossitemForm/page";
import dayjs from "dayjs";
import moment from "moment";

export default function LossitemAdd() {
    let pathname = usePathname();
    pathname = pathname.toString();
    const id = parseInt(pathname.replace("/backend/founditem/edit/", ''), 10)
    const [data, setData] = useState();
    const params = useMemo(() => ({ id }), [id]);

    const fetchData = useCallback(
        () => {
            getOneFoundItem(
                params
            ).then((res) => {
                res.data.date = (dayjs(res.data.date).format('YYYY-MM-DD HH:mm:ss'))
                res.data.date = moment(dayjs(res.data.date).toDate())
                setData(res.data);
            });
        },
        [params]
    );
    // console.log(id);
    useEffect(() => {
        fetchData()
    }, [params, fetchData]);
    return (
        <FounditemLayout title="修改寻物信息" editData={data} />
    );
}