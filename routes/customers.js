const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const customers = await models.customers.findAll({})
        return res.status(200).json({
            flag: true,
            data: customers
    })
    });

    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.FirstName || !body.LastName || !body.Company ||!body.Email || !body.Phone) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "INFORMACIÓN INVÁLIDA",
            })
            }
            if (body.SupportRepId) {
                const SupportRep = await models.employees.findByPk(body.SupportRepId)
                if (!SupportRep) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "EMPLEADO NO EXISTENTE",
                })
                }
            }
            const newCustomer = await models.customers.create(body)
            if (newCustomer) {
                return res.status(200).json({
                    flag: true,
                    data: newCustomer,
                    message: "AGREGADO CORRECTAMENTE",
            })
            }
            else {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "ERROR AL AGREGAR"
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

    router.get("/:id", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            models.employees.findByPk(id)
            .then(employee => {
                if (!employee) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "EMPLEADO INEXISTENTE"
                })
                }
                employee.getCustomers()
                    .then(employess => {
                        return res.status(200).json({
                            flag: true,
                            data: employess,
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

    router.get("/:id/tracks", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            tracksArray = Array()
            const customer = await models.customers.findByPk(id)
            const invoices = await customer.getInvoices()
            for (let index = 0; index < invoices.length; index++) {
                var invoices_items = await invoices[index].getInvoices_items();
                for (let index = 0; index < invoices_items.length; index++) {
                    const trackId = invoices_items[index].dataValues.TrackId
                    track = await models.tracks.findByPk(trackId)
                    if (!tracksArray.includes(track)) {
                        tracksArray.push(track.dataValues)
                    }
                }
            }
            res.send(tracksArray)
        } catch (error) {
            return res.status(400).json({
                flag: false,
                data: null,
                message: "NO ES POSIBLE AGREGAR EXCEPCIÓN"
        })
        }
    });     

    router.get("/:id/genres", async (req, res)=> {
        try {
            const { params: { id }, body } = req
            genreArray = Array()
            const customer = await models.customers.findByPk(id)
            const invoices = await customer.getInvoices()
            for (let index = 0; index < invoices.length; index++) {
                var invoices_items = await invoices[index].getInvoices_items();
                for (let index = 0; index < invoices_items.length; index++) {
                    const trackId = invoices_items[index].dataValues.TrackId
                    track = await models.tracks.findByPk(trackId)
                    console.log(track.dataValues)
                    const id = track.dataValues.GenreId
                    const genre = await models.genres.findByPk(id)
                    if (!genreArray.includes(genre)) {
                        genreArray.push(genre)
                    }
                }
            }
            return res.status(200).json({
                flag: true,
                data: genreArray,
                message: "OBTENIDO CORRECTAMENTE"
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