// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/', function (req, res) {
//   // res.render генерує нам HTML сторінку
//   const list = User.getList()
//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('index', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'index',
//     data: {
//       users: {
//         list,
//         isEmpty: list.length === 0,
//       },
//     },
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// ================================================================

// router.post('/user-create', function (req, res) {
//   const { email, login, password } = req.body

//   const user = new User(email, login, password)

//   User.add(user)

//   console.log(User.getList())

//   res.render('success-info', {
//     style: 'success-info',
//     info: 'Користувач створений',
//   })
// })
//===========================

// ================================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query

  User.getById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач видалений',
  })
})
//===========================

// ================================================================

router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  let result = false

  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'Email пошта оновлена'
      : 'Cталася помилкка',
  })
})
//===========================

// ================================================================

class Product {
  static #list = []
  constructor(name, price, description, id, createDate) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 100000)

    this.createDate = () => {
      this.date = new Date().toISOString()
    }
  }

  verifyPrice = (price) => this.price === price

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static updateById = (id, data) => {
    const product = this.getById(id)

    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  static update = (name, { product }) => {
    if (name) {
      product.name = name
    }
  }

  static updateById = (id, data) => {
    const product = this.getById(id)
    const { name, price } = data

    if (product) {
      product.name = name
      product.price = price

      return true
    } else {
      return false
    }
  }

  static update = (name, price, { product }) => {
    if (name) {
      product.name = name
      product.price = price
    }
  }
}

// ================================================

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===============================

// ================================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  console.log(Product.getList())

  res.render('alert', {
    style: 'alert',
    info: 'Товар успішно доданий',
  })
})
//===========================
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  console.log(list)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
    data: {
      product: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===============================

// ================================================================

router.get('/product-edit', function (req, res) {
  const { id } = req.query

  const product = Product.getById(Number(id))

  if (product) {
    return res.render('product-edit', {
      style: 'product-edit',
      data: {
        name: product.name,
        price: product.price,
        id: product.id,
        description: product.description,
      },
    })
  } else {
    return res.render('alert', {
      style: 'alert',
      info: 'Продукту за таким ID не знайдено',
    })
  }
})

//===========================
// ================================================================

router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  const product = Product.updateById(Number(id), {
    name,
    price,
    description,
  })
  console.log(id)
  console.log(product)
  if (product) {
    res.render('alert', {
      style: 'alert',
      info: 'Інформація про товар оновлена',
    })
  } else {
    res.render('alert', {
      style: 'alert',
      info: 'Сталася помилка',
    })
  }
})

//===========================

// ================================================================

router.get('/product-delete', function (req, res) {
  const { id } = req.query
  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: 'Користувач видалений',
  })
})
//===========================
// Підключаємо роутер до бек-енду
module.exports = router
