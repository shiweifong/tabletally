var entity = _require('/models/article');

// Generic get method for entity
// Authorized - Admin, System Admin
let readEntity = function(req, res, override, callback, apiOptions) {
    var totalSizeCount = false
        , pageSize = null
        , skipSize = null
        , queryParams = {}
        , sort = {}
        , options = {}
        , entityFields = {};

    //key parameters
    if(req.query.EntityId) queryParams._id = req.query.EntityId;

    //paging parameters
    if (req.query.TotalSizeCount) totalSizeCount = req.query.TotalSizeCount;
    if (req.query.PageSize && !isNaN(req.query.PageSize)) pageSize = parseInt(req.query.PageSize);
    if (req.query.PageSize && !isNaN(req.query.SkipSize)) skipSize = parseInt(req.query.SkipSize);

    //additional options
    if(apiOptions)  options = apiOptions;

    //sort options
    if(options.sort)  sort = options.sort;

    //fields selection options
    entityFields.__v = 0;

    //default hidden hash fields
    if(options.entityFields) entityFields = options.entityFields;

    //prior to the query params, users extend parameters
    if(options.queryParams) queryParams.extend(queryParams, options.queryParams);

    //count the total number of rows
    entity.find(queryParams)
        .select(entityFields)
        .skip(skipSize)
        .limit(pageSize)
        .sort(sort)
        .exec(function(err, data){
            if (totalSizeCount){
                entity.find(queryParams).count().exec(function(err, count){
                    apiHelper.readResponse(req, res, err, data, count,callback);
                })
            }else{
                apiHelper.readResponse(req, res, err, data, null, callback);
            }
        });
};

// Generic update method for entity
// Authorized - Admin, System Admin
let updateEntity = function(req, res, override, callback){
    //Querying & edit Object
    var queryParams = {}
        , updateParams = {};
    if(req.body.EntityId)  queryParams._id = req.body.EntityId;

    //parameter values
    if(req.body.Name) updateParams.name = req.body.Name;
    if(req.body.Email) updateParams.email = req.body.Email;
    if(req.body.Hash) updateParams.hash = req.body.Hash;
    if(req.body.SessionId) updateParams.session_id = req.body.SessionId;
    if(req.body.LoginDate) updateParams.login_date = req.body.LoginDate;

    entity.update(
        queryParams
        , updateParams
        , { multi : true }
        , function(err, data){
            var numberAffected = null;
            if (data) numberAffected = data.nModified;
            apiHelper.updateResponse(req, res, err, data, numberAffected, callback);
        });
};

// Generic add method for entity
// Authorized - Admin, System Admin
let createEntity = function(req, res, override, callback){
    var addParams = {};

    //parameter values
    if(req.body.Name) addParams.name = req.body.Name;
    if(req.body.Email) addParams.email = req.body.Email;
    if(req.body.Hash) addParams.hash = req.body.Hash;
    if(req.body.SessionId) addParams.session_id = req.body.SessionId;
    if(req.body.LoginDate) addParams.login_date = req.body.LoginDate;

    entity.create(addParams, function(err, data){
        apiHelper.createResponse(req, res, err, data, callback);
    });
};

// Generic delete method for entity
// Authorized - Admin, System Admin
let deleteEntity = function(req,res, override, callback){
    if(req.body.EntityId) {

        var queryParams = {};
        if(req.body.EntityId) queryParams._id = req.body.EntityId;

        entity.deleteMany(queryParams).exec(function(err, numberRemoved){
            apiHelper.deleteResponse(req, res, err, numberRemoved, callback);
        });

    } else{
        apiHelper.apiResponse(req, res, null, null, null, "Not Found", 500);
    }
};

module.exports = {
    readEntity
    , updateEntity
    , createEntity
    , deleteEntity
}
