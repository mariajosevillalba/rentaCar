var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {


    fillUsuario().then(function () {

        $("#user-saldo").html("$" + user.saldo.toFixed());

        getRentadas(user.username);
    });

    $("#reservar-btn").attr("href", `home.html?username=${username}`);

    $("#form-modificar").on("submit", function (event) {

        event.preventDefault();
        modificarUsuario();
    });

    $("#aceptar-eliminar-cuenta-btn").click(function () {

        eliminarCuenta().then(function () {
            location.href = "index.html";
        })
    })

});

async function fillUsuario() {
    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioPedir",
        data: $.param({
            username: username,
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                user = parsedResult;

                $("#input-username").val(parsedResult.username);
                $("#input-contrasena").val(parsedResult.contrasena);
                $("#input-nombre").val(parsedResult.nombre);
                $("#input-apellidos").val(parsedResult.apellidos);
                $("#input-email").val(parsedResult.email);
                $("#input-saldo").val(parsedResult.saldo.toFixed(2));
                $("#input-premium").prop("checked", parsedResult.premium);

            } else {
                console.log("Error recuperando los datos del usuario");
            }
        }
    });
}

function getRentadas(username) {


    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletRentaListar",
        data: $.param({
            username: username
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {

                mostrarHistorial(parsedResult);

            } else {
                console.log("Error recuperando los datos de las reservas");
            }
        }
    });
}

function mostrarHistorial(vehiculos) {
    let contenido = "";
    if (vehiculos.length >= 1) {
        $.each(vehiculos, function (index, vehiculo) {
            vehiculo = JSON.parse(vehiculo);

            contenido += '<tr><th scope="row">' + vehiculo.id + '</th>' +
                    '<td>' + vehiculo.marca + '</td>' +
                    '<td>' + vehiculo.modelo + '</td>' +
                    '<td><input type="checkbox" name="novedad" id="novedad' + vehiculo.id
                    + '" disabled ';
            if (vehiculo.novedad) {
                contenido += 'checked'
            }
            contenido += '></td><td>' + vehiculo.fechaRenta + '</td>' +
                    '<td><button id="devolver-btn" onclick= "devolverVehiculo(' + vehiculo.id
                    + ');" class="btn btn-danger">Devolver vehiculo</button></td></tr>';

        });
        $("#historial-tbody").html(contenido);
        $("#historial-table").removeClass("d-none");
        $("#historial-vacio").addClass("d-none");

    } else {
        $("#historial-vacio").removeClass("d-none");
        $("#historial-table").addClass("d-none");
    }
}


function devolverVehiculo(id) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletVehiculoDevolver",
        data: $.param({
            username: username,
            id: id,
        }),
        success: function (result) {

            if (result != false) {

                location.reload();

            } else {
                console.log("Error devolviendo el Vehiculo");
            }
        }
    });

}

function modificarUsuario() {

    let username = $("#input-username").val();
    let contrasena = $("#input-contrasena").val();
    let nombre = $("#input-nombre").val();
    let apellidos = $("#input-apellidos").val();
    let email = $("#input-email").val();
    let saldo = $("#input-saldo").val();
    let premium = $("#input-premium").prop('checked');
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioModificar",
        data: $.param({
            username: username,
            contrasena: contrasena,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            saldo: saldo,
            premium: premium,
        }),
        success: function (result) {

            if (result != false) {
                $("#modificar-error").addClass("d-none");
                $("#modificar-exito").removeClass("d-none");
            } else {
                $("#modificar-error").removeClass("d-none");
                $("#modificar-exito").addClass("d-none");
            }

            setTimeout(function () {
                location.reload();
            }, 3000);

        }
    });

}

async function eliminarCuenta() {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioEliminar",
        data: $.param({
            username: username
        }),
        success: function (result) {

            if (result != false) {

                console.log("Usuario eliminado")

            } else {
                console.log("Error eliminando el usuario");
            }
        }
    });
}

