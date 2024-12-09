/**
 * @swagger
 *
 * /users:
 *    post:
 *      produces:
 *        - application/json
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        description: User to create.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          description: The user ID.
 *                          example: 0
 *                        name:
 *                          type: string
 *                          description: The user's name.
 *                          example: Leanne Graham
 */
// 请确保使用两个空格（或四个空格）进行缩进，而不是制表符
// get（缩进两个空格)
// summary应该是对此路由目标的简要描述
// description应提供更多详细信息，例如何时或为何要使用该路由。

// YAML格式
// 字典的表示形式很简单（冒号后面必须跟一个空格）：key: value
// content字段描述了内容类型（application/json）
// schema描述了响应对象

/**
 * @swagger
 *
 * /login:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 */
