// ///nav bar
// const hamburger = document.getElementById('hamburger');
// const navLinks = document.getElementById('navLinks');

// hamburger.addEventListener('click', () => {
//   navLinks.classList.toggle('active');
// });

// Logout function
function logout() {
    alert("Logout Successfully");
    window.location.href = "login.html";
}

// Register function
function Register(event) {
    event.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Hai " + username + ", your account has been registered successfully.");
        window.location.href = "login.html";
    } else {
        alert("Please fill all the fields required");
    }
}

// Login function
function Login(event) {
    event.preventDefault();
    const enteredUsername = document.getElementById("loginUsername").value.trim();
    const enteredPassword = document.getElementById("loginpassword").value.trim();

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        alert("Login Successfully");
        window.location.href = "home.html";
    } else {
        alert("Login Failed. Please enter valid credentials.");
    }
}

///cart

let cart = [];

function addToCart(name, price, image) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  updateCartCount();
}

function updateCartPopup() {
  const cartPopup = document.getElementById("cartPopup");
  const cartContent = document.getElementById("cartContent");
  const grandTotalEl = document.getElementById("grandTotal");

  cartContent.innerHTML = '';
  let grandTotal = 0;

  if (cart.length === 0) {
    cartContent.innerHTML = '<p style="text-align:center; padding: 10px;">Your cart is empty.</p>';
    grandTotalEl.innerText = '';
  } else {
    cart.forEach((item, index) => {
      grandTotal += item.price * item.quantity;
      cartContent.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <p><strong>${item.name}</strong></p>
            <p>$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
              <button onclick="changeQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
    });
    grandTotalEl.innerText = `Grand Total: $${grandTotal.toFixed(2)}`;
  }

  cartPopup.style.display = 'block';
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartPopup();
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  let total = 0;
  cart.forEach(item => total += item.quantity);
  countEl.innerText = total;
}

function closeCart() {
  document.getElementById("cartPopup").style.display = "none";
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("cartPopup").style.display = "none";
  document.getElementById("buyNowPopup").style.display = "block";
}

function closeBuyNowPopup() {
  document.getElementById("buyNowPopup").style.display = "none";
}

function submitBuyForm(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const card = document.getElementById("card").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!name || !email || !card || !expiry || !cvv) {
    alert("Please fill all fields.");
    return false;
  }

  alert("Purchase Successful!");
  document.getElementById("buyNowPopup").style.display = "none";
  cart = [];
  updateCartCount();
  return false;
}

window.onload = updateCartCount;


//// buy now code js
document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buy-btn");
  const paymentBox = document.getElementById("paymentBox");
  const closeBtn = document.getElementById("closeBtn");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      paymentBox.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    paymentBox.style.display = "none";
  });
});

function handleBuyNow() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const expMonth = document.getElementById("expMonth").value.trim();
  const expYear = document.getElementById("expYear").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!name || !email || !cardNumber || !expMonth || !expYear || !cvv) {
    alert("⚠️ Please fill in all required fields before buying.");
    return;
  }

  // All fields are filled; proceed
  window.location.href = "success.html";
}
