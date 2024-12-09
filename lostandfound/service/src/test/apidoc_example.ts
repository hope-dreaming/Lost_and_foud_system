/**
 * @api {method} path title
 * @apiName
 * @apiGroup
 * @apiHeaderExample {json} 请求头示例:
                 { "Authorization": token }
 * @apiBody {type} [field=defaultValue] description
 *
 * @apiSuccess {type} field description

 */

//  apidoc -i src/router/ -o src/apidoc

/**
 * 请求参数书写规则
 * @apiBody [{type}] [field=defaultValue] [description]
 * @apiDescription text //对接口的具体描述
 *
 * @apiError [(group)] [{type}] field [description]
 * @apiError UserNotFound
 *
 * @apiExample [{type}] title
            example
 * @apiExample {js} Example usage:
            This is an example.
 * @apiHeader [(group)] [{type}] [field=defaultValue] [description] //传送请求头需要的参数，比如token
 * @apiHeader (MyHeaderGroup) {String} authorization Authorization value.
 *
 * @apiParam [(group)] [{type}] [field=defaultValue] [description]
 * @apiParam (MyGroup) {Number} id Users unique ID
 *
 * @apiSuccess [(group)] [{type}] field [description]
 * @apiSuccess {String} firstname Firstname of the User.
 */
