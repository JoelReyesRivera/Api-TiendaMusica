const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const playlist = await models.playlist.findAll({})
        res.send(playlist)
    });

    router.post("/", async (req, res)=> {
        try {
            playlist = req.body.Name
            if (!playlist) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NOMBRE INVÁLIDO",
            })
            }
            const Newplaylist = await models.playlist.create(playlist)
            if (Newplaylist) {
                return res.status(400).json({
                    flag: true,
                    data: Newplaylist,
                    message: "AGREGADO CORRECTAMENTE",
            })
            }
            else {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NO ES POSIBLE AGREGAR",
            })
            }
        } catch (error) {
            return res.status(400).json({
                flag: false,
                data: null,
                message: "NO ES POSIBLE AGREGAR EXCEPCIÓN"
        })
        }
    });

    return router;
}