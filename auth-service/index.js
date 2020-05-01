var expressApp = require('express')();
var cors = require('cors');
var config = require('./config');
var initDatabase = require('./database');
var uuid = require('uuid').v4;
var helper = require('./helper');

expressApp.use(cors());

expressApp.get('/auth/login', (req, res) => {
    var database = expressApp.get('database');
    var auth_info = helper.decode_authorization(req.headers.authorization);
    var query = { username: auth_info.username };

    database.findOne(query, (error, result) => {
        if (error || !result) {
            res.sendStatus(403);
            return;
        }

        var user_password = result.password;
        var correct_password = helper.check_password(
            auth_info.password,
            user_password.salt,
            user_password.hash
        );

        if (!correct_password) {
            res.sendStatus(403);
            return;
        }

        var login_token = uuid();
        var update = {
            $set: {
                login_token
            }
        };

        database.updateOne(query, update, () => {
            if (error) {
                res.sendStatus(403);
                return;
            }

            res.send({ login_token });
        });
    });
});

expressApp.post('/auth/register', (req, res) => {
    var database = expressApp.get('database');

    var auth_info = helper.decode_authorization(req.headers.authorization);
    var data = helper.encrypt_password(auth_info.password);

    var user_id = uuid();
    var login_token = uuid();
    var document = {
        user_id,
        login_token,
        username: auth_info.username,
        password: data,
    };

    database.insertOne(document, (error) => {
        if (error) {
            console.log(error);
            res.sendStatus(403);
            return;
        }

        res.send({ login_token });
    });
});

initDatabase(expressApp, () => {
    expressApp.listen(config.port, (err) => {
        console.log(err);
        console.log('Server started');
        console.log('http://localhost:' + config.port + '/');
    });
});
