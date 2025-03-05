const categorias = {
    frutas: [],
    lacteos: [],
    dulces: [],
    congelados: [],
    cereales: [],
    carnes: [],
};

const solicitarEntrada = (mensaje, opcionesValidas = null) => {
    let respuesta;
    do {
        respuesta = prompt(mensaje).toLowerCase();
        if (opcionesValidas && !opcionesValidas.includes(respuesta)) {
            alert(`Por favor, responde con una de las siguientes opciones: ${opcionesValidas.join(", ")}.`);
            respuesta = null;
        }
    } while (!respuesta);
    return respuesta;
};

const manejarComida = (accion) => {
    const preguntaAccion = `¿Deseas ${accion} una comida a la lista de compras? Responde 'sí' o 'no'.`;
    const mensajeCategoria = "¿En qué categoría encaja esta comida: 'frutas', 'lacteos', 'dulces', 'congelados', 'cereales' o 'carnes'?";

    let continuar = "sí";
    while (continuar === "sí") {
        continuar = solicitarEntrada(preguntaAccion, ["sí", "no"]);
        if (continuar === "no") break;

        let comida = solicitarEntrada(`¿Qué comida deseas ${accion}?`);
        let categoria = solicitarEntrada(mensajeCategoria);

        if (categorias[categoria]) {
            if (accion === "agregar") {
                categorias[categoria].push(comida);
            } else if (accion === "eliminar") {
                let index = categorias[categoria].indexOf(comida);
                index !== -1 ? categorias[categoria].splice(index, 1) : alert("Esa comida no está en la lista.");
            }
        } else {
            alert("Esa categoría no está predefinida.");
        }
    }
};

const mostrarListaDeCompras = () => {
    let mensaje = "<h2>Lista de compras:</h2><ul>";
    for (let categoria in categorias) {
        mensaje += `<li><strong>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:</strong> ${categorias[categoria].join(", ")}</li>`;
    }
    mensaje += "</ul>";
    document.getElementById("lista-compras").innerHTML = mensaje;
};

const agregarComida = () => manejarComida("agregar");
const eliminarComida = () => manejarComida("eliminar");
