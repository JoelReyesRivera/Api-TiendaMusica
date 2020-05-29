const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const genres = await models.genres.findAll({})
        return res.status(200).json({
            flag: true,
            data: genres,
            message: "OBTENIDO CORRECTAMENTE",
    })
    });

    router.post("/", async (req, res)=> {
        try {
            if (!req.body.Name) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NOMBRE INVÁLIDO",
            })
            }
            const genres = await models.genres.create(req.body)
            if (genres) {
                return res.status(400).json({
                    flag: true,
                    data: genres,
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