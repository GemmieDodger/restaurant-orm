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
    test('a restaurant should have menus', async (done) => {
        const restaurant = await new Restaurant({name: "Rice-and-Pot", images: "url"})
        expect(restaurant.menus.length).toBe(0)
        // const menu = await new Menu({title: "Dessert", restaurant_id: restaurant.id})
        await restaurant.addMenu({title: "Dessert"})
        expect(restaurant.menus[0] instanceof Menu).toBeTruthy()
        expect(restaurant.menus[0].id).toBeTruthy()
        await restaurant.addMenu({title: "Child's Menu"})
        await restaurant.addMenu({title: "Wine Menu"})
        
        db.get('SELECT * FROM restaurants WHERE id=?', [restaurant.id], async (err, row) => {
            console.log(row)
            const ricepot = await new Restaurant(row)
            expect(ricepot.id).toBe(restaurant.id)
            expect(ricepot.menus.length).toBe(3)
            expect(ricepot.menus[0] instanceof Menu).toBeTruthy()
            done()
        })
    })
        //MENUS
        // test('a menu should have items', async(done) => {
        //     //const restaurant = await new Restaurant({name:'Happy Eaters', images: "url"})
        //     const menu = await new Menu({title:"Dinner", restaurant_id:1})
        //     expect(menu.items.length).toBe(0)
        //     await menu.addMenu({name:"Wine"})
        //     expect(menu.items[0] instanceof Menu).toBeTruthy
        //     expect(menu.menus[0].id)
        // })   
})


describe('Menus', () => {
    // beforeAll((done) => {
    //     db.exec('CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT, image TEXT); CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER); CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price TEXT, menu_id); ', done)
    // })
        
        test('check menu is added to database', async () => {
            const menu = await new Menu({title:'Dinner',restaurant_id:1})
            expect(menu.id).toBe(4)
          
        })
    
        test('create a menu for the data row', (done) => {
            db.get('SELECT * FROM menus WHERE id = 4;', async (err, row) => {
                
                expect(row.title).toBe("Dinner")
                const menu = await new Menu(row)
                expect(menu.id).toBe(4)
                expect(menu.title).toBe('Dinner')
                done()
                })
        })
        //check you can assign a menu to a restaurant
 
        test('check items are assigned to menus + restaurant', async () => {
            const restaurant = await new Restaurant({name: 'An apple a day', image:"tastyfruit.jpg"})
            const menu = await new Menu({title:"Breakfast", restaurant_id: restaurant.id})
            const item = await new Item({name: "Full English Breakfast", price: "7.00", menu_id: menu.id})
            const items = menu.addItem(item)
            const menus = restaurant.addMenu(menu)
            expect(menu.title).toBe('Breakfast')
            expect(menu.id).toBe(5)
            console.log('this should be array breakfast')
            console.log(items)
            console.log("this should be list of restaurant")
            console.log(restaurant)
            console.log("this should be list of menu")
            console.log(menus)


            })

        })
     
  

describe('Item', () => {
    test('when a item is created add to a database', async () => {
        const item = await new Item({name:"Banana split", price: 3.00, menu_id:1})    
        // console.log(restaurant.id)
        expect(item.id).toBe(3)
      
    })
   

    test('create a item for the data row', (done) => {
        db.get('SELECT * FROM items WHERE id = 3;', async (err, row) => {
            expect(row.name).toBe("Banana split")
            const item = await new Item(row)
            expect(item.id).toBe(3)
            expect(item.name).toBe("Banana split")
            done()
            })
    })
    test('check multiple items assigned to multiple menus', async ()  => {
        const restaurant = await new Restaurant({name: "Holy Pizza"})
        const starter = await new Menu({title: "Starter"})
        const main = await new Menu({title: "Main"})
        const item1 = await new Item({name: "Pitta Bread and Houmous", price: 4.00, menu_id: 4})
        const item2 = await new Item({name: "Olives", price: 3.00, menu_id: 4})
        const item3 =  await new Item({name: "Hawaiian", price: 10.00, menu_id: 5})
        const item4 = await new Item({name: "Pepperoni", price: 10.00, menu_id: 5})
        const items = starter.addItem(item1, item2)
        const items1 = main.addItem(item3, item4)
        const menus = restaurant.addMenu(starter, main)
        console.log(restaurant)
    })    
    
})








