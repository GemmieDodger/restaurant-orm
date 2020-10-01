const {jointdb} = require('./jointdb.js')

class Restaurant {
   
    constructor(data) {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.image = data.image

        if (restaurant.id) {
            return Promise.resolve(restaurant)
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
}