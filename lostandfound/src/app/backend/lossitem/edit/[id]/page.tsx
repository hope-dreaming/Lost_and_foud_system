import { getLossItemList, getLostItemInfo } from "@/api";
import LossitemLayout from "@/components/LossitemForm/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function LossitemAdd() {
    let pathname = usePathname();
    pathname = pathname.toString();
    const lid = parseInt(pathname.replace("/backend/lossitem/edit/", ''), 10)
    const [data, setData] = useState();
    // console.log(id);
    useEffect(() => {
        (async () => {
            const res = await getLostItemInfo(lid);
            setData(res.data);
        })();
    }, [lid]);

    return (
        <LossitemLayout title="修改寻物信息" editData={data} />
    );
}