'use client';

import { getUserInfo } from "@/api";
import UserLayout from "@/components/User/page";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserEdit: React.FC<null> = () => {
    // const router = useRouter();
    let pathname = usePathname();
    pathname = pathname.toString();
    const id = parseInt(pathname.replace("/backend/user/edit/", ''), 10)
    const [data, setData] = useState();
    // console.log(id);
    useEffect(() => {
        (async () => {
            const res = await getUserInfo(id);
            setData(res.data);
        })();
    }, [id]);

    return <UserLayout title="用户编辑" editData={data} />;
};

export default UserEdit;
