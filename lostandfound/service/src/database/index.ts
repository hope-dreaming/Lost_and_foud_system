require('./models/admin')
require('./models/user')
require('./models/lossitem')
require('./models/founditem')
require('./models/returnitem')

const { sequelize } = require('./init')
sequelize.sync().then(() => {
    console.log('所有模型同步成功')
}).catch((error: any) => {
    console.error('模型同步失败:', error)
})
console.log('数据库连接成功')
