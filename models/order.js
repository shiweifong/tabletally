var orderSchema = mongoose.Schema({
    name : String
});

let order = mongoose.model('order', orderSchema);
module.exports = order;
