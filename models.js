const {db} = require('./db.js')

class Restaurant {
   
    constructor(data) {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.image = data.image
        restaurant.menus = []

        
        if (restaurant.id) {
            return new Promise((resolve, reject) => {
                db.all('SELECT * FROM menus WHERE restaurant_id=?;', [restaurant.id], (err,rows) => {
                    const arrayOfPromises = rows.map(row => new Menu(row))
                    Promise.all(arrayOfPromises).then((menus) => {
                        restaurant.menus = menus
                        console.log(restaurant.menus)
                        resolve(restaurant)
                    }).catch(err => reject(err)) //do all promises and then, if error catch
                })
            })
        } else {
            console.log('outside the db callabck', restaurant,this)

            return new Promise((resolve, reject) => {
                db.run('INSERT INTO restaurants(name,image) VALUES (?,?);', [restaurant.name, restaurant.image],
                 function (err) {
                     console.log(err)
                     if (err) return reject(err)
                     restaurant.id = this.lastID
                     console.log("inside of callback", restaurant,this)
                     return resolve(restaurant)
                })
            })

        }
    }
    async addMenu(data) {
        const menu = await new Menu({title: data.title, restaurant_id: this.id})
        this.menus.push(menu)
    }

}

class Menu {
    constructor(data) {
        const menu = this
        menu.id = data.id
        menu.title = data.title
        menu.restaurant_id = data.restaurant_id
        menu.items = []

        if (menu.id) {
             
            return Promise.resolve(menu) 
        } else {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO menus(title, restaurant_id) VALUES (?, ?);`, [menu.title, menu.restaurant_id], 
                function (err) {
                    if (err) return reject(err)
                    menu.id = this.lastID
                    console.log("inside of the callback menu", menu, this)
                    return resolve(menu)
                })
            })
        }
    }
    async addItem(data) {
        const item = await new Item({name: data.name, price: data.price, menu_id: this.id})
            this.items.push(item)
    }
}

class Item {
   
    constructor(data) {
        const item = this
        item.id = data.id
        item.name = data.name
        item.price = data.price
        item.menu_id = data.menu_id

        if (item.id) {
            return Promise.resolve(item)
        } else {
            console.log('outside the db callabck', item,this)

            return new Promise((resolve, reject) => {
                db.run('INSERT INTO items(name,price,menu_id) VALUES (?,?,?);', [item.name, item.price, item.menu_id],
                 function (err) {
                     console.log(err)
                     if (err) return reject(err)
                     item.id = this.lastID
                     console.log("inside of callback", item,this)
                     return resolve(item)
                })
            })

        }
    }
}


module.exports = { Restaurant, Menu, Item}