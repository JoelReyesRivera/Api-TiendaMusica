const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const playlist = await models.playlist.findAll({})
        return res.status(200).json({
            flag: true,
            data: playlist,
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
            const Newplaylist = await models.playlist.create(req.body)
            if (Newplaylist) {
                return res.status(200).json({
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
                message: "ERROR AL AGREGAR"
        })
        }
    });

    router.get("/track/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            await models.tracks.findByPk(id)
            .then(tracks => {
                if (!tracks) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "PLAYLIST INEXISTENTE"
                })
                }
                tracks.getPlaylists()
                    .then(Playlist_track => {
                        return res.status(200).json({
                            flag: true,
                            data: Playlist_track,
                            message: "OBTENIDO CORRECTAMENTE"
                    })
                    })
                })
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