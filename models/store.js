var storeSchema = mongoose.Schema({
    store_id: String,
    name : String,
    country: String,
    description: String,
    logo: String,
    store_type: String, // Lazada, Shoppee, Amazon, etc.
    status: String
});

let store = mongoose.model('store', storeSchema);
module.exports = store;