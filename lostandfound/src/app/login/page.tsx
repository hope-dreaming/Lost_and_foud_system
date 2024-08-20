'use client'

import { usePathname, useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        pathname === '/login' ? <div>登录界面</div> : <div>登录成功</div>
    );
}
