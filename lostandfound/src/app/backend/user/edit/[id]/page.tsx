import { getUserDetail } from "@/api";
import UserLayout from "@/components/User/page";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserEdit: React.FC<null> = () => {
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const res = await getUserDetail(router.query.id as string);
            setData(res.data);
        })();
    }, [router.query.id]);

    return <UserLayout title="用户编辑" editData={data} />;
};

export default UserEdit;
