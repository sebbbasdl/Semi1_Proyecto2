const AWS = require('aws-sdk');
const translateKeys = {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
};

const translate = new AWS.Translate(translateKeys);

async function translateText(text, targetLanguage) {
    const params = {
        SourceLanguageCode: 'auto',
        TargetLanguageCode: targetLanguage,
        Text: text,
    };

    return new Promise((resolve, reject) => {
        translate.translateText(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve({ traduccion: data.TranslatedText });
            }
        });
    });
}

module.exports = { translateText }