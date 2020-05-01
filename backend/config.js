var env = process.env;

module.exports = {
    port: env.PORT || 8081,
    mongo: {
        host: env.MONGO_HOST || 'ds018839.mlab.com',
        port: env.MONGO_PORT || 18839,
        database: env.MONGO_DB || 'dss',
        dbuser: env.MONGO_USER || 'user',
        dbpassword: env.MONGO_PASS || 'qwerty12'
    }
};
