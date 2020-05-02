db.createUser({
    user: 'robot',
    pwd: 'qwerty123zxc',
    roles: [
        {
            role: 'readWrite',
            db: 'microtrello'
        }
    ]
});