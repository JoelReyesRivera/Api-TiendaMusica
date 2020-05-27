const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const artist = await models.artist.findAll({})
        res.send(artist)
    });

    router.post("/", async (req, res)=> {
        try {
            artistBody = req.body
            if (!artistBody.Name) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NOMBRE INVÁLIDO",
            })
            }
            const newArtist = await models.artist.create(artistBody)
            if (newArtist) {
                return res.status(400).json({
                    flag: true,
                    data: newArtist,
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