//Requerir paquetes y librerias
const mongoose = require(`mongoose`);
const { DB_URL } = require('../utils/db');

//Requerir los modelos
const Product = require(`../models/Product`);

//Creación del listado semilla
const products = [
    {
        name: "Margaretta",
        price: 12,
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Basílico"],
        image: "https://www.annarecetasfaciles.com/files/pizza-margarita-1-scaled.jpg",
        category: "Pizzas",
        vegetarian: true,
    },
    {
        name: "Funghi",
        price: 14,
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Champiñones"],
        image: "https://www.burnhard.de/magazin/_ipx/w_992,f_jpeg,fit_cover/https://cdn2.springlane.de/media/image/8e/94/55/Pizza_Funghi_Titelbild_1280x1280.jpg",
        category: "Pizzas",
        vegetarian: true,
    },
    {
        name: "4 Formaggi",
        price: 14,
        ingredients: ["Harina de trigo", "Tomate", "Mozzarella", "Parmesano", "Ricotta", "Gorgonzola"],
        image: "https://images.ichkoche.at/data/image/variations/620x434/5/pizza-quattro-formaggi-rezept-img-43151.jpg",
        category: "Pizzas",
        vegetarian: true,
    },
    {
        name: `Agua con gas`,
        price: 3,
        ingredients: [`agua`],
        image: `https://www.bodecall.com/images/stories/virtuemart/product/agua-vichy-catalan-25-cl.png`,
        category: "Bebidas",
        vegetarian: true,
    },
    {
        name: `Agua`,
        price: 3,
        ingredients: [`agua`],
        image: `https://cdn.shopify.com/s/files/1/0279/8151/2798/products/AG0063_761x.jpg?v=1600967983`,
        category: "Bebidas",
        vegetarian: true,
    }
];
const productDocuments = products.map(product => new Product(product));
mongoose.set('strictQuery', true);
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allProducts = await Product.find();
        if (allProducts.length) {
        await Product.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
            await Product.insertMany(productDocuments);
        console.log('Database Created')
        })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());