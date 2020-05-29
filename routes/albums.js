const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const albums = await models.albums.findAll({})
        return res.status(200).json({
            flag: true,
            data: albums
    })
    });

    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.Title) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "TITULO INVÁLIDO",
            })
            }   
            if (body.ArtistId) {
                const artist = await models.artist.findByPk(body.ArtistId)
                if (!artist) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "ARTISTA EXISTENTE",
                })
                }
            }
            const newAlbum = await models.albums.create(body)
            if (newAlbum) {
                return res.status(200).json({
                    flag: true,
                    data: newAlbum,
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

    
    router.get("/:Artistid", async (req, res)=> {
        try {
            const { params: { Artistid }, body } = req
            models.artist.findByPk(Artistid)
            .then(artist => {
                if (!artist) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "ARTISTA INEXISTENTE"
                })
                }
                artist.getAlbums()
                    .then(albums => {
                        return res.status(200).json({
                            flag: true,
                            data: albums,
                            message: "OBTENIDO CORRECTAMENTE"
                    })
                    })
                })
        } catch (error) {
            return res.status(400).json({
                flag: false,
                data: null,
                message: "NO ES POSIBLE OBTENER"
        })
        }
    });

    return router;
}