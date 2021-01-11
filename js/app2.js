
/*API key:
- Your API key is 3df1a637908a5b6f63ff5228fba76a4e
- Within the next couple of hours, it will be activated and ready to use
- You can later create more API keys on your account page
- Please, always use your API key in each API call
*/

const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", bucarClima);
});

function bucarClima(e) {
  e.preventDefault();

  //validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  console.log(ciudad);
  console.log(pais);
  if (ciudad == "" || pais == "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }
  // consultar api
  cunsultarAPI(ciudad, pais);
  console.log("Buscando el clima...");
}

function mostrarError(mensaje) {
  console.log(mensaje);
  const alerta = document.querySelector(".bg-red-100");
  if (!alerta) {
    //crear alerta
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "masx-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `
    
    <strong class="font-bold">Error</strong>
    <span class="block">${mensaje}</span>
    
    `;
    container.appendChild(alerta);
    // se elimine la alerta despues de unos segundos

    setTimeout(() => {
      alerta.remove();
    }, 1500);
  }
}

function cunsultarAPI(ciudad, pais) {
  //REQUIERE APIKEY

  const appId = "3df1a637908a5b6f63ff5228fba76a4e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  console.log(url);
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML();
      console.log(datos.main);
      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }
      //imprime la respuesta en el html
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const nombreCiudad = name;
  const centigrados = parseInt(temp - 273.15);
  const max = parseInt(temp_max - 273.15);
  const min = parseInt(temp_min - 273.15);
  const actual = document.createElement("p");
  actual.innerHTML = `Temperatura actual de ${name} ${centigrados} ºC`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Máxima: ${max} ºC`;
  tempMaxima.classList.add("text-hl");

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Mínima: ${min} ºC`;
  tempMaxima.classList.add("text-hl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMin);
  resultado.appendChild(resultadoDiv);
  console.log(temp - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
