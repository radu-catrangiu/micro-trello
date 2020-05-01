var expressApp = require('express')();
var cors = require('cors');
var config = require('./config');
var initDatabase = require('./database');
var uuid = require('uuid').v4;

function auth_middleware(req, res, next) {
    var login_token = req.headers.login_token;
    var users = expressApp.get('users');

    users.findOne({ login_token }, (error, result) => {
        if (error || !result) {
            res.sendStatus(403);
            return;
        }
        req.user_id = result.user_id;
        next();
    });
}

expressApp.use(cors());
expressApp.use(auth_middleware);

expressApp.get('/api/board/:board_id', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.params.board_id
    };
    var database = expressApp.get('database');
    database.findOne(query, (err, mongoResult) => {
        if (err) {
            res.sendStatus(404);
            return;
        }
        res.setHeader('content-type', 'application/json');
        res.send(mongoResult);
    });
});

expressApp.get('/api/cards/add', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id,
        'lists.list_id': req.query.list_id,
    };
    var document = {
        card_id: uuid(),
        title: req.query.title,
        description: req.query.description,
    };
    var update = {
        $push: {
            'lists.$.cards': document,
        },
    };
    var database = expressApp.get('database');
    database.updateOne(query, update, () => {
        res.setHeader('content-type', 'application/json');
        res.send(document);
    });
});

expressApp.get('/api/cards/update', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id,
        'lists.list_id': req.query.list_id,
    };
    var database = expressApp.get('database');
    database.findOne(query, (err, document) => {
        var list = document.lists.find(
            (list) => list.list_id === req.query.list_id
        );
        var card = list.cards.find(
            (card) => card.card_id === req.query.card_id
        );
        card.title = req.query.title;
        card.description = req.query.description;
        var update = {
            $set: {
                lists: document.lists,
            },
        };
        database.updateOne(query, update, () => {
            res.sendStatus(200);
        });
    });
});

expressApp.get('/api/cards/remove', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id,
        'lists.list_id': req.query.list_id,
    };
    var document = {
        card_id: req.query.card_id,
    };
    var update = {
        $pull: {
            'lists.$.cards': document,
        },
    };
    var database = expressApp.get('database');
    database.updateOne(query, update, () => {
        res.setHeader('content-type', 'application/json');
        res.send(document);
    });
});

expressApp.get('/api/lists/add', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id,
    };
    var document = {
        list_id: uuid(),
        title: req.query.title,
        cards: [],
    };
    var update = {
        $push: {
            lists: document,
        },
    };
    var database = expressApp.get('database');
    database.updateOne(query, update, () => {
        res.setHeader('content-type', 'application/json');
        res.send(document);
    });
});

expressApp.get('/api/lists/rename', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id,
        'lists.list_id': req.query.list_id,
    };
    var update = {
        $set: {
            'lists.$.title': req.query.title,
        },
    };
    var database = expressApp.get('database');
    database.updateOne(query, update, () => {
        res.sendStatus(200);
    });
});

expressApp.get('/api/lists/remove', (req, res) => {
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id,
    };
    var update = {
        $pull: {
            lists: { list_id: req.query.list_id },
        },
    };
    var database = expressApp.get('database');

    database.updateOne(query, update, () => {
        res.sendStatus(200);
    });
});

expressApp.get('/api/boards/list', (req, res) => {
    var database = expressApp.get('database');
    var query = { user_id: req.user_id };

    database.find(query).toArray((err, mongoResult) => {
        if (err) {
            res.sendStatus(404);
            return;
        }
        res.setHeader('content-type', 'application/json');
        res.send(mongoResult);
    });
});

expressApp.get('/api/boards/add', (req, res) => {
    var document = {
        user_id: req.user_id,
        board_id: uuid(),
        title: req.query.title,
        imgNumber: Math.floor(Math.random() * 50),
        lists: [],
    };
    var database = expressApp.get('database');
    database.insertOne(document, (error) => {
        if (error) {
            res.sendStatus(409);
            return;
        }

        res.setHeader('content-type', 'application/json');
        res.send(document);
    });
});

expressApp.get('/api/boards/rename', (req, res) => {
    var database = expressApp.get('database');
    var query = { 
        user_id: req.user_id,
        board_id: req.query.board_id 
    };
    var update = { $set: { title: req.query.title } };
    database.updateOne(query, update, (error) => {
        if (error) {
            res.sendStatus(409);
            return;
        }

        res.sendStatus(200);
    });
});

expressApp.get('/api/boards/remove', (req, res) => {
    var database = expressApp.get('database');
    var query = {
        user_id: req.user_id,
        board_id: req.query.board_id 
    };
    database.deleteOne(query, () => {
        res.sendStatus(200);
    });
});

initDatabase(expressApp, () => {
    expressApp.listen(config.port, (err) => {
        console.log(err);
        console.log('Server started');
        console.log('http://localhost:' + config.port + '/');
    });
});
