import { roommatesModel } from "../models/roommates.model.js"
import axios from 'axios';
const roommates = []
const getAll = async (req, res) => {
    try {
        const roommates = await roommatesModel.getAll();
        return res.json({ roommates });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false });
    }
}

const roommateAgregar = async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const nombre = response.data.results[0].name.first +" "+ response.data.results[0].name.last;
        const debe = "";
        const recibe = "";
        const user = {
            nombre,
            debe,
            recibe
        };

        const usuariosData = await roommatesModel.agregar(user);
        return res.status(201).json(usuariosData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
}

export const roommatesController = {
    getAll, roommateAgregar
}