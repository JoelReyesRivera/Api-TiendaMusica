const router = require("express").Router();

module.exports = (models) => {

    router.post("/", async (req, res)=> {
        try {
            if(!req.body.PlaylistId || !req.body.TrackId){
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "INFORMACIÓN INVALIDA",
            })
            }
            const track = await models.tracks.findByPk(req.body.TrackId)
            if (!track) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "TRACK NO EXISTENTE",
            })
            }
            const playlist = await models.playlist.findByPk(req.body.PlaylistId)
            if (!playlist) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "PLAYLIST NO EXISTENTE",
            })
            }
            body = req.body
            const playlist_track = await track.addPlaylist(playlist)
            if (playlist_track) {
                return res.status(200).json({
                    flag: true,
                    data: playlist_track,
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