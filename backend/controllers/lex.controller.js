const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const lexruntime = new AWS.LexRuntime();

async function sendMessage(id_user, text) {
    const params = {
        botName: process.env.BOT_NAME,
        botAlias: process.env.BOT_ALIAS,
        inputText: text,
        userId: 'user' + id_user,
    };
    console.log(params)
    return new Promise((resolve, reject) => {
        lexruntime.postText(params, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    });
}

module.exports = { sendMessage }