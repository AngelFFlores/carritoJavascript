document.addEventListener("DOMContentLoaded", function () {
  datos();
});
let carrito = {};
const contenedorTarjetas = document.querySelector("#tarjetas");
const tablaProductos = document.querySelector("#tablaProductos");

const pintarTarejtas = (data) => {
  const template = document.querySelector("#template-lista").content;
  const fragment = new DocumentFragment();

  data.forEach((item, index) => {
    const clone = template.cloneNode(true);
    clone.querySelector(".card-title").textContent = item.nombre;
    clone.querySelector("img").setAttribute("src", item.img);
    clone.querySelector("button").dataset.id = item.id;
    clone.querySelector(".card-text").textContent = "$" + item.precio;
    fragment.appendChild(clone);
  });
  contenedorTarjetas.appendChild(fragment);
};

const eventoBotones = (data) => {
  contenedorTarjetas.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-primary")) {
      let idBtn = e.target.dataset.id;
      const producto = data.find((p) => p.id === parseInt(idBtn));
      producto.cantidad = 1;
      producto.totalDeCompra = 0;
      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
      }
      producto.totalDeCompra = parseInt(producto.precio) * producto.cantidad;
      carrito[producto.id] = { ...producto };
      pintarCarrito();
    }
  });
};

const pintarCarrito = () => {
  const templateTabla = document.querySelector("#template-tabla").content;
  const contenedorTabla = document.querySelector("#items");
  const fragment = new DocumentFragment();
  contenedorTabla.innerHTML = "";
  Object.values(carrito).forEach((element) => {
    const clonTabla = templateTabla.cloneNode(true);
    clonTabla.querySelectorAll("td")[0].textContent = element.id;
    clonTabla.querySelectorAll("td")[1].textContent = element.nombre;
    clonTabla.querySelectorAll("td")[2].textContent = element.cantidad;
    clonTabla.querySelector(".btn-danger").dataset.id = element.id;
    clonTabla.querySelector(".btn-info").dataset.id = element.id;
    clonTabla.querySelectorAll("td")[4].textContent = element.totalDeCompra;
    fragment.appendChild(clonTabla);
  });
  contenedorTabla.appendChild(fragment);
};

const eventosBtnsTabla = () => {
  tablaProductos.addEventListener("click", (e) => {
    let producto = carrito[e.target.dataset.id];
    if (e.target.classList.contains("btn-danger")) {
      producto.cantidad =
      producto.cantidad - 1 == -1
          ? 0
          : carrito[e.target.dataset.id].cantidad - 1;

          producto.totalDeCompra =    producto.totalDeCompra - parseInt(producto.precio) ;
         
    }

    if (e.target.classList.contains("btn-info")) {
      producto.cantidad =
      producto.cantidad + 1;
      producto.totalDeCompra =  parseInt(producto.precio) * producto.cantidad;
    }
   
    carrito[producto.id] = { ...producto };

    if (carrito[e.target.dataset.id].cantidad == 0) {
      delete   carrito[producto.id];
    }
  
    pintarCarrito();
  });
};
const datos = () => {
  fetch("datos.json")
    .then((response) => response.json())
    .then((data) => {
      pintarTarejtas(data);
      eventoBotones(data);
      eventosBtnsTabla();
    });
};
