import { Router } from "express";
const router = Router()

import { webController } from "../controllers/web.controller.js";
import { roommatesController } from "../controllers/roommates.controller.js";
import { gastosController } from "../controllers/gastos.controller.js";

router.get('/', webController.inicio)
router.get('/roommate', roommatesController.getAll)
router.post('/roommate', roommatesController.roommateAgregar)

router.get('/gastos', gastosController.getAll)
router.post('/gasto', gastosController.gastoAgregar)
router.delete('/gasto/:id', gastosController.gastoEliminar)
router.put('/gasto/:id', gastosController.gastoEditar)
export default router;