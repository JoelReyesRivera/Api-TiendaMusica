const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const tracks = await models.tracks.findAll({})
        return res.status(200).json({
            flag: true,
            data: tracks,
            message:"OBTENIDO CORRECTAMENTE"
    })
    });

    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.Name || !body.Composer || !body.Milliseconds ||!body.Bytes || !body.UnitPrice) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "INFORMACIÓN INVÁLIDA",
            })
            }   
            if (body.AlbumId) {
                const AlbumId = await models.albums.findByPk(body.AlbumId)
                if (!AlbumId) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "ALBUM NO EXISTENTE",
                })
                }
            }
            if (body.MediaTypeId) {
                const MediaTypeId = await models.albums.findByPk(body.MediaTypeId)
                if (!MediaTypeId) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "MEDIA TYPE NO EXISTENTE",
                })
                }
            }
            if (body.GenreId) {
                const GenreId = await models.genres.findByPk(body.GenreId)
                if (!GenreId) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "GENERO NO EXISTENTE",
                })
                }
            }
            const tracks = await models.tracks.create(body)
            if (tracks) {
                return res.status(200).json({
                    flag: true,
                    data: tracks,
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
            const { params: { Artistid } } = req
            const artista = await models.artist.findByPk(Artistid)
            if (!artista) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "ARTISTA INEXISTENTE"
            })
            }
            albums = await artista.getAlbums()
            arrayTracks = Array()
            for (let index = 0; index < albums.length; index++) {
                const tracks = await albums[index].getTracks()
                console.log(albums[index].dataValues)
                for (let index = 0; index < tracks.length; index++) {
                    arrayTracks.push(tracks[index].dataValues)                    
                }                
            }
            res.send(arrayTracks)
        } catch (error) {
            return res.status(400).json({
                flag: false,
                data: null,
                message: "NO ES POSIBLE OBTENER"
        })
        }
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
                return res.status(200).json({
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
                message: "ERROR AL AGREGAR"
        })
        }
    });

    return router;
}