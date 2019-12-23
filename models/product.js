var productSchema = mongoose.Schema({
    name : String,
    sku: String,
    status: String,
    description: String,
    image: String,
    price: String,
    currency: String,
    store: mongoose.Schema.Types.ObjectId
});

let product = mongoose.model('product', productSchema);
module.exports = product;