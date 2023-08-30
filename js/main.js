// ----------- Intenatr ordenar: 1. Importación de módulos
// ----------- 2. Declaración de variables
// ----------- 3. Declaración de funciones
// ----------- 4. Ejecución de código



// --------- Declaración de const elementos HTML
const  shopProducts = document.getElementById(" shopProducts");
const verMiCarrito = document.getElementById("verMiCarrito")

// --------- Declaración de carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// --------- Shop Content

const getProducts = async () => {
    const response = await fetch("./data.json");
    const data = await response.json()

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "product-card"
        content.innerHTML =  `
            <img class="product-image" src="${product.img}">
            <div class="product-details"> 
                <h3 class="product-title">${product.name}</h3>
                <p class="price">${product.price}$</p>
            </div>
        `;
    
         shopProducts.append(content);
    
        // --------- Botón Agregar al carrito
    
        let comprar = document.createElement("button")
        comprar.innerText = "Agregar";
        comprar.className = "add-to-cart"
        content.append(comprar);
    
        comprar.addEventListener("click", () => {
            const repeatId = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    
            if (repeatId){
                carrito.map((productCarrito) => {
                    if (productCarrito.id === product.id){
                        productCarrito.unit++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    unit: product.unit,
                });
                saveLocalStorage();
            }
            });
    });
    
}

getProducts();




// --------- LocalStorage
const saveLocalStorage = () => {
localStorage.setItem("carrito" , JSON.stringify (carrito));
};

