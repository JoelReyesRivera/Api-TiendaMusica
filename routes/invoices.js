const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const invoices = await models.invoices.findAll({})
        return res.status(200).json({
            flag: true,
            data: invoices
    })
    });

    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.InvoiceDate || !body.BillingAddress || !body.BillingCity ||!body.CustomerId) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "INFORMACIÓN INVÁLIDA",
            })
            }   
            if (body.CustomerId) {
                const customer = await models.employees.findByPk(body.CustomerId)
                if (!customer) {
                    return res.status(200).json({
                        flag: false,
                        data: null,
                        message: "CLIENTE NO EXISTENTE",
                })
                }
            }
            const newInvoice = await models.invoices.create(body)
            if (newInvoice) {
                return res.status(200).json({
                    flag: true,
                    data: newInvoice,
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

    router.get("/:idCustomer", async (req, res)=> {
        try {
            const { params: { idCustomer }, body } = req
            models.customers.findByPk(idCustomer)
            .then(customer => {
                if (!customer) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "CLIENTE INEXISTENTE"
                })
                }
                customer.getInvoices()
                    .then(invoices => {
                        return res.status(200).json({
                            flag: true,
                            data: invoices,
                            message: "OBTENIDO CORRECTAMENTE"
                    })
                    })
                })
        } catch (error) {
            return res.status(400).json({
                flag: false,    
                data: null,
                message: "NO ES POSIBLE OBTENER EXCEPCIÓN"
        })
        }
    });
    return router;
}