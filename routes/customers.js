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
    return router;
}