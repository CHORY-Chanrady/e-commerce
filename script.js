let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice, productImage) {
  // Check if the product is already in the cart
  const existingProduct = cartItems.find(item => item.id === productId);

  if (existingProduct) {
    // Increase the quantity if the product is already in the cart
    existingProduct.quantity += 1;
  } else {
    // Add the product to the cart
    cartItems.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
  }

  // Update the cart count
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  alert(`${productName} added to cart!`);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  renderCartItems(); // Re-render the cart items
  alert('Product removed from cart!');
}

// Function to update the cart count
function updateCartCount() {
  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// Function to render cart items on the cart page
function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalContainer = document.querySelector('.cart-total');

  if (cartItemsContainer && cartTotalContainer) {
    // Clear the current cart items
    cartItemsContainer.innerHTML = '';

    // Render each cart item
    let total = 0;
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="assets/Images/${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
          <button onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);

      // Update the total price
      total += item.price * item.quantity;
    });

    // Render the total price
    cartTotalContainer.innerHTML = `
      <h3>Total: $${total.toFixed(2)}</h3>
      <button onclick="checkout()">Proceed to Checkout</button>
    `;
  }
}

// Function to handle checkout
function checkout() {
  if (cartItems.length > 0) {
    alert('Proceeding to checkout...');
    // Clear the cart after checkout
    cartItems = [];
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    renderCartItems();
  } else {
    alert('Your cart is empty!');
  }
}

// Update the cart count when the page loads
updateCartCount();

// Render cart items when the cart page loads
if (window.location.pathname.includes('cart.html')) {
  renderCartItems();
}