/// Array para almacenar los productos
let products = [];

// Obtener referencias a los elementos del DOM
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Función para renderizar la lista de productos
function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.flavor}</td>
            <td>${product.stock}</td>
            <td>${product.priceRetail}</td>
            <td>${product.priceWholesale}</td>
            <td>${product.sold ? 'Vendido' : 'No Vendido'}</td>
            <td>
                <button onclick="editProduct('${product.id}')">Editar</button>
                <button onclick="toggleSold('${product.id}')">${product.sold ? 'Marcar No Vendido' : 'Marcar Vendido'}</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Función para agregar un producto
function addProduct(name, flavor, stock, priceRetail, priceWholesale) {
    const id = Date.now().toString(); // Generar un ID único basado en el timestamp
    const sold = false; // Por defecto, el producto no está vendido
    products.push({ id, name, flavor, stock, priceRetail, priceWholesale, sold });
    renderProducts();
}

// Función para marcar como vendido/no vendido un producto
function toggleSold(id) {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        products[productIndex].sold = !products[productIndex].sold;
        renderProducts();
    }
}

// Función para manejar el envío del formulario
productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const flavor = document.getElementById('productFlavor').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const priceRetail = parseFloat(document.getElementById('productPriceRetail').value);
    const priceWholesale = parseFloat(document.getElementById('productPriceWholesale').value);
    
    addProduct(name, flavor, stock, priceRetail, priceWholesale);
    productForm.reset(); // Limpiar el formulario después de agregar un producto
});

// Inicialización de la aplicación
renderProducts();
