const productsContainer = document.getElementById("productsContainer");

let total = 0;


// LOAD PRODUCTS
async function loadProducts() {

  try {

    const response = await fetch("http://127.0.0.1:5000/api/products");

    const result = await response.json();

    const products = result.data;

    productsContainer.innerHTML = "";

    products.forEach((product) => {

      productsContainer.innerHTML += `

        <div class="card">

          <img src="${product.image}" width="150">

          <h2>${product.name}</h2>

          <p>Price: $${product.price}</p>

          <p>Quantity: ${product.quantity}</p>

          <button onclick="deleteProduct('${product._id}')">
            Delete
          </button>

          <button onclick="addToCart('${product.name}', ${product.price})">
            Add To Cart
          </button>

        </div>

      `;

    });

  } catch (error) {

    console.log("Error:", error);

  }

}


// VERY IMPORTANT
window.onload = loadProducts;


// ADD PRODUCT
async function addProduct() {

  const name = document.getElementById("name").value;

  const price = document.getElementById("price").value;

  const quantity = document.getElementById("quantity").value;

  const image = document.getElementById("image").value;

  await fetch("http://localhost:5000/api/products", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name,
      price,
      quantity,
      image
    })

  });

  alert("Product Added");

  location.reload();

}


// DELETE PRODUCT
async function deleteProduct(id) {

  await fetch(`http://localhost:5000/api/products/${id}`, {

    method: "DELETE"

  });

  alert("Product Deleted");

  location.reload();

}


// SEARCH PRODUCT
async function searchProducts() {

  const search = document.getElementById("searchInput").value;

  const response = await fetch(
    `http://localhost:5000/api/products?search=${search}`
  );

  const result = await response.json();

  const products = result.data;

  productsContainer.innerHTML = "";

  products.forEach((product) => {

    productsContainer.innerHTML += `

      <div class="card">

        <img src="${product.image}" width="150">

        <h2>${product.name}</h2>

        <p>Price: $${product.price}</p>

        <p>Quantity: ${product.quantity}</p>

        <button onclick="deleteProduct('${product._id}')">
          Delete
        </button>

        <button onclick="addToCart('${product.name}', ${product.price})">
          Add To Cart
        </button>

      </div>

    `;

  });

}


// ADD TO CART
function addToCart(name, price) {

  const cartContainer =
    document.getElementById("cartContainer");

  cartContainer.innerHTML += `
    <p>${name} - $${price}</p>
  `;

  total += price;

  document.getElementById("totalAmount").innerText =
    `Total: $${total}`;

}


// CHECKOUT
function checkout() {

  document.getElementById("paymentBox").style.display =
    "block";

}


// PLACE ORDER
function placeOrder() {

  alert("Order Placed Successfully ✅");

  document.getElementById("cartContainer").innerHTML = "";

  total = 0;

  document.getElementById("totalAmount").innerText =
    "Total: $0";

  document.getElementById("paymentBox").style.display =
    "none";

}