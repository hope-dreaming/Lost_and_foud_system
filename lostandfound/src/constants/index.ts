export enum USER_ROLE {
    ADMIN = "admin",
    USER = "user",
}

export enum USER_STATUS {
    ON = 1,//正常
    OFF = 0,//禁用
}

export enum USER_SEXY {
    MAN = "男",
    WOMAN = "女",
}

export enum RETURN_ISOK {
    OK = 1,//通过
    NO = 0,//驳回
    NOT = 2,//未处理
    YES = 4,//已处理
}

export enum FOUND_ISRETURN {
    OK = 1,//被领取
    NO = 0,//未被领取
}

export enum LOSS_ISFOUND {
    OK = 1,//被找到
    NO = 0,//未被找到
}