const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const mediaTypes = await models.media_types.findAll({})
        return res.status(200).json({
            flag: true,
            data: mediaTypes,
            message: "OBTENIDO CORRECTAMENTE",
    })    });

    router.post("/", async (req, res)=> {
        try {
            if (!req.body.Name) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NOMBRE INVÁLIDO",
            })
            }
            const newMediaType = await models.media_types.create(req.body)
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
                message: "ERROR AL AGREGAR"
        })
        }
    });

    return router;
}