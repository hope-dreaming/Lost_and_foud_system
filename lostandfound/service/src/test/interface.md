# 接口状态标记：

    `0`:  代表此接口尚未编写
    `1`： 代表此接口编写完毕，但未通过测试
    `2`:  代表此接口编写完毕，通过测试，但未完善文档中参数及返回数据
    `ok`: 代表此接口信息编写完毕，通过测试，且文档相关信息完善
    `Updating`: 代表此接口正在进行拓展
# 注意事项：
    本文档中的接口，除"登录相关"部分外，所有接口请求必须携带token，否则无法访问。
# 参数表格
1. 请求参数
    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    | 参数名 | 含义 | 类型 | 可否为空 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |



# 接口文档
- [/user路由](#一-user-路由)
    - [登录相关](#一登录相关)
    - [用户信息相关](#二用户信息相关)
    - [学生相关](#三学生相关)
    - [教师相关](#四教师相关)
    - [部门相关](#五部门相关)
- [/course路由](#二-course-路由)
    - [课程相关](#一课程相关)
    - [课程知识点相关](#二课程知识点相关)
    - [作业相关](#三作业相关)
    - [问答相关](#四问答相关)
- [/dept路由]

## 一、 /user 路由

### （一）登录相关




1. 用户注册`ok`（注册信息，注册信息待完善）

    ①.请求方式:'POST'

    ②.请求路径:
    
    ` http://localhost:3003/api/user/register `

    ③.请求参数:
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 是否必选 | 
        | :-----: | :----: | :------: | :--------: | 
        | username | 用户账户 | string | 是  |
        | password | 用户密码 | string | 是  |
        | usertype | 用户类型(0：管理员，1：学生，2：教师)| int| 是|
    - 示例:
        ```
        {
        "username": "user2",
        "password": "user1234",
        "usertype" : 1
        }
        ```
    ④.返回数据：
        无
    
2. 用户登录`ok`

    ①.请求方式:'POST'

    ②.请求路径:

    `http://localhost:3003/api/user/login`

    ③.请求参数:
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        |   username   |  用户账户   |   string    |   是      |
        |   password   |   用户密码  |  string     |  是       |
    - 示例:

    ```
    {
    "username": "admin",
    "password": "admin123"
    }
    ```
    ④.返回数据: 

    ```
    {

    }
    ```

### （二）用户信息相关

1. 查询单个用户信息`ok`

    ①.请求方式:'GET'

    ②.请求路径:
    
    `http://localhost:3003/api/user/queryUserInfo`

    ③.请求参数:  无

    ④.返回数据：
    - 格式：json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        |  usertype    |  用户类型(1：学生，2：教师)   |   int    |    不可     |
        |  sid    |  学生序号id   |  int     |  不可       |
        |  sno    |  学生学号   |  string     |   不可      |
        |  name    |  学生姓名   | string      |  不可       |
        |  sex    |  学生性别   |  string     |    可     |
        |  phone    | 学生手机号    | string      |   可      |
        |  email   |  学生邮箱   |  string     |    可     |
        |  birth    |  学生生日   |   date    |   可      |

    - 示例:
        ```
        {
        "usertype": "学生",
        "sid": 4,
        "sno": "admin",
        "name": "admin",
        "sex": "女",
        "phone": "1111",
        "email": "1111",
        "birth": "2024-07-28T15:09:21.000Z"
        }
        ```

### （三）学生相关
1. 查询所有学生信息`ok`

    ①.请求方式:'GET'

    ②.请求路径:'
    
    `http://localhost:3003/api/user/queryStudentList`

    ③.请求参数: 无

    ④.返回数据：
    - 格式：json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        | sid     |  学生序号id   | int      |   不可      |
        |  sno    |  学生学号   |  string     |   不可      |
        |  name    |  学生姓名   | string      |   不可      |
        |  phone    | 学生手机号   | string      |  可       |
        |  email    | 学生邮箱    |  string     |   可      |
        |  birth    |  学生生日   |  date     |  可       |
        |  sex    |  学生性别   |  string     |   可      |
        |  gid    |  所属班级id   |  int     | 可        |
        |  createdAt    |  信息创建时间   |  string     |    不可     |
        |  updatedAt    |   信息更新时间  |  string     |   不可      |


    - 示例:

    ```
    {
    "sid": 1,
    "sno": "123",
    "name": "123",
    "phone": "123",
    "email": "123",
    "birth": "2024-07-28T15:07:30.000Z",
    "sex": "男",
    "gid": 1,
    "createdAt": "2024-07-28T15:07:18.000Z",
    "updatedAt": "2024-07-28T15:07:21.000Z"
        },
    ```
2. 增加单个学生信息`1`

    ①.请求方式: `POST`

    ②.请求路径:
    
    `http://localhost:3003/api/user/addStudent`

    ③.请求参数:
    - 格式:json
    - 参数:

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    | sno     | 学生学号    |  string     |   否   |
    | name     | 学生姓名    |  string     |  否   |
    | password    | 学生密码    | string      | 否 |
    | phone     | 学生手机号    |  string     | 是 |
    | email     |  学生邮箱   | string      |   是 |
    | birth    |  学生生日   | date      |  是     |
    | sex     |  学生性别   | string      | 是     |
    | gid    |   学生所属班级id  |  int     |  是  |

    - 示例：

    ```
    {
    "sno":"9999",
    "name":"小明",
    "password":"9999",
    "phone":"189218",
    "email":"lzsls@163.com",
    "sex":"男"
    
    }
    ```
    ④.返回数据： 无

3. 删除单个学生信息`1`

    ①.请求方式:'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/user/deleteStudent`

    ③.请求参数:
    - 格式:json
    - 参数:

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |  sid    | 学生序号id    | int      |   不可  |

    - 示例:

    ```
    {
    "sid":9
    }
    ```

    ④.返回数据: 无

4. 修改单个学生信息`ok`

    ①.请求方式:'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/user/updateStudent`

    ③.请求参数
    - 格式:json
    - 参数:

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |  sid    | 学生序号id    |  int     | 是        |
    |  sno    | 学生学号    |  string     |  否       |
    |  name    | 学生姓名    | string      |  否       |
    |  phone    | 学生手机号    | string      |   否      |
    |  email    |  学生邮箱   |  string     |   否     |
    |  birth    |  学生生日   | date      |  否       |
    |  sex    |  学生性别   |  string     |  否       |
    |  gid    |  学生所属班级id   |int       |  否      |

    - 示例:

    ```
    {
    "sid":9,
    "sno":"7860"
    }
    ```

    ④.返回数据： 无

5. 修改单个学生账户密码`ok`

    ①.请求方式:'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/user/updateStuPassword`

    ③.请求参数
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        |  sid    |  学生序号id   | int      |  是      |
        |  password    |  学生密码   | string      |   是      |

    - 示例:

    ```
    {
    "sid":9,
    "password":"12138"
    }
    ```

    ④.返回数据:无

### （四）教师相关
1. 查询所有教师信息`ok`



    ①.请求方式:'GET'

    ②.请求路径:
    
    `http://localhost:3003/api/user/queryTeacherList`

    ③.请求参数: 无

    ④.返回数据:
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        | tid     | 教师序号id    | int      |  不可       |
        |  tno    |  教师工号   | string      | 不可        |
        |  name    | 教师姓名    | string      |  不可       |
        |  phone    | 教师手机号    | string      |  可       |
        |  email    | 教师邮箱    | string      |   可      |
        |   fid   |  教师所属院系id   |int       |  可       |
        |  createdAt    | 教师创建时间    |  string     |  不可       |
        |  updatedAt    | 教师更新时间    | string      |  不可       |

    - 示例：

    ```
    {
    "tid": 1,
    "tno": "1",
    "name": "xx",
    "pthone": "122",
    "sex": "男",
    "email": "无",
    "fid": 1,
    "createdAt": "2024-07-28T15:01:13.000Z",
    "updatedAt": "2024-07-28T15:01:16.000Z"
    },
    ```

2. 增加单个教师信息`1`

    ①.请求方式:'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/user/addTeacher`

    ③.请求参数:
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        |  tno    |  教师工号   |  string     |    是     |
        |  name    |  教师姓名   |  string     |    是     |

    - 示例:

    ```
    {
    "tno":"1357",
    "name":"王老师",
    "password":"1257"
    }
    ```

    ④.返回数据：无

3. 删除单个教师信息`1`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api/user/deleteTeacher`

    ③.请求参数:
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        |  tid    | 教师序号id    | int      |   是      |

    - 示例:

    ```
    {
    "tid":10
    }
    ```

    ④.返回数据：无

4. 修改单个教师信息`1`

    ①.请求方式: `POST`

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

5. 修改单个教师账户密码`0`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

### （五）部门相关
1. 查询所有班级信息`ok`

    ①.请求方式:'GET'

    ②.请求路径:
    
    `http://localhost:3003/api/user/queryAllClassInfo`

    ③.请求参数: 无
    
    ④.返回数据：
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :----: | :----: | :------: | :--------: |
        | gid     |课程序号id     | int      |  不可       |
        |  name    |  班级名称   |  string     |  不可       |
        |   eyear   | 班级入学年份    |  int     |  不可       |
        |  tid   | 教师序号id    |  int     |   可       |
        |  mid    | 专业序号id    | int      |  可       |
        |  teacherTno    | 教师工号    |  string     |  可       |
        |  teacherName    | 教师名称    |   string    |   可      |
        |  majorName    | 专业名称    |  string     |   可      |
        
    - 示例:

    ```
    {
    "gid": 1,
    "name": "计算机1班",
    "eyear": 2024,
    "tid": 1,
    "mid": 1,
    "teacherTno": "1",
    "teacherName": "xx",
    "majorName": "计算机专业"
    },
    ```

## 二、 /course 路由

### （一）课程相关
1. 查询所有课程信息`ok`

    ①.请求方式:'GET'

    ②.请求路径:
    
    `http://localhost:3003/api/user/queryAllClassInfo`

    ③.请求参数:无

    ④.返回数据:
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        | gid     | 班级序号id    | int      |   不可      |
        |  name    | 班级名称    | string      |   不可      |
        |  eyear    |  入学年份   | int      |   不可      |
        |  tid    |  班主任id   | int      |   可      |
        |  mid    |  专业id   |   int    |    可     |
        |  teacherTno    | 班主任工号    |   string    |  可(tid不为空时此项不为空)      |
        |  teacherName    | 班主任姓名    |  string     |  可(tid不为空时此项不为空)       |
        |   majorName   |  所属专业名称   |  string     |    可(mid不为空时此项不为空)     |


    - 示例:

    ```
    {
    "gid": 1,
    "name": "计算机1班",
    "eyear": 2024,
    "tid": 1,
    "mid": 1,
    "teacherTno": "1",
    "teacherName": "xx",
    "majorName": "计算机专业"
    },
    ```

2. 查询角色(单个用户)对应课程信息`ok`

    ①.请求方式:'GET'

    ②.请求路径:
    
    `http://localhost:3003/api/course/queryCourseList`

    ③.请求参数 :  无

    ④.返回数据：
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        | courseId     | 课程序号id    |  int     |  不可       |
        | courseCode     | 课程代码    |  string     |  不可       |
        | courseName     | 课程名称    |  string     |  不可       |
        | courseCredit     |课程学分     | int      |   可      |
        | courseDesc     | 课程描述    |  string     |   可      |
        | courseStatus     | 课程状态    |  int     |   不可      |
        | etime     | 课程开始时间    |  date     |   可      |
  
    - 示例:

    ```
    {
    "courseId": 1,
    "courseCode": "1",
    "courseName": "Python程序设计",
    "courseCredit": 3,
    "courseDesc": "一门好课程",
    "courseStatus": 1,
    "etime": "2024-07-28T16:22:17.000Z"
    },
    ```

3. 增加单个课程信息`1`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数:

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

4. 删除单个课程信息`1`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

5. 修改单个课程信息`1`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

### （二）课程知识点相关
1. 查询所有课程知识点信息`0`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数
    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据
    | 参数名 | 含义 | 类型 | 可否为空 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

2. 查询单个课程知识点信息`ok`

    ①.请求方式:'GET'

    ②.请求路径:

    `http://localhost:3003/api/course/queryKnowledgeList?courseId=？`

    ③.请求参数：无

    ④.返回数据：
    - 格式:json
    - 参数:

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        | courseId     | 课程序号id    |  int     |  不可       |
        | courseName     | 课程名称    |  string     |  不可       |
        |  knowledgess    | 知识点信息    |  数组     |   可      |
        |  name    |  知识点名称   |   string    |     不可    |
        |  desc    |  知识点描述   |   string    |  可       |
        |  chapter    | 知识点章节    | string      |  不可       |
        |   difficulty   | 知识点难度    |  string     |   不可      |

    - 示例：
    
    ```
    {
    "courseId": 1,
    "courseName": "Python程序设计",
    "knowledgess": [
    {
        "name": "数据类型",
        "desc": "方法",
        "chapter": "第一章",
        "difficulty": "1"
    },
    {
        "name": "循环结构",
        "desc": "信息",
        "chapter": "第二章",
        "difficulty": "2"
    }
    ]
    }
    ```

3. 增加单个课程知识点信息`0`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

4. 删除单个课程知识点信息`0`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

5. 修改单个课程知识点信息`0`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数

    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据

### （三）作业相关
1. 查询作业记录`ok`

    ①.请求方式: 'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/course/queryAssignmentRecords`

    ③.请求参数
    - 格式：JSON
    - 参数：(若所有参数为空，则查询所有数据)

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        | studentId     |  学生序号id   |   int    |  可       |
        | courseId     | 课程序号id    |  int     |   可      |
        |      |     |       |         |
        |      |     |       |         |
        |      |     |       |         |
        |      |     |       |         |
        |      |     |       |         |
 
  
        - "gradeId": 含义：班级序号id；类型：int；可否为空：可
        - "assignmentName": 含义：作业名称；类型：string串；可否为空：可
        - 示例：
            ```
            {
                "studentId":4,
                "assignmentName":"第一次作业",
                "courseId":1,
                "gradeId":2
            }
            ```

    ④.返回数据
    - 格式：JSON
    - data数据：

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        |      |     |       |         |

        - "aid" : 含义：作业序号id；类型：int；
        - "type" : 含义：作业类型；类型：string串；
        - "numbers": 含义：作业题目数量；类型：int；
        - "answer": 含义：作业详情；类型：string串；
        - "score": 含义：作业总得分；类型：浮点型；
        - "totalscore": 含义：作业总分；类型：浮点型；
        - "knowledge": 含义：知识点；类型：string串；
        - "name": 含义：作业名称；类型：string串；
        - "sid": 含义：学生序号id；类型：int；
        - "cid": 含义：课程序号id；类型：int；
        - "createdAt": 含义：作业记录保存时间；类型：string串；
        - "updatedAt": 含义：作业记录修改时间；类型：string串;
        - "studentSno": 含义：学生学号；类型：string串;
        - "studentName": 含义：学生姓名；类型：string串;
        - "gradeName": 含义：班级名称；类型：string串;
        - "courseName": 含义：课程名称；类型：string串;
        
    - 示例：

    ```
    [
        {
        "aid": 1,
        "type": 0,
        "numbers": 3,
        "answer": "第一题选a第二题选b",
        "score": 95,
        "totalscore": 100,
        "knowledge": "循环，数组，地点",
        "name": "第一次作业",
        "sid": 4,
        "cid": 1,
        "createdAt": "2024-08-01T11:05:32.000Z",
        "updatedAt": "2024-08-01T11:05:32.000Z",
        "studentSno": "admin",
        "studentName": "admin",
        "gradeName": "计算机2班",
        "courseName": "Python程序设计"
        }
    ]
    ```

2. 增加作业记录`ok`

    ①.请求方式: 'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/course/saveAssignmentRecords`

    ③.请求参数:
    - 格式：JSON
    - 参数：

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        |      |     |       |         |

        - "studentId": 含义：学生序号id；类型：int；可否为空：不可
        - "courseId": 含义：课程序号id；类型：int；可否为空：不可
        - "name": 含义：作业名称；类型：string串；可否为空：不可
        - "assignment_type": 含义：作业类型；类型：int；可否为空：不可
        - "course_kowledge": 含义：知识点；类型：string串；可否为空：不可
        - "assignment_qnumber": 含义：题目数量；类型：int；可否为空：不可
        - "assignment_score": 含义：作业总分；类型：浮点型；可否为空：不可
        - "assignment_totalscore": 含义：作业总得分；类型：浮点型；可否为空：不可
        - "assignment_detail":  含义：作业详情；类型：string串；可否为空：不可

    - 示例：

    ```
    {
        "studentId": 4, 
        "courseId": 1,
        "name" : "第四次作业",
        "assignment_type": 0, 
        "course_knowledge": "循环，数组，地点",
        "assignment_qnumber": 3, 
        "assignment_score": 95, 
        "assignment_totalscore": 100,
        "assignment_detail": "第一题选a第二题选b"

    }
    ```

### （四）问答相关

1. 查询问答记录`ok`

    ①.请求方式: 'POST'

    ②.请求路径:
    
    `http://localhost:3003/api/course/queryQuestionInfo`

    ③.请求参数
    - 格式：JSON
    - 参数：(若所有参数为空，则查询所有数据)

        | 参数名 | 含义 | 类型 | 是否必选 |
        | :-----: | :----: | :------: | :--------: |
        |      |     |       |         |
        - "studentId": 含义：学生序号id；类型：int；可否为空：可
        - "courseId": 含义：课程序号id；类型：int；可否为空：可
        - "gradeId": 含义：班级序号id；类型：int；可否为空：可

        - 示例：

        ```
        {
        "studentId":4,
        "courseId":2,
        "gradeId":2
        }
        ```

    ④.返回数据
    - 格式：JSON
    - data数据：

        | 参数名 | 含义 | 类型 | 可否为空 |
        | :-----: | :----: | :------: | :--------: |
        |      |     |       |         |

        - "qid" : 含义：问答序号id；类型：int；
        - "question": 含义：问题；类型：string串；
        - "answer": 含义：回答；类型：string串；
        - "notes": 含义：备注；类型：string串；
        - "cid": 含义：课程序号id；类型：int；
        - "sid": 含义：学生序号id；类型：int；
        - "createdAt": 含义：问答保存时间；类型：string串；
        - "studentSno": 含义：学生学号；类型：string串；
        - "studentName": 含义：学生姓名；类型：string串；
        - "gradeName": 含义：班级名称；类型：string串；
        - "courseName": 含义：课程名称；类型：string串；

    - 示例：

    ```
    [
        {
        "qid": 2,
        "question": "你是谁",
        "answer": "我是教学助手",
        "notes": null,
        "cid": 2,
        "sid": 4,
        "createdAt": "2024-08-03T13:22:38.000Z",
        "studentSno": "admin",
        "studentName": "admin",
        "gradeName": "计算机2班",
        "courseName": "数据库系统原理"
        }
    ]
    ```

2. 增加问答记录`0`

    ①.请求方式:''

    ②.请求路径:
    
    `http://localhost:3003/api`

    ③.请求参数
    | 参数名 | 含义 | 类型 | 是否必选 |
    | :-----: | :----: | :------: | :--------: |
    |      |     |       |         |

    ④.返回数据
