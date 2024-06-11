import { gastosModel } from "../models/gastos.model.js"
import axios from 'axios';
import { nanoid } from 'nanoid'
const gastos = []
const getAll = async (req, res) => {
    try {
        const gastos = await gastosModel.getAll();
        return res.json({ gastos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false });
    }
}

const gastoAgregar = async (req, res) => {
    try {
        const gasto = {
            id: nanoid(),
            roommate: req.body.roommate,
            descripcion: req.body.descripcion,
            monto: req.body.monto
        };

        const gastosData = await gastosModel.agregar(gasto);
        return res.status(201).json(gastosData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
}
const gastoEliminar = async (req, res) => {
    const id = req.params;
    const gastosData = await gastosModel.eliminar(id);
    return res.status(201).json(gastosData);

}
const gastoEditar = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el parámetro "id" de la URL
        const { roommate, descripcion, monto } = req.body; // Obtener los datos del cuerpo de la solicitud
        const gasto = {
            "id": id,
            "roommate": roommate,
            "descripcion": descripcion,
            "monto": monto
        };
        const gastosData = await gastosModel.editar(gasto);
        return res.status(201).json(gastosData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const gastosController = {
    getAll, gastoAgregar, gastoEliminar, gastoEditar
}