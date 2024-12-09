import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'AIcourse API',
      description: '课程通API文档',
      contact: {
        name: '希凡',
        email: 'lzsls20@163.com',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3003/api',
        description: '本地服务器',
      },
      {
        url: '<your live url here>',
        description: '生产服务器(请替换)',
      },
    ],
  },
  explore: true,
  customCssUrl: './src/test/customCss.css',
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  apis: [
    './swagger.yml',
  ],
  failOnErrors: true,

}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
  // Swagger Page
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  )

  // Documentation in JSON format
  // app.get('/docs.json', (req, res) => {
  //   res.setHeader('Content-Type', 'application/json')
  //   res.send(swaggerSpec)
  // })
}
export default swaggerDocs
