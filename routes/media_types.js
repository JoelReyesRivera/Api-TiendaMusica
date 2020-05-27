const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const mediaTypes = await models.media_types.findAll({})
        res.send(mediaTypes)
    });

    router.post("/", async (req, res)=> {
        try {
            mediaType = req.body.Name
            if (!mediaType) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NOMBRE INVÁLIDO",
            })
            }
            const newMediaType = await models.media_types.create(mediaType)
            if (newMediaType) {
                return res.status(400).json({
                    flag: true,
                    data: newMediaType,
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