const router = require("express").Router();

module.exports = (models) => {

    router.get("/", async (req, res)=> {
        const employees = await models.employees.findAll({})
        return res.status(200).json({
            flag: true,
            data: employees
    })
    });

    router.post("/", async (req, res)=> {
        try {
            body = req.body
            if (!body.FirstName || !body.LastName || !body.Title ||!body.BirthDate || !body.HireDate ||  !body.Address) {
                return res.status(400).json({
                    flag: false,
                    data: null,
                    message: "INFORMACIÓN INVÁLIDA",
            })
            }
            if (body.ReportsTo) {
                const boss = await models.employees.findByPk(body.ReportsTo)
                if (!boss) {
                    return res.status(400).json({
                        flag: false,
                        data: null,
                        message: "JEFE NO EXISTENTE",
                })
                }
            }
            const newEmployee = await models.employees.create(body)
            if (newEmployee) {
                return res.status(200).json({
                    flag: true,
                    data: newEmployee,
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
                message: "NO ES POSIBLE AGREGAR",
                error : error
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
                employee.getEmployees()
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
                message: "NO ES POSIBLE OBTENER EXCEPCIÓN"
        })
        }
    });
    router.put("/:id", async (req, res)=> {
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
                employee.update(req.body)
                    .then(employee => {
                        return res.status(200).json({
                            flag: true,
                            data: employee,
                            message: "OBTENIDO CORRECTAMENTE"
                    })
                    })
                })
        } catch (error) {
            return res.status(400).json({
                flag: false,
                data: null,
                message: "NO ES POSIBLE ACTUALIZAR EXCEPCIÓN"
        })
        }
    });
    return router;
}