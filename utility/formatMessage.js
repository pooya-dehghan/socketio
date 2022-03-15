const moment = require('moment');

function formatMessage(user,text) {
    return {
        message : text || "text has not provided",
        user : user || "user has not provided",
        time : moment().format("h:m a")
    };
}

module.exports = formatMessage;