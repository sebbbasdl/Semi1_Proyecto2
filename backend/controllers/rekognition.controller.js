var AWS = require('aws-sdk');
const rekognition_keys = {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
};
const rek = new AWS.Rekognition(rekognition_keys);

function comparePics(principalPic, comparationPic) {
    var params = {
        SourceImage: {
            Bytes: Buffer.from(principalPic, 'base64')
        },
        TargetImage: {
            Bytes: Buffer.from(comparationPic, 'base64')
        },
        SimilarityThreshold: '90', // porcentaje para hacer en la comparacion, limite de similitud
    }
    return new Promise((resolve, reject) => {
        rek.compareFaces(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve({similarity: data.FaceMatches.length > 0});
            }
        })
    });
}

function detectLabels(image) {
    var params = {
        Image: {
            Bytes: Buffer.from(image, 'base64')
            },
        MaxLabels: 10, // cosas o similitudes que aparecen en la imagen
        }

        return new Promise((resolve, reject) => {
            rek.detectLabels(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Labels);
                }
            });
        });
}

module.exports = { comparePics, detectLabels }