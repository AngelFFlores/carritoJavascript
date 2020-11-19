document.addEventListener("DOMContentLoaded", function () {
  datos();
});
  let carrito = {};

const pintarTarejtas = (data) => {
  const contenedorTarjetas = document.querySelector("#tarjetas");
  const template = document.querySelector("#template-lista").content;
   const fragment = new DocumentFragment();

  data.forEach((item, index) => {
    template.querySelector(".card-title").textContent = item.nombre;
    template.querySelector("img").setAttribute("src", item.img);
    template.querySelector("button").dataset.id = item.id;
    template.querySelector(".card-text").textContent = "$" + item.precio;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  contenedorTarjetas.appendChild(fragment);
};

const eventoBotones = (data) => {
  const botones = document.querySelectorAll("button");
  botones.forEach((item) => {
    item.addEventListener("click", () => {
      const producto = data.find((p) => p.id === parseInt(item.dataset.id));
      producto.cantidad = 1;
      producto.totalDeCompra = 0;
      if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
      }
      producto.totalDeCompra = parseInt(producto.precio) * producto.cantidad
      carrito[producto.id] = { ...producto };
      pintarCarrito();
    });
  });
};

const pintarCarrito = () => {
  const templateTabla = document.querySelector("#template-tabla").content;
  const contenedorTabla = document.querySelector("#items");
  const fragment = new DocumentFragment();
  contenedorTabla.innerHTML = "";
  Object.values(carrito).forEach((element) => {
    templateTabla.querySelectorAll("td")[0].textContent = element.id;
    templateTabla.querySelectorAll("td")[1].textContent = element.nombre;
    templateTabla.querySelectorAll("td")[2].textContent = element.cantidad;
    templateTabla.querySelectorAll("td")[4].textContent = element.totalDeCompra;
    const clonTabla = templateTabla.cloneNode(true);
    fragment.appendChild(clonTabla);
  });
  contenedorTabla.appendChild(fragment);
};

const datos = () => {
  fetch("datos.json")
    .then((response) => response.json())
    .then((data) => {
      pintarTarejtas(data);
      eventoBotones(data);
    });
};
