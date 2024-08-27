import { getFoundItemInfo } from "@/api";
import FounditemLayout from "@/components/FounditemForm/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function LossitemAdd() {
    let pathname = usePathname();
    pathname = pathname.toString();
    const fid = parseInt(pathname.replace("/backend/founditem/edit/", ''), 10)
    const [data, setData] = useState();
    // console.log(id);
    useEffect(() => {
        (async () => {
            const res = await getFoundItemInfo(fid);
            setData(res.data);
        })();
    }, [fid]);

    return (
        <FounditemLayout title="修改寻物信息" editData={data} />
    );
}