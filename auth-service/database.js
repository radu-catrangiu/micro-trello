var config = require("./config").mongo;
var mongodb = require("mongodb");

var url = "mongodb://" 
        + config.dbuser 
        + ":" 
        + config.dbpassword 
        + "@" 
        + config.host 
        + ":" 
        + config.port 
        + "/" 
        + config.database

function init(app, callback) {
    mongodb.connect(url, (error, client) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        var database = client.db();
        var collection = database.collection("users");
        
        var index_options = {
            unique: true,
            background: true
        };

        collection.createIndex({ user_id: 1 }, index_options);
        collection.createIndex({ username: 1 }, index_options);
        collection.createIndex({ login_token: 1 }, index_options);

        app.set("database", collection);
        callback();
    });
}

module.exports = init;