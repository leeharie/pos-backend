const productsContainer = document.getElementById("productsContainer");

async function loadProducts() {

  try {

    const response = await fetch("http://localhost:5000/api/products");

    const result = await response.json();

    const products = result.data;

    productsContainer.innerHTML = "";

    products.forEach((product) => {

      productsContainer.innerHTML += `

        <div class="card">

          <h2>${product.name}</h2>

          <p>Price: $${product.price}</p>

          <p>Quantity: ${product.quantity}</p>

          <button onclick="deleteProduct('${product._id}')">
            Delete
          </button>

        </div>

      `;
    });

  } catch (error) {

    console.log(error);

  }
}

loadProducts();

// ✅ ADD PRODUCT
async function addProduct() {

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  const response = await fetch("http://localhost:5000/api/products", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name,
      price,
      quantity
    })

  });

  await response.json();

  alert("Product Added");

  location.reload();
}

// ✅ DELETE PRODUCT
async function deleteProduct(id) {

  await fetch(`http://localhost:5000/api/products/${id}`, {

    method: "DELETE"

  });

  alert("Product Deleted");

  location.reload();
}

// ✅ SEARCH PRODUCT
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

        <h2>${product.name}</h2>

        <p>Price: $${product.price}</p>

        <p>Quantity: ${product.quantity}</p>

      </div>

    `;
  });
}