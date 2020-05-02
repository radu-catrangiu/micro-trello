var env = process.env;

module.exports = {
    port: env.PORT || 8082,
    mongo: {
        host: env.MONGO_HOST || 'localhost',
        port: env.MONGO_PORT || 27017,
        database: env.MONGO_DB || 'microtrello',
        dbuser: env.MONGO_USER || 'robot',
        dbpassword: env.MONGO_PASS || 'qwerty123zxc'
    }
};
