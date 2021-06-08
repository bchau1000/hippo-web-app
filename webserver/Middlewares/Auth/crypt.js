const crypto = require('crypto');

this.salt = crypto.randomBytes(16).toString('hex');
this.hash = crypto.pbkdf2Sync(password, this.salt, 
    1000, 64, `sha512`).toString(`hex`);
    