const form = document.querySelector("#financial-form");
const tipoTransaccion = document.querySelector("#transaction-type");
const detalleTransaccion = document.getElementById("transaction-detail");
const montoTransaccion = document.getElementById("transaction-amount");

const resumenIngreso = document.getElementById("summary-income");
const resumenGasto = document.getElementById("summary-expenses");
const resumenBalance = document.getElementById("summary-balance");
const headerBalance = document.getElementById("balance-display");

const notification = document.getElementById("notification");

let arregloTransacciones = [];

function mostrarNotificacion(mensaje, tipo) {
   notification.textContent = mensaje;
   notification.classList.remove("hidden");

   if (tipo === "error") {
      notification.className = "mt-6 px-4 py-3 rounded-xl font-semibold text-sm shadow-md bg-red-100 text-red-800 border border-red-300";
   } else if (tipo === "exito") {
      notification.className = "mt-6 px-4 py-3 rounded-xl font-semibold text-sm shadow-md bg-green-100 text-green-800 border border-green-300";
   }

   setTimeout(() => {
      notification.classList.add("hidden");
   }, 3000);
}

form.addEventListener("submit", function (event) {
   event.preventDefault();

   const tipo = tipoTransaccion.value.trim();
   const detalle = detalleTransaccion.value.trim();
   const monto = parseFloat(montoTransaccion.value);

   // Validaciones
   if (!tipo || !detalle || isNaN(monto) || monto <= 0) {
      mostrarNotificacion("Por favor completa todos los campos correctamente.", "error");
      return;
   }

   // Crear movimiento
   const movimiento = { tipo, detalle, monto };
   arregloTransacciones.push(movimiento);
   mostrarNotificacion("Movimiento registrado correctamente.", "exito");

   // Calcular totales
   const ingresos = arregloTransacciones
      .filter(m => m.tipo === "ingreso")
      .reduce((acc, m) => acc + m.monto, 0);

   const gastos = arregloTransacciones
      .filter(m => m.tipo === "gasto")
      .reduce((acc, m) => acc + m.monto, 0);

   const balance = ingresos - gastos;

   // Mostrar en pantalla
   resumenIngreso.innerText = `$${ingresos.toFixed(2)}`;
   resumenGasto.innerText = `$${gastos.toFixed(2)}`;
})