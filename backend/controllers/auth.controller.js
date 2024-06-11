const { CognitoJwtVerifier } = require("aws-jwt-verify");

async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({ok: false, message: 'No token provided.'});
    }
    const bearer = token.split(' ')[1]; // obtenemos la parte del token que nos interesa
    // Bearer "ASLDKFJALSDKFJ"
    
    const cognitoJwtVerifier = CognitoJwtVerifier.create({
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        tokenUse: 'id',
        clientId: process.env.COGNITO_CLIENT_ID
    });
    
    try {
        const verifiedToken = await cognitoJwtVerifier.verify(bearer);
        if (!verifiedToken) {
            return res.status(401).json({ok: false, message: 'Invalid token.'});
        }
        req.body.id_usuario = verifiedToken["custom:id_usuario"];
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ok: false, message: 'Invalid token.'});
    }
}

module.exports = { verifyToken };