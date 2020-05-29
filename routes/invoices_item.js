const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const invoices_items = await models.invoices_items.findAll({})
        return res.status(200).json({
            flag: true,
            data: invoices_items
    })
    });

    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.Quantity) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "CANTIDAD INVÁLIDA",
            })
            }
            if (body.InvoiceId) {
                const invoice = await models.invoices.findByPk(body.InvoiceId)
                if (!invoice) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "FACTURA NO EXISTENTE",
                })
                }
            }
            var unitPrice = 0
            if (body.TrackId) {
                const track = await models.tracks.findByPk(body.TrackId)
                if (!track) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "TRACK NO EXISTENTE",
                })}
                unitPrice = track.dataValues.UnitPrice
            }
            body.UnitPrice = unitPrice
            const invoice_item = await models.invoices_items.create(body)
            if (invoice_item) {
                return res.status(200).json({
                    flag: true,
                    data: invoice_item,
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
    return router;
}