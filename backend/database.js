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
        console.error(url);
        var database = client.db();

        var collection = database.collection("database");
        app.set("database", collection);

        collection.createIndex({ user_id: 1, title: 1 }, { unique: true, background: true });

        var users = database.collection("users");
        app.set("users", users);

        

        callback();
    });
}

module.exports = init;