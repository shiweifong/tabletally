var entitySchema = mongoose.Schema({
    name : String
    , email : String
    , hash : String
    , session_id : String
    , login_date : Date
    , create_date : {type: Date, default: dateTimeHelper.utcNow()}
});

let entity = mongoose.model('entity', entitySchema);
module.exports = entity;
