const router = require('express').Router();
const { agregarAmigo, aceptarAmigo, getFriends } = require('../controllers/mysql.controller');


router.get('/agg-sl-friends', async (req, res) =>{
    try {
        const { id_usuario } = req.body;
        console.log("id de usuario ", id_usuario)
        const result = await getFriends(id_usuario);
        if (result) {
            //console.log("el result de amigos: ", result)
            return res.status(200).json({ ok: true, mis_friends: result.mis_friends, solicitud_friends: result.solicitud_friends, not_amigos: result.not_amigos, user1: result.user1});
        }
        console.log('Error al consultar amigos.');
        res.status(400).json({ok : false, mensaje : "Error al consultar amigos."})
    } catch (error) {
        console.log(error);
        res.status(400).json({ok : false, mensaje : "Error al consultar amigos."})
    }
});

router.post('/add-friend', async (req, res) =>{
    try {
        const {id_friend, id_usuario } = req.body;
        console.log("id de usuario que agregará amigo", id_usuario)
        const result = await agregarAmigo("pendiente", id_friend, id_usuario);
        if (result) {
            return res.status(200).json({ ok: true, message: result.message });
        }
        console.log('Error al agregar amigo.');
        res.status(400).json({ok : false, mensaje : "Error al agregar amigo."})
    } catch (error) {
        console.log(error);
        res.status(400).json({ok : false, mensaje : "Error al agregar amigo.", message_sql : error.sqlMessage})
    }
});


router.post('/accept-friend', async (req, res) => {
    try {
        const {id_friend, id_usuario } = req.body;
        console.log("id de usuario que agregará amigo", id_usuario)
        const result = await aceptarAmigo("aceptado", id_friend, id_usuario);
        if (result) {
            return res.status(200).json({ ok: true, message: result.message });
        }
        console.log('Error al aceptar amigo.');
        res.status(400).json({ok : false, mensaje : "Error al aceptar amigo."})
    } catch (error) {
        console.log(error);
        res.status(400).json({ok : false, mensaje : "Error al aceptar amigo.", message_sql : error.sqlMessage})
    }
});

module.exports = router;