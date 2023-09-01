
// --------- Declaración de verCarrito (botón carrito)

const verCarrito = document.getElementById("verCarrito");

// --------- Función Carrito de Compras

const miCarrito = () => {
    
    verMiCarrito.innerHTML = "";
    verMiCarrito.style.display = "flex";
    const miCarritoHeader = document.createElement("div")
    miCarritoHeader.className = "miCarrito-Header"
    miCarritoHeader.innerHTML = `
    <h1 class="miCarrito-title">Tu Carrito</h1>
    `;
    verMiCarrito.append(miCarritoHeader); 
    
    // --- Cerrar Ver Carrito
    const miCarritoExit = document.createElement("div");
    miCarritoExit.className = "miCarrito-button";
    miCarritoExit.innerHTML = `<i class="bi bi-x-lg"></i>`;
    miCarritoHeader.append(miCarritoExit);
    
    miCarritoExit.addEventListener("click",  () => {
        verMiCarrito.style.display = "none";
    } );
            
    // --- Mostrar Productos Carrito
    carrito.forEach((product) => {
        let miCarritoContent = document.createElement("div");
        miCarritoContent.className = "miCarrito-content";
        miCarritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <p>${product.price}$</p>
        <button class="minus"> - </button>
        <p>Unidades: ${product.unit}</p>
        <button class="plus"> + </button>
        <button class="delete-product"> x </button>

        `;
        verMiCarrito.append(miCarritoContent);

        // --- Restar unidades de un producto
        let minusUnit = miCarritoContent.querySelector(".minus")
        minusUnit.addEventListener("click", () => {
            if(product.unit > 1 ){
            product.unit--;
        }
            saveLocalStorage();
            miCarrito();
        });

        // --- Sumar unidades de un producto
        let plusUnit = miCarritoContent.querySelector(".plus")
        plusUnit.addEventListener("click", () => {
            product.unit++;
            saveLocalStorage();
            miCarrito();
        });

        // --- Boton Eliminar un producto
        let  miCarritoDelete = miCarritoContent.querySelector(".delete-product")
         miCarritoDelete.addEventListener("click", () => {
            deleteProduct(product.id);
        })
    });
    
        // --- Total a pagar

    // const total = carrito.reduce((acc,  el) => acc + el.price, 0);
    const total = carrito.reduce((acc, el) => acc + (el.price * el.unit), 0);
    
    const  miCarritoTotal = document.createElement("div");
     miCarritoTotal.className = "total-purchase";
     miCarritoTotal.innerHTML = `Total a pagar: $${total}`;
    verMiCarrito.append( miCarritoTotal);
};

        // --- Ver Carrito de compras

verCarrito.addEventListener("click", miCarrito);

// --------- Función Eliminar Producto del Carrito

const deleteProduct = (id) => {
    const foundId = carrito.find((element) => element.id === id)

    carrito = carrito.filter ((nuevoCarrito) => {
        return nuevoCarrito !== foundId;
    });
    saveLocalStorage();
    miCarrito();
}