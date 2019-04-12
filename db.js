
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/ecart.db',

})
//databse for vendor
const vendors = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
  }
})
// database for product

const products = db.define('product', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  quantity: {
    type: Sequelize.NUMBER,
    validate: {
      notEmpty: true
    },
    allowNull: false
  }
})

vendors.hasMany(products, { onDelete: "cascade" });
products.belongsTo(vendors)

module.exports = {
  db, vendors, products
}
