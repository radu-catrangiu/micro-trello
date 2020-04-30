var config = require("./config").mongo;
var mongodb = require("mongodb");

var url = "mongodb://" + config.dbuser + ":" + config.dbpassword + "@" + config.host + ":" + config.port + "/" + config.database

function init(app, callback) {
    mongodb.connect(url, (error, client) => {
        console.error(url);
        var database = client.db();
        var collection = database.collection("database");
        app.set("database", collection);
        callback();
    });
}

module.exports = init;