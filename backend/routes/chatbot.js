const router = require('express').Router();
const { sendMessage } = require('../controllers/lex.controller')

router.post('/chat-bot', async (req, res) => {
    try {
        const { id_usuario, text } = req.body;
        const res = await sendMessage(id_usuario, text);
    } catch (error) {
        console.log(error);
        res.status(400).json({ok : false, mensaje : "Error al consultar al bot."})
    }
});

module.exports = router;