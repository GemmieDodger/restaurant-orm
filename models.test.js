const {Restaurant, Menu, Item} = require('./models.js')
const {db} = require('./db.js')


describe('Restaurant', () => {
    beforeAll((done) => {
        db.exec('CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT); CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER); CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price TEXT, menu_id); ', done)
    })
    test('when a restaurant is created add to a database', async () => {
        const restaurant = await new Restaurant({name:'The Triangle', image: "image.url"})    
        console.log(restaurant.id)
        expect(restaurant.id).toBe(1)
      
    })
   

    test('create a restaurant for the data row', (done) => {
        db.get('SELECT * FROM restaurants WHERE id = 1;', async (err, row) => {
            expect(row.name).toBe("The Triangle")
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(1)
            expect(restaurant.name).toBe(`The Triangle`)
            done()
            })
    })

    test('check menu is added to database', async () => {
        const menu = await new Menu({title:'Dinner',restaurant_id:1})
        expect(menu.id).toBe(1)
      
    })

    test('create a menu for the data row', (done) => {
        db.get('SELECT * FROM menus WHERE id = 1;', async (err, row) => {
            
            expect(row.title).toBe("Dinner")
            const menu = await new Menu(row)
            expect(menu.id).toBe(1)
            expect(menu.title).toBe('Dinner')
            done()
            })
    })

    test('when a item is created add to a database', async () => {
        const item = await new Item({name:"Banana split", price: 3.00, menu_id:1})    
        // console.log(restaurant.id)
        expect(item.id).toBe(1)
      
    })
   

    test('create a item for the data row', (done) => {
        db.get('SELECT * FROM items WHERE id = 1;', async (err, row) => {
            expect(row.name).toBe("Banana split")
            const item = await new Item(row)
            expect(item.id).toBe(1)
            expect(item.name).toBe("Banana split")
            done()
            })
    })
    
   
})

//wrap in a promise









