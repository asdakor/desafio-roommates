import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta del archivo JSON
const pathFile = path.join(__dirname, '..', 'data', 'roommates.json');

const getAll = async () => {
    try {
        const stringroommates = await readFile(pathFile, 'utf8');
        const roommates = JSON.parse(stringroommates);
        return roommates;
    } catch (e) {
        console.log(e);
        throw new Error('Error al leer el archivo JSON');
    }
}

const agregar = async (roommate) => {
    try {
        let roommates = [];
        
        // Intentar leer el archivo JSON
        try {
            const stringroommates = await readFile(pathFile, 'utf8');
            // Si el archivo no está vacío, parsear su contenido
            if (stringroommates.trim().length > 0) {
                roommates = JSON.parse(stringroommates);
            }
        } catch (readError) {
            // Si ocurre un error al leer (p.ej. el archivo no existe), se inicializa como un arreglo vacío
            console.log('Error al leer el archivo JSON o archivo no existe, inicializando como un arreglo vacío');
        }

        // Agregar el nuevo roommate
        roommates.push(roommate);

        // Escribir los datos actualizados en el archivo JSON
        await writeFile(pathFile, JSON.stringify(roommates, null, 2));
        return { message: 'Usuario agregado exitosamente', roommate };
    } catch (e) {
        console.log(e);
        throw new Error('Error al agregar el usuario');
    }
};

export const roommatesModel = {
    getAll,
    agregar
};
