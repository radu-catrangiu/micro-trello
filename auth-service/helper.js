const crypto = require('crypto');

function get_password_hash(password, salt) {
    return crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
}

function encrypt_password(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = get_password_hash(password, salt);

    return {
        salt,
        hash,
    };
}

function check_password(password, salt, hash) {
    return hash === get_password_hash(password, salt);
}

function decode_authorization(authHeader) {
    var encoded = authHeader.replace('Basic ', '');
    var decoded = Buffer.from(encoded, 'base64').toString();
    var split = decoded.split(':');

    return {
        username: split[0],
        password: split[1],
    };
}

module.exports = {
    encrypt_password,
    check_password,
    decode_authorization,
};
