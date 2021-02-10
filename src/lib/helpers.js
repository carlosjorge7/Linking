const helpers = {};
const bycrypt = require('bcryptjs');

helpers.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(10);
    const hash = await bycrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bycrypt.compare(password, savedPassword);
    }
    catch(e) {
        console.log(e);
    }
};

module.exports = helpers;