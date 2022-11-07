var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    getUsuario().then(function () {
        
        $("#mi-perfil-btn").attr("href","profile.html?username=" + username);
        
        $("#user-saldo").html(user.saldo.toFixed() + "$");

        getVehiculos(false, "ASC");

        $("#ordenar-modelo").click(ordenarVehiculos);
    });
});


async function getUsuario() {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioPedir",
        data: $.param({
            username: username
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                user = parsedResult;
            } else {
                console.log("Error recuperando los datos del usuario");
            }
        }
    });

}
function getVehiculos(ordenar, orden) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletVehiculoListar",
        data: $.param({
            ordenar: ordenar,
            orden: orden
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                mostrarVehiculos(parsedResult);
            } else {
                console.log("Error recuperando los datos de las vehiculos");
            }
        }
    });
}
function mostrarVehiculos(vehiculos) {

    let contenido = "";

    $.each(vehiculos, function (index, vehiculo) {

        vehiculo = JSON.parse(vehiculo);
        let precio;

        if (vehiculo.disponibles > 0) {

            if (user.premium) {

                if (vehiculo.novedad) {
                    precio = (20000 - (20000 * 0.1));
                } else {
                    precio = (10000 - (10000 * 0.1));
                }
            } else {
                if (vehiculo.novedad) {
                    precio = 20000;
                } else {
                    precio = 10000;
                }
            }

            contenido += '<tr><th scope="row">' + vehiculo.id + '</th>' +
                    '<td>' + vehiculo.marca + '</td>' +
                    '<td>' + vehiculo.modelo + '</td>' +
                    '<td>' + vehiculo.anio + '</td>' +
                    '<td>' + vehiculo.disponibles + '</td>' +
                    '<td><input type="checkbox" name="novedad" id="novedad' + vehiculo.id + '" disabled ';
            if (vehiculo.novedad) {
                contenido += 'checked';
            }
            contenido += '></td>' +
                    '<td>' + precio + '</td>' +
                    '<td><button onclick="rentarVehiculo(' + vehiculo.id + ',' + precio + ');" class="btn btn-success" ';
            if (user.saldo < precio) {
                contenido += ' disabled ';
            }

            contenido += '>Reservar</button></td></tr>'

        }
    });
    $("#vehiculos-tbody").html(contenido);
}

function ordenarVehiculos() {

    if ($("#icono-ordenar").hasClass("fa-sort")) {
        getVehiculos(true, "ASC");
        $("#icono-ordenar").removeClass("fa-sort");
        $("#icono-ordenar").addClass("fa-sort-down");
    } else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
        getVehiculos(true, "DESC");
        $("#icono-ordenar").removeClass("fa-sort-down");
        $("#icono-ordenar").addClass("fa-sort-up");
    } else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
        getVehiculos(false, "ASC");
        $("#icono-ordenar").removeClass("fa-sort-up");
        $("#icono-ordenar").addClass("fa-sort");
    }
}
function rentarVehiculo(id, precio) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletVehiculoRentar",
        data: $.param({
            id: id,
            username: username

        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                restarDinero(precio).then(function () {
                    location.reload();
                })
            } else {
                console.log("Error en la reserva de la vehiculo");
            }
        }
    });
}


async function restarDinero(precio) {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioRestarDinero",
        data: $.param({
            username: username,
            saldo: parseFloat(user.saldo - precio)

        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                console.log("Saldo actualizado");
            } else {
                console.log("Error en el proceso de pago");
            }
        }
    });
}