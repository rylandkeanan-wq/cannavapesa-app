// ============================================================
// CANNAVAPESA — static site logic (no build step required)
// ============================================================

// ⚠️ REPLACE THIS with the real order WhatsApp number before launch.
// Format: country code + number, no + or spaces. e.g. South Africa 082 123 4567 -> "27821234567"
const WHATSAPP_NUMBER = "27000000000";

const ORDERS_EMAIL = "Sales@cannavapesa.co.za";

const FREE_DELIVERY_THRESHOLD = 800;

const products = [
  { id: 1, name: "Jet Fuel", category: "Vape", price: 400, note: "Uplifting · Energizing · Focus", image: "https://images.unsplash.com/photo-1530543787849-128d7d0f4b3c?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Pink Diesel", category: "Vape", price: 400, note: "Happy · Relaxing · Stress relief", image: "https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "La Confidental", category: "Vape", price: 400, note: "Calming · Relaxing · Body · Mind", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Wi Fi OG", category: "Vape", price: 400, note: "Euphoric · Creative · Focused", image: "https://images.unsplash.com/photo-1588423771073-b8903fbb76f0?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Pineapple Skunk", category: "Vape", price: 400, note: "Uplifting · Happy · Tropical", image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Cobra Milk", category: "Flower", price: 280, note: "Earthy · Dense · Powerful", image: "https://images.unsplash.com/photo-1534479664-6e7d9c6e57c1?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Forbidden Candy", category: "Flower", price: 320, note: "Sweet · Gassy · Euphoric", image: "https://images.unsplash.com/photo-1533520738135-5bc3b5e5b3a8?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Outdoor Reserve", category: "Flower", price: 220, note: "Natural · Sun grown · Pure", image: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1cf3b?auto=format&fit=crop&w=900&q=85" },

  // Artisan Smkz — hand-crafted pre-roll collection
  { id: 101, name: "Kassie Konez Mini", category: "Artisan Smkz", price: null, note: "Kassie's Finest · Greenhouse · 0.7g", image: "assets/artisan-smkz/kassie-tubes.jpg" },
  { id: 102, name: "Kassie Konez King", category: "Artisan Smkz", price: null, note: "Kassie's Finest · Greenhouse · 1g", image: "assets/artisan-smkz/kassie-tubes.jpg" },
  { id: 103, name: "Plane Jayne Mini", category: "Artisan Smkz", price: null, note: "Plane Jayne Premium · AAA Indoor · 0.7g", image: "assets/artisan-smkz/kassie-tubes.jpg" },
  { id: 104, name: "Plane Jayne King", category: "Artisan Smkz", price: null, note: "Plane Jayne Premium · AAA Indoor · 1g", image: "assets/artisan-smkz/kassie-tubes.jpg" },
  { id: 105, name: "Dog Walker", category: "Artisan Smkz", price: null, note: "Top Shelf Selections · AAA Indoor + Kief · 0.7g", image: "assets/artisan-smkz/topshelf-tubes.jpg" },
  { id: 106, name: "Mav King", category: "Artisan Smkz", price: null, note: "Top Shelf Selections · AAA Indoor + Kief · 1g", image: "assets/artisan-smkz/topshelf-tubes.jpg" },
  { id: 107, name: "Bespoke Mini", category: "Artisan Smkz", price: null, note: "Bespoke Extracts · AAA Indoor + Extract · 0.7g", image: "assets/artisan-smkz/topshelf-tubes.jpg" },
  { id: 108, name: "Bespoke Smoke", category: "Artisan Smkz", price: null, note: "Bespoke Extracts · AAA Indoor + Extract · 1g", image: "assets/artisan-smkz/topshelf-tubes.jpg" },
  { id: 109, name: "The Big Dog", category: "Artisan Smkz", price: null, note: "Roll With the Big Dogs · AAA Indoor + Kief · 3g", image: "assets/artisan-smkz/charlie-sheen-tube.jpg" },
  { id: 110, name: "Charlie Sheen", category: "Artisan Smkz", price: null, note: "The Charlie Sheen Special · AAA Indoor + Extract · 3g", image: "assets/artisan-smkz/charlie-sheen-tube.jpg" },
];

const productById = (id) => products.find((p) => p.id === id);

function icons() {
  if (window.lucide) window.lucide.createIcons();
}

// ------------------------------------------------------------
// Age gate
// ------------------------------------------------------------
const ageGate = document.getElementById("age-gate");
const site = document.getElementById("site");

function initAgeGate() {
  const verified = sessionStorage.getItem("cv_age_verified") === "1";
  if (verified) {
    ageGate.hidden = true;
    site.hidden = false;
  }
  document.getElementById("age-yes").addEventListener("click", () => {
    sessionStorage.setItem("cv_age_verified", "1");
    ageGate.hidden = true;
    site.hidden = false;
    icons();
  });
  document.getElementById("age-no").addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

// ------------------------------------------------------------
// Cart (persisted in localStorage)
// ------------------------------------------------------------
let cart = {};
try {
  cart = JSON.parse(localStorage.getItem("cv_cart") || "{}");
} catch (e) {
  cart = {};
}

function saveCart() {
  localStorage.setItem("cv_cart", JSON.stringify(cart));
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const next = (cart[id] || 0) + delta;
  if (next <= 0) delete cart[id];
  else cart[id] = next;
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function fmtPrice(p) {
  return p == null ? "POA" : `R${p}`;
}

function enquiryHref(p) {
  const subject = encodeURIComponent(`Enquiry: ${p.name}`);
  const body = encodeURIComponent(`Hi Cannavapesa,\n\nI'd like to enquire about ${p.name} (${p.note}).\n\nPlease send pricing and availability.\n\nThanks`);
  return `mailto:${ORDERS_EMAIL}?subject=${subject}&body=${body}`;
}

function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = productById(Number(id));
    return sum + (p && p.price != null ? p.price * qty : 0);
  }, 0);
}

// ------------------------------------------------------------
// Product card rendering
// ------------------------------------------------------------
function productCardHTML(p) {
  const actionButton = p.price == null
    ? `<a class="add-button" href="${enquiryHref(p)}">Enquire <i data-lucide="mail"></i></a>`
    : `<button class="add-button" data-add="${p.id}">Add to bag <i data-lucide="plus"></i></button>`;
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="product-category">${p.category}</span>
        <button class="quick-button" data-quick="${p.id}">Quick view</button>
      </div>
      <div class="product-info">
        <div>
          <h3>${p.name}</h3>
          <p class="product-note">${p.note}</p>
        </div>
        <span class="product-price">${fmtPrice(p.price)}</span>
      </div>
      ${actionButton}
    </article>
  `;
}

function renderFeatured() {
  const el = document.getElementById("featured-grid");
  el.innerHTML = products.slice(0, 3).map(productCardHTML).join("");
  icons();
}

// ------------------------------------------------------------
// Menu view: filter + search
// ------------------------------------------------------------
let menuFilter = "All";
let menuSearch = "";

function renderFilterPills() {
  const el = document.getElementById("filter-pills");
  el.innerHTML = ["All", "Vape", "Flower", "Artisan Smkz"]
    .map((x) => `<button class="pill ${x === menuFilter ? "active" : ""}" data-filter="${x}">${x}</button>`)
    .join("");
}

function renderMenu() {
  const q = menuSearch.trim().toLowerCase();
  const visible = products.filter((p) => {
    const matchesFilter = menuFilter === "All" || p.category === menuFilter;
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.note.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
  document.getElementById("menu-count").textContent = `${visible.length} product${visible.length === 1 ? "" : "s"}`;
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = visible.map(productCardHTML).join("");
  document.getElementById("menu-empty").hidden = visible.length !== 0;
  document.getElementById("artisan-banner").hidden = menuFilter !== "Artisan Smkz";
  icons();
}

// ------------------------------------------------------------
// Quick view modal
// ------------------------------------------------------------
const quickView = document.getElementById("quick-view");
let quickViewProduct = null;

function openQuickView(id) {
  const p = productById(id);
  if (!p) return;
  quickViewProduct = p;
  document.getElementById("qv-image").src = p.image;
  document.getElementById("qv-image").alt = p.name;
  document.getElementById("qv-category").textContent = p.category;
  document.getElementById("qv-name").textContent = p.name;
  document.getElementById("qv-note").textContent = `${p.note}. A considered cultivar selected for a clean, memorable session.`;
  document.getElementById("qv-price").textContent = fmtPrice(p.price);
  const qvAdd = document.getElementById("qv-add");
  if (p.price == null) {
    qvAdd.dataset.enquireHref = enquiryHref(p);
    qvAdd.removeAttribute("data-cart-mode");
    qvAdd.innerHTML = `Enquire <i data-lucide="mail"></i>`;
  } else {
    delete qvAdd.dataset.enquireHref;
    qvAdd.setAttribute("data-cart-mode", "1");
    qvAdd.innerHTML = `Add to cart <i data-lucide="plus"></i>`;
  }
  quickView.hidden = false;
  icons();
}

function closeQuickView() {
  quickView.hidden = true;
  quickViewProduct = null;
}

document.getElementById("qv-add").addEventListener("click", (e) => {
  const isCartMode = e.currentTarget.getAttribute("data-cart-mode") === "1";
  if (isCartMode && quickViewProduct) {
    addToCart(quickViewProduct.id);
    closeQuickView();
    openCart();
  } else if (e.currentTarget.dataset.enquireHref) {
    window.location.href = e.currentTarget.dataset.enquireHref;
  }
});

// ------------------------------------------------------------
// Cart drawer
// ------------------------------------------------------------
const cartDrawer = document.getElementById("cart-drawer");

function openCart() {
  cartDrawer.hidden = false;
  renderCart();
}

function closeCart() {
  cartDrawer.hidden = true;
}

function renderCart() {
  const count = cartCount();
  const countBadge = document.getElementById("cart-count");
  countBadge.hidden = count === 0;
  countBadge.textContent = String(count);
  document.getElementById("drawer-count").textContent = `(${count})`;

  const items = Object.entries(cart)
    .map(([id, qty]) => ({ ...productById(Number(id)), qty }))
    .filter((p) => p.id);

  const itemsEl = document.getElementById("drawer-items");
  const emptyEl = document.getElementById("drawer-empty");
  const footerEl = document.getElementById("drawer-footer");

  if (items.length === 0) {
    itemsEl.innerHTML = "";
    itemsEl.hidden = true;
    emptyEl.hidden = false;
    footerEl.hidden = true;
  } else {
    itemsEl.hidden = false;
    emptyEl.hidden = true;
    footerEl.hidden = false;
    itemsEl.innerHTML = items
      .map(
        (p) => `
      <div class="drawer-item">
        <img src="${p.image}" alt="" />
        <div class="drawer-item-body">
          <div class="drawer-item-top">
            <span>${p.name}</span>
            <span class="price">R${p.price * p.qty}</span>
          </div>
          <p class="drawer-item-cat">${p.category}</p>
          <div class="qty-row">
            <button class="quantity" data-qty-down="${p.id}"><i data-lucide="minus"></i></button>
            <span class="qty-value">${p.qty}</span>
            <button class="quantity" data-qty-up="${p.id}"><i data-lucide="plus"></i></button>
            <button class="drawer-remove" data-remove="${p.id}">Remove</button>
          </div>
        </div>
      </div>`
      )
      .join("");

    const subtotal = cartSubtotal();
    document.getElementById("drawer-subtotal-amount").textContent = `R${subtotal}`;
    const pct = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
    document.getElementById("delivery-fill").style.width = `${pct}%`;
    document.getElementById("delivery-note").textContent =
      subtotal >= FREE_DELIVERY_THRESHOLD
        ? "You qualify for free discreet delivery."
        : `Add R${FREE_DELIVERY_THRESHOLD - subtotal} for free discreet delivery.`;
  }
  icons();
}

// ------------------------------------------------------------
// Checkout
// ------------------------------------------------------------
const checkoutModal = document.getElementById("checkout-modal");
const checkoutForm = document.getElementById("checkout-form");
const checkoutSuccess = document.getElementById("checkout-success");

function openCheckout() {
  if (cartCount() === 0) return;
  document.getElementById("checkout-total").textContent = `R${cartSubtotal()}`;
  checkoutForm.hidden = false;
  checkoutSuccess.hidden = true;
  checkoutModal.hidden = false;
}

function closeCheckout() {
  checkoutModal.hidden = true;
}

function fieldGroup(input) {
  return input.closest(".field-group");
}

function validateField(input) {
  const group = fieldGroup(input);
  const valid = input.checkValidity();
  group.classList.toggle("error", !valid);
  input.classList.add("touched");
  return valid;
}

checkoutForm.querySelectorAll(".field").forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => {
    if (input.classList.contains("touched")) validateField(input);
  });
});

function buildWhatsAppMessage(details) {
  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const p = productById(Number(id));
      return p ? `• ${p.name} x${qty} — R${p.price * qty}` : "";
    })
    .filter(Boolean)
    .join("\n");

  const subtotal = cartSubtotal();

  return [
    "New Cannavapesa order",
    "",
    items,
    "",
    `Subtotal: R${subtotal}`,
    "",
    `Name: ${details.name}`,
    `Mobile: ${details.phone}`,
    `Address: ${details.address}`,
    `City: ${details.city}`,
    `Postal code: ${details.postal}`,
    "",
    "Payment: on delivery",
  ].join("\n");
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = Array.from(checkoutForm.querySelectorAll(".field"));
  const allValid = inputs.map(validateField).every(Boolean);
  if (!allValid) {
    inputs.find((i) => !i.checkValidity())?.focus();
    return;
  }

  const details = {
    name: document.getElementById("cf-name").value.trim(),
    phone: document.getElementById("cf-phone").value.trim(),
    address: document.getElementById("cf-address").value.trim(),
    city: document.getElementById("cf-city").value.trim(),
    postal: document.getElementById("cf-postal").value.trim(),
  };

  const message = buildWhatsAppMessage(details);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");

  checkoutForm.hidden = true;
  checkoutSuccess.hidden = false;
});

document.getElementById("checkout-continue").addEventListener("click", () => {
  closeCheckout();
  closeCart();
  cart = {};
  saveCart();
  renderCart();
  checkoutForm.reset();
  checkoutForm.querySelectorAll(".field-group").forEach((g) => g.classList.remove("error"));
  checkoutForm.querySelectorAll(".field").forEach((i) => i.classList.remove("touched"));
});

// ------------------------------------------------------------
// View routing (hash based: #/, #menu, #ethos)
// ------------------------------------------------------------
const views = { home: "view-home", menu: "view-menu", ethos: "view-ethos" };

function navigate(view) {
  window.location.hash = view === "home" ? "/" : view;
}

function renderView() {
  const hash = window.location.hash.replace("#", "").replace("/", "") || "home";
  const view = views[hash] ? hash : "home";
  Object.entries(views).forEach(([key, id]) => {
    document.getElementById(id).hidden = key !== view;
  });
  document.getElementById("mobile-nav").hidden = true;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  if (view === "menu") renderMenu();
  icons();
}

window.addEventListener("hashchange", renderView);

// ------------------------------------------------------------
// Wire up static controls (event delegation for dynamic content)
// ------------------------------------------------------------
function initControls() {
  document.body.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) {
      e.preventDefault();
      navigate(nav.dataset.nav);
    }

    const add = e.target.closest("[data-add]");
    if (add) addToCart(Number(add.dataset.add));

    const quick = e.target.closest("[data-quick]");
    if (quick) openQuickView(Number(quick.dataset.quick));

    const qtyUp = e.target.closest("[data-qty-up]");
    if (qtyUp) changeQty(Number(qtyUp.dataset.qtyUp), 1);

    const qtyDown = e.target.closest("[data-qty-down]");
    if (qtyDown) changeQty(Number(qtyDown.dataset.qtyDown), -1);

    const remove = e.target.closest("[data-remove]");
    if (remove) removeFromCart(Number(remove.dataset.remove));

    if (e.target.closest("[data-close-modal]")) closeQuickView();
    if (e.target.closest("[data-close-cart]")) closeCart();
    if (e.target.closest("[data-close-checkout]")) closeCheckout();
    if (e.target.id === "cart-toggle") openCart();
    if (e.target.closest("#cart-toggle")) openCart();
    if (e.target.id === "checkout-open") openCheckout();
  });

  document.getElementById("mobile-nav-toggle").addEventListener("click", () => {
    const nav = document.getElementById("mobile-nav");
    nav.hidden = !nav.hidden;
  });

  document.getElementById("menu-search").addEventListener("input", (e) => {
    menuSearch = e.target.value;
    renderMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeQuickView();
    closeCart();
    closeCheckout();
  });

  document.body.addEventListener("click", (e) => {
    const pill = e.target.closest("[data-filter]");
    if (pill) {
      menuFilter = pill.dataset.filter;
      renderFilterPills();
      renderMenu();
    }
  });
}

// ------------------------------------------------------------
// Init
// ------------------------------------------------------------
function init() {
  initAgeGate();
  initControls();
  renderFeatured();
  renderFilterPills();
  renderCart();
  renderView();
  icons();
}

document.addEventListener("DOMContentLoaded", init);
