
import Sequelize from 'sequelize'
import config from '../config/config.cjs'
import fg from 'fast-glob'

const connection = new Sequelize(config)

let models = fg.sync('**/src/database/models/*.js')

models.map(async file =>{
  let { default: model } = await import(`../../${file}`)
  model.init(connection)
})

models.map(async file =>{
  let { default: model } = await import(`../../${file}`)
  if (typeof model.associate !== 'undefined') {
    model.associate(connection)
  }
})

export default connection
