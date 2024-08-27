import { UserCurrentType, UserType } from "@/types";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const [user, setUser] = useState<UserCurrentType>()
    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        // console.log("useEffectuserStorage", userStorage);
        const info = userStorage ? JSON.parse(userStorage).info : ''
        // console.log("useEffectinfo", info);
        setUser(info);
    }, []);
    // console.log("useCurrentUser", user);

    return user;

}