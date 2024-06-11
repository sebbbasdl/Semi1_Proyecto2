var AWS = require('aws-sdk');
const bucket = process.env.BUCKET;

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

async function guardarImagen(id, img64) {
    var nombre = `Fotos/${id}.jpg`;
    //Conversión de base64 a bytes
    let buff = new Buffer.from(img64, 'base64');

    var s3 = new AWS.S3()
    const params = {
        Bucket: bucket,
        Key: nombre, // Nombre de archivo
        Body: buff,
        ContentType: 'image',
    }
    await s3.putObject(params).promise();
}

function getImagen(id) {
    var nombre = `Fotos/${id}.jpg`;

    var S3 = new AWS.S3()
    var getParams = {
        Bucket: bucket,
        Key: nombre,
    }
    return new Promise((resolve, reject) => {
        S3.getObject(getParams, function (err, data) {
            if (err) {
                //reject(err);
                console.log(err);
                resolve ({ image: '' })
            } else {
                var dataBase64 = Buffer.from(data.Body).toString('base64'); //regresar de byte a base 64
                resolve({ image: dataBase64 });
            }
        });
    });
}

module.exports = {
    guardarImagen,
    getImagen
  }