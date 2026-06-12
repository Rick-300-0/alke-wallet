$(document).ready(function () {

    // LOGIN
    function validarFormularioIndex() {
        const correo = $("#correo").val().trim();
        const password = $("#password").val().trim();

        if (!correo) {
            alert("Debes ingresar un correo");
            return;
        }

        if (!password) {
            alert("Debes ingresar un password");
            return;
        }

        if (password == "1111" && correo == "correo@gmail.com") {
            alert("Datos válidos");
            window.location.href = "/home/ricky/Documentos/billetera_digital/menu.html";
        } else {
            alert("Datos inválidos");
        }
    }

    window.validarFormularioIndex = validarFormularioIndex;


    // REDIRECCIONES
    window.depositar = function (event) {
        event.preventDefault();
        alert("Redirigiendo a la pagina de deposito");

        setTimeout(() => {
            window.location.href = "/home/ricky/Documentos/billetera_digital/deposit.html";
        }, 2000);
    };

window.enviarDinero = function (event) {

  if (event) event.preventDefault();

alert("rediriendo a enviar dinero")

  setTimeout(() => {
    window.location.href = "/home/ricky/Documentos/billetera_digital/sendmoney.html";
  }, 2000);
};

    window.ultimosMovimientos = function (event) {
        event.preventDefault();
        alert("Redirigiendo a la pagina de últimos movimientos");

        setTimeout(() => {
            window.location.href = "/home/ricky/Documentos/billetera_digital/transactions.html";
        }, 2000);
    };


    // DEPOSITAR DINERO
    window.depositarDinero = function (event) {
        event.preventDefault();

        const depositAmount = $("#depositAmount").val().trim();

        if (!depositAmount) {
            alert("Debes ingresar una cantidad");
            return;
        }

            $("#mensaje-deposito").text("Has depositado $" + depositAmount);
                  let alerta = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          Depósito realizado con éxito. Has depositado <strong>$${depositAmount}</strong>.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
      `;

      // Insertar en el contenedor
      $("#alert-container").html(alerta);

      // Limpiar input
      $("#monto").val("");

        setTimeout(() => {
            window.location.href = `menu.html?deposito=${depositAmount}`;
        }, 3000);
    };



function cantidadDinero() {
    const params = new URLSearchParams(window.location.search);

    const depositoRaw = params.get("deposito");

    let saldoActual = Number(localStorage.getItem("nuevoSaldo"));


    if (isNaN(saldoActual)) saldoActual = 0;

    // SOLO si hay depósito válido
    if (depositoRaw !== null && depositoRaw !== "") {
        const deposito = Number(depositoRaw);

        if (!isNaN(deposito)) {
            saldoActual = saldoActual + deposito;
            localStorage.setItem("nuevoSaldo", saldoActual);

            // limpiar URL para evitar doble suma
            window.history.replaceState({}, document.title, "menu.html");
        }
    }

    $("#saldo").text(`$${saldoActual}`);
    console.log("saldo final:", saldoActual);
}

if (window.location.pathname.endsWith("menu.html")) {
    cantidadDinero();
}

    // AGREGAR CONTACTO
    window.addContact = function () {
        const name = $("#newName").val();
        const cbu = $("#newCBU").val();
        const alias = $("#newAlias").val();
        const bank = $("#newBank").val();

        if (!name || !cbu) {
            alert("Nombre y CBU son obligatorios");
            return;
        }

        $("#contactList").append(`
            <li class="list-group-item">
                <label>
                    <input type="radio" name="contacto" value="${name}">
                    <strong>${name}</strong>
                    <div>CBU: ${cbu}, Alias: ${alias}, Banco: ${bank}</div>
                </label>
            </li>
        `);

        $("#contactModal").modal("hide");
    };

    // BOTÓN ENVIAR DINERO (volver a menú)
    window.enviarDineroFinal = function (event) {
        event.preventDefault();

        alert("Redirigiendo a la pagina de menu");

        setTimeout(() => {
            window.location.href = "/home/ricky/Documentos/billetera_digital/menu.html";
        }, 2000);
    };

});
$(document).ready(function () {

  $("#searchContact").on("keyup", function () {
    let searchText = $(this).val().toLowerCase();

    $("#contactList li").each(function () {
      let contactText = $(this).text().toLowerCase();

      if (contactText.includes(searchText)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

});
$(document).ready(function () {

  // Ocultar botón al cargar
  $("#btnEnviar").hide();

  // Detectar selección de contacto
  $("input[name='contacto']").on("change", function () {

    // Mostrar botón
    $("#btnEnviar").fadeIn();

    // Quitar resaltado anterior
    $("#contactList li").removeClass("active-contact");

    // Resaltar el seleccionado
    $(this).closest("li").addClass("active-contact");
  });

});

function mostrarConfirmacion(mensaje) {
  let html = `
    <div class="alert alert-success mt-3" role="alert">
      ${mensaje}
    </div>
  `;

  $("#confirm-container").html(html);
}
$("#btnEnviar").on("click", function () {
 event.preventDefault(); // 🔥 CLAVE
  let contacto = $("input[name='contacto']:checked").val();

  if (!contacto) {
    mostrarAlerta("Debes seleccionar un contacto.", "danger");
    return;
  }

  // Mensaje superior (feedback inmediato)
  mostrarAlerta(
    `Transferencia enviada a <strong>${contacto}</strong>`,
    "success"
  );

  // 👇 MENSAJE DE CONFIRMACIÓN (lo que pediste)
  mostrarConfirmacion(
    `✔ El envío a <strong>${contacto}</strong> se realizó con éxito.`
  );
});

window.mostrarAlerta = function (mensaje, tipo) {
  $("#alert-container").html(`
    <div class="alert alert-${tipo} alert-dismissible fade show mt-3" role="alert">
      ${mensaje}
      <button type="button" class="close" data-dismiss="alert">
        <span>&times;</span>
      </button>
    </div>
  `);
};
window.enviarDineroContacto = function () {

  let contacto = $("input[name='contacto']:checked").val();

  if (!contacto) {
    mostrarAlerta("Debes seleccionar un contacto.", "danger");
    return;
  }

  // Mensaje inmediato
  mostrarAlerta(
    `Transferencia enviada a <strong>${contacto}</strong>`,
    "success"
  );

  // Confirmación inferior
  mostrarConfirmacion(
    `✔ El envío a <strong>${contacto}</strong> se realizó con éxito.`
  );
          setTimeout(() => {
            window.location.href = "/home/ricky/Documentos/billetera_digital/menu.html";
        }, 2000);
};