const router = require('express').Router();
const { getPasswordUsuario, getPerfil, editarPerfil } = require('../controllers/mysql.controller')
const sha256 = require('js-sha256');

router.get('/perfil', async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const result = await getPerfil(id_usuario);
        if (result.status) {
            return res.status(200).json({result});
        }
        console.log('No existe el usuario en la base de datos.');
        res.status(401).json({ok: false, mensaje: "El usuario solicitado no existe.", nombre: '', dpi: '', email: '', imagen: ''});
    } catch (error) {
        console.log(error);
        res.status(400).json({ok: false, mensaje: "Error inseperado", nombre: '', dpi: '', email: '', imagen: ''})
    }
    
});

router.post('/editar-perfil', async (req, res) => {
    try {
        const { id_usuario, imagen, nombre, dpi, email, password } = req.body;
        const passOriginal = await getPasswordUsuario(id_usuario);
        if (passOriginal.status) {
            if (passOriginal.password === sha256(password)) {
                const result = await editarPerfil(id_usuario, nombre, dpi, email);
                if (imagen != '') {
                    guardarImagen('usuarios/' + id_usuario, imagen);
                    result.status = true;
                }
                return res.status(200).json({ passwordCorrecta: result.status });
            }
        } else {
            console.log('No existe el usuario en la base de datos.');
        }
        console.log('Contraseña incorrecta.')
        res.status(400).json({passwordCorrecta: false, mensaje: "La contraseña es incorrecta."})
    } catch (error) {
        console.log(error);
        res.status(400).json({passwordCorrecta: false, mensaje: "La contraseña es incorrecta."})
    }
});

module.exports = router;