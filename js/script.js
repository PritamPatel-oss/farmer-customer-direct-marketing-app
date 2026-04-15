// ================= AUTO USERS =================
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { name: "admin", password: "123", role: "admin" },
    { name: "farmer", password: "123", role: "farmer" },
    { name: "user", password: "123", role: "customer" }
  ]));
}

let selectedCategory = "All";

// ================= 50+ PRODUCTS =================
const defaultProducts = [
  // Vegetables
  {id:1,name:"Tomato",price:20,category:"Vegetable"},
  {id:2,name:"Potato",price:15,category:"Vegetable"},
  {id:3,name:"Carrot",price:30,category:"Vegetable"},
  {id:4,name:"Onion",price:25,category:"Vegetable"},
  {id:5,name:"Cabbage",price:18,category:"Vegetable"},
  {id:6,name:"Cauliflower",price:22,category:"Vegetable"},
  {id:7,name:"Spinach",price:10,category:"Vegetable"},
  {id:8,name:"Brinjal",price:28,category:"Vegetable"},
  {id:9,name:"Capsicum",price:35,category:"Vegetable"},
  {id:10,name:"Green Peas",price:40,category:"Vegetable"},
  {id:11,name:"Radish",price:12,category:"Vegetable"},
  {id:12,name:"Beetroot",price:20,category:"Vegetable"},
  {id:13,name:"Pumpkin",price:25,category:"Vegetable"},

  // Fruits
  {id:14,name:"Apple",price:120,category:"Fruit"},
  {id:15,name:"Banana",price:50,category:"Fruit"},
  {id:16,name:"Mango",price:100,category:"Fruit"},
  {id:17,name:"Orange",price:80,category:"Fruit"},
  {id:18,name:"Papaya",price:45,category:"Fruit"},
  {id:19,name:"Pineapple",price:60,category:"Fruit"},
  {id:20,name:"Grapes",price:90,category:"Fruit"},
  {id:21,name:"Watermelon",price:70,category:"Fruit"},
  {id:22,name:"Guava",price:40,category:"Fruit"},
  {id:23,name:"Pomegranate",price:110,category:"Fruit"},
  {id:24,name:"Strawberry",price:150,category:"Fruit"},
  {id:25,name:"Kiwi",price:180,category:"Fruit"},

  // Grains
  {id:26,name:"Rice",price:60,category:"Grain"},
  {id:27,name:"Wheat",price:45,category:"Grain"},
  {id:28,name:"Maize",price:35,category:"Grain"},
  {id:29,name:"Barley",price:50,category:"Grain"},
  {id:30,name:"Bajra",price:40,category:"Grain"},
  {id:31,name:"Jowar",price:38,category:"Grain"},
  {id:32,name:"Ragi",price:55,category:"Grain"},
  {id:33,name:"Oats",price:70,category:"Grain"},
  {id:34,name:"Quinoa",price:150,category:"Grain"},
  {id:35,name:"Brown Rice",price:90,category:"Grain"},

  // Pulses
  {id:36,name:"Toor Dal",price:110,category:"Pulse"},
  {id:37,name:"Moong Dal",price:105,category:"Pulse"},
  {id:38,name:"Chana Dal",price:95,category:"Pulse"},
  {id:39,name:"Urad Dal",price:120,category:"Pulse"},
  {id:40,name:"Masoor Dal",price:100,category:"Pulse"},
  {id:41,name:"Rajma",price:130,category:"Pulse"},
  {id:42,name:"Chickpeas",price:90,category:"Pulse"},

  // Others
  {id:43,name:"Groundnut",price:85,category:"Other"},
  {id:44,name:"Mustard Seeds",price:75,category:"Other"},
  {id:45,name:"Sugarcane",price:30,category:"Other"},
  {id:46,name:"Cotton",price:200,category:"Other"},
  {id:47,name:"Soybean",price:65,category:"Other"},
  {id:48,name:"Sunflower Seeds",price:120,category:"Other"},
  {id:49,name:"Sesame Seeds",price:140,category:"Other"},
  {id:50,name:"Tea Leaves",price:180,category:"Other"},
  {id:51,name:"Coffee Beans",price:220,category:"Other"}
];

// ================= LOGIN =================
function login(){
  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find(u =>
    u.name === loginName.value &&
    u.password === loginPassword.value &&
    u.role === loginRole.value
  );

  if(!user) return alert("Invalid login");

  localStorage.setItem("currentUser", JSON.stringify(user));

  if(user.role === "admin") location = "admin-dashboard.html";
  else if(user.role === "farmer") location = "farmer-dashboard.html";
  else location = "index.html";
}

// ================= REGISTER =================
function register(){
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({
    name: name.value,
    password: password.value,
    role: role.value
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered!");
  location = "login.html";
}

// ================= LOGOUT =================
function logout(){
  localStorage.removeItem("currentUser");
  location = "login.html";
}

// ================= PRODUCTS =================
function getAllProducts(){
  let extra = JSON.parse(localStorage.getItem("products")) || [];
  return [...defaultProducts, ...extra];
}

// ================= FILTER + SEARCH =================
function setCategory(c){
  selectedCategory = c;
  applyFilters();
}

function applyFilters(){
  let all = getAllProducts();
  let keyword = (document.getElementById("searchInput")?.value || "").toLowerCase();

  let filtered = all.filter(p =>
    (selectedCategory === "All" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(keyword)
  );

  display(filtered);
}

// ================= DISPLAY =================
function display(list){
  let container = document.getElementById("products");
  if(!container) return;

  container.innerHTML = list.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

// ================= CART =================
function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(i => i.id === id);

  if(item) item.qty++;
  else cart.push({ id: id, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart");
}

// ================= SHOW CART =================
function showCart(){
  let container = document.getElementById("cart");
  if(!container) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let all = getAllProducts();

  if(cart.length === 0){
    container.innerHTML = "<h3>Your cart is empty</h3>";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map(item => {
    let product = all.find(p => p.id === item.id);
    if(!product) return "";

    let subtotal = product.price * item.qty;
    total += subtotal;

    return `
      <div class="card">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>

        <button onclick="dec(${item.id})">-</button>
        ${item.qty}
        <button onclick="inc(${item.id})">+</button>

        <p>Subtotal: ₹${subtotal}</p>
      </div>
    `;
  }).join("");

  container.innerHTML += `<h2>Total: ₹${total}</h2>`;
}

// ================= QTY =================
function inc(id){
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.find(i => i.id === id).qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function dec(id){
  let cart = JSON.parse(localStorage.getItem("cart"));
  let item = cart.find(i => i.id === id);

  if(item.qty > 1) item.qty--;
  else cart = cart.filter(i => i.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// ================= ORDER =================
function placeOrder(){
  localStorage.removeItem("cart");
  alert("Order placed!");
  showCart();
}

// ================= INIT =================
applyFilters();
showCart();