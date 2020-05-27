const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const genres = await models.genres.findAll({})
        res.send(genres)
    });

    router.post("/", async (req, res)=> {
        try {
            genre = req.body.Name
            if (!genre) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "NOMBRE INVÁLIDO",
            })
            }
            const genres = await models.genres.create(genre)
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
                message: "NO ES POSIBLE AGREGAR EXCEPCIÓN"
        })
        }
    });

    return router;
}