//Requerir paquetes o librerias
const mongoose = require(`mongoose`);

//Creación del esquema
const Schema = mongoose.Schema;
const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        ingredients: [{ type: String, required: true }],
        image: { type: String, required: true },
        category: { type: String, required: true },
        vegetarian: { type: Boolean, required: true}
    },
    {
        timestamps: true,
    } 
);

const Product = mongoose.model(`Product`, productSchema);
module.exports = Product;



