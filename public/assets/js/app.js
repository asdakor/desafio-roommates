let roommates = [];
let gastos = [];
let gastoEditing = null;
const getRoommates = async () => {
    const res = await fetch("http://localhost:3000/roommate");
    const data = await res.json();
    roommates = data.roommates;
};
const getGastos = async () => {
    const res = await fetch("http://localhost:3000/gastos");
    const data = await res.json();
    gastos = data.gastos;
};

const imprimir = async () => {
    try {
        await getRoommates();
        await getGastos();
        $("#roommates").html("");
        $("#roommatesSelect").html("");
        $("#roommatesSelectModal").html("");
        roommates.forEach((r) => {
            $("#roommatesSelect").append(`
          <option value="${r.nombre}">${r.nombre}</option>
          `);
            $("#roommatesSelectModal").append(`
          <option value="${r.nombre}">${r.nombre}</option>
          `);
            $("#roommates").append(`
                  <tr>
                    <td>${r.nombre}</td>
                    <td class="text-danger">${r.debe ? r.debe : "-"}</td>
                    <td class="text-success">${r.recibe ? r.recibe : "-"}</td>
                  </tr>
              `);
        });
        $("#gastosHistorial").html("");
        gastos.forEach((g) => {
            $("#gastosHistorial").append(`
                <tr>
                  <td>${g.roommate}</td>
                  <td>${g.descripcion}</td>
                  <td>${g.monto}</td>
                  <td class="d-flex align-items-center justify-content-between">
                    <i class="fas fa-edit text-warning" onclick="editGasto('${g.id}')" data-toggle="modal" data-target="#exampleModal"></i>
                    <i class="fas fa-trash-alt text-danger" onclick="deleteGasto('${g.id}')" ></i>
                  </td>
                </tr>
              `);
        });
    } catch (e) {
        console.log(e);
    }
};

const nuevoRoommate = () => {
    fetch("http://localhost:3000/roommate", { method: "POST" })
        .then((res) => res.json())
        .then(() => {
            imprimir();
        });
};

const agregarGasto = async () => {
    const formData = {
        roommate: $("#roommatesSelect").val(),
        descripcion: $("#descripcion").val(),
        monto: Number($("#monto").val())
    };

    await fetch("http://localhost:3000/gasto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    imprimir();
};

const deleteGasto = async (id) => {
    await fetch("http://localhost:3000/gasto/" + id, {
        method: "DELETE",
    });
    imprimir();
};

const updateGasto = async () => {
    const roommateSelected = $("#roommatesSelectModal").val();
    const descripcion = $("#descripcionModal").val();
    const monto = Number($("#montoModal").val());

    const requestBody = {
        roommate: roommateSelected,
        descripcion: descripcion,
        monto: monto
    };

    await fetch("http://localhost:3000/gasto/" + gastoEditing, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
    });

    $("#exampleModal").modal("hide");
    imprimir();
};

const editGasto = (id) => {
    gastoEditing = id;
    const { roommate, descripcion, monto } = gastos.find((g) => g.id == id);
    $("#roommatesSelectModal").val(roommate);
    $("#descripcionModal").html(descripcion);
    $("#montoModal").val(monto);
};
$(document).ready(function () {
    imprimir();
});