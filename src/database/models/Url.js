import pkg from 'sequelize'
const { Model, DataTypes } = pkg

export default class Url extends Model {
  static init(sequelize) {
    super.init({
      original_url: DataTypes.STRING,
      shortened: DataTypes.STRING,
      access: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'urls'
    })
  }
}
