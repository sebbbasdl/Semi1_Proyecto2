const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const { registrarUsuario } = require('./mysql.controller');
const { guardarImagen } = require('./s3.controller');
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' }); // Reemplaza 'tu-region' con la región de tu User Pool.

const poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID
};
const poolUsers = new AmazonCognitoIdentity.CognitoUserPool(poolData);

async function registro(nombre, correo, dpi, password, foto)  {

    const resultRegistro = await registrarUsuario(nombre, correo, dpi, password)
    await guardarImagen('usuarios/' + resultRegistro.id_usuario, foto);

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID, // Reemplaza 'tu-app-client-id' con el ID de tu cliente de aplicación.
        Username: correo,
        Password: password,
        UserAttributes: [
          {
            Name: 'name',
            Value: nombre,
          },
          {
            Name: 'email',
            Value: correo,
          },
          {
            Name: 'custom:dpi',
            Value: dpi,
          },
          {
            Name: 'custom:id_usuario',
            Value: resultRegistro.id_usuario+"",
          },
          // Puedes agregar más atributos personalizados aquí si es necesario.
        ],
      };
    
      try {
        return cognito.signUp(params).promise();
      } catch (error) {
        console.error('Error al registrar usuario en Cognito', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error al registrar usuario' }),
        };
      }
    
}

async function login(correo, password) {
    const authenticationData = {
        Username: correo,
        Password: password
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var userData = {
        Username: correo,
        Pool: poolUsers
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // User authentication was successful
                resolve({status: true, response: result});
            },
            onFailure: function (err) {
                // User authentication was not successful
                resolve({status: false, error: err, message: "Usuario y/o contraseña incorrectos."});
            },
            mfaRequired: function (codeDeliveryDetails) {
                // MFA is required to complete user authentication.
                // Get the code from user and call
                cognitoUser.sendMFACode(verificationCode, this);
                resolve({status: false, error: "MFA requerido."});
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                resolve({status: false, error: "Es necesario cambiar la contraseña."});
            }
        });
    });
}

module.exports = { registro, login };