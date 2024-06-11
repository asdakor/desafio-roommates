import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta del archivo JSON
const pathFile = path.join(__dirname, '..', 'data', 'gastos.json');

const getAll = async () => {
    try {
        const stringgastos = await readFile(pathFile, 'utf8');
        const gastos = JSON.parse(stringgastos);
        return gastos;
    } catch (e) {
        console.log(e);
        throw new Error('Error al leer el archivo JSON');
    }
}

const agregar = async (gasto) => {
    try {
        let gastos = [];

        // Intentar leer el archivo JSON
        try {
            const stringgastos = await readFile(pathFile, 'utf8');
            // Si el archivo no está vacío, parsear su contenido
            if (stringgastos.trim().length > 0) {
                gastos = JSON.parse(stringgastos);
            }
        } catch (readError) {
            // Si ocurre un error al leer (p.ej. el archivo no existe), se inicializa como un arreglo vacío
            console.log('Error al leer el archivo JSON o archivo no existe, inicializando como un arreglo vacío');
        }

        // Agregar el nuevo gasto
        gastos.push(gasto);

        // Escribir los datos actualizados en el archivo JSON
        await writeFile(pathFile, JSON.stringify(gastos, null, 2));
        return { message: 'Gasto agregado exitosamente', gasto };
    } catch (e) {
        console.log(e);
        throw new Error('Error al agregar el gasto');
    }
};

const eliminar = async (gastoid) => {
    try {
        const id = gastoid.id;
        const stringgastos = await readFile(pathFile, 'utf8');
        const gastos = JSON.parse(stringgastos);
        const gastoIndex = gastos.findIndex((item) => item.id === id);

        if (gastoIndex === -1) {
            throw new Error('El gasto no existe');
        }

        gastos.splice(gastoIndex, 1);

        await writeFile(pathFile, JSON.stringify(gastos, null, 2));
        return { message: 'Gasto eliminado exitosamente' };
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el gasto');
    }
};

const editar = async (gastoeditado) => {
    try {
        console.log(gastoeditado)
        const id = gastoeditado.id;
          
        const stringgastos = await readFile(pathFile, 'utf8');
        const gastos = JSON.parse(stringgastos);
        const gasto = gastos.find((item) => item.id === id);
        console.log(gasto)
        gasto.roommate = gastoeditado.roommate
        gasto.descripcion = gastoeditado.descripcion
        gasto.monto = gastoeditado.monto
        await writeFile(pathFile, JSON.stringify(gastos));
    } catch (error) {
        console.error(error);
        throw new Error('Error al editar el gasto');
    }
};


export const gastosModel = {
    getAll, agregar, eliminar, editar
};
