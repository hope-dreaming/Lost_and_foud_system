'use client';

import { getUserInfo } from "@/api";
import UserLayout from "@/components/User/page";
import { USER_ROLE, USER_SEXY, USER_STATUS } from "@/constants";
import { UserEditInfoType, UserInfoType, UserOneQueryType } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const UserEdit: React.FC<null> = () => {
    // const router = useRouter();
    let pathname = usePathname();
    pathname = pathname.toString();
    const id = parseInt(pathname.replace("/backend/user/edit/", ''), 10)
    const [data, setData] = useState<UserEditInfoType>({
        role: USER_ROLE.USER,
        sexy: USER_SEXY.MAN,
    });
    const params = useMemo(() => ({ id }), [id]);

    const fetchData = useCallback(
        () => {

            getUserInfo(
                params
            ).then((res) => {
                setData(res.data);
            });
        },
        [params]
    );
    // console.log(id);
    useEffect(() => {
        fetchData()
    }, [params, fetchData]);

    return <UserLayout title="用户编辑" editData={data} />;
};

export default UserEdit;
