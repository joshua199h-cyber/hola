// ===== PRODUCTOS DATA =====
const productsHombre = [
    {
        id: 1,
        name: 'Camiseta Premium',
        brand: 'URBAN MODE',
        price: 450,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        isNew: false
    },
    {
        id: 2,
        name: 'Pantalón Slim',
        brand: 'URBAN MODE',
        price: 750,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop',
        isNew: false
    },
    {
        id: 3,
        name: 'Chaqueta Denim',
        brand: 'URBAN MODE',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop',
        isNew: true
    },
    {
        id: 4,
        name: 'Sudadera Básica',
        brand: 'URBAN MODE',
        price: 650,
        image: 'https://images.unsplash.com/photo-1556821552-5e41911c3352?w=400&h=500&fit=crop',
        isNew: false
    }
];

const productsMujer = [
    {
        id: 5,
        name: 'Top Elegante',
        brand: 'URBAN MODE',
        price: 520,
        image: 'https://images.unsplash.com/photo-1520689519102-d9b0b6de2e70?w=400&h=500&fit=crop',
        isNew: false
    },
    {
        id: 6,
        name: 'Falda Midi',
        brand: 'URBAN MODE',
        price: 890,
        image: 'https://images.unsplash.com/photo-1612336307503-0ca684e48b19?w=400&h=500&fit=crop',
        isNew: false
    },
    {
        id: 7,
        name: 'Vestido Casual',
        brand: 'URBAN MODE',
        price: 1100,
        image: 'https://images.unsplash.com/photo-1595777712802-46bfe2d7e69f?w=400&h=500&fit=crop',
        isNew: true
    },
    {
        id: 8,
        name: 'Chaqueta Blazer',
        brand: 'URBAN MODE',
        price: 1350,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop',
        isNew: false
    }
];

const productsOfertas = [
    {
        id: 9,
        name: 'Pack 2 Camisetas',
        brand: 'TECH',
        price: 699,
        image: 'https://images.unsplash.com/photo-1527215303615-f4e1b65ce2d2?w=400&h=500&fit=crop',
        isNew: true
    },
    {
        id: 10,
        name: 'Accesorios Pack',
        brand: 'BRAND',
        price: 449,
        image: 'https://images.unsplash.com/photo-1555611523-67949e6bec75?w=400&h=500&fit=crop',
        isNew: true
    },
    {
        id: 11,
        name: 'Combo Zapatos',
        brand: 'BRAND',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
        isNew: true
    },
    {
        id: 12,
        name: 'Bolsa de Cuero',
        brand: 'BRAND',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
        isNew: true
    }
];

// ===== CARRITO GLOBAL =====
let cart = [];
let cartCount = 0;
// ===== FAVORITOS GLOBAL =====
let favorites = [];

// ===== GUARDAR Y CARGAR CARRITO DEL LOCAL STORAGE =====
function saveCart() {
    localStorage.setItem('urban_cart', JSON.stringify(cart));
}

function saveFavorites() {
    localStorage.setItem('urban_favs', JSON.stringify(favorites));
}

function loadCart() {
    const saved = localStorage.getItem('urban_cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

function loadFavorites() {
    const saved = localStorage.getItem('urban_favs');
    if (saved) {
        try {
            favorites = JSON.parse(saved);
        } catch (e) {
            favorites = [];
        }
    }
}

// ===== RENDERIZAR PRODUCTOS =====
function renderProductsCategory(products, gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.isNew ? '<div class="product-badge">NUEVO</div>' : ''}
                <button class="product-fav" data-product-id="${product.id}" onclick="addToFavorites(${product.id})" aria-label="Favoritos">${favorites.includes(product.id) ? '♥' : '♡'}</button>
            </div>
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toLocaleString()}</p>
                <div style="display:flex; gap:0.5rem; flex-direction:column;">
                    <button class="product-btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    <button class="view3d-btn" data-model="models/product-${product.id}.glb" data-poster="${product.image}" onclick="open3DViewer(this.dataset.model, this.dataset.poster, '${product.name.replace(/'/g, "\\'")}')">Ver en 3D</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    revealOnScroll();
}

function isFavorite(productId) {
    return favorites.includes(productId);
}

function addToFavorites(productId) {
    const id = parseInt(productId, 10);
    if (isFavorite(id)) {
        favorites = favorites.filter(i => i !== id);
        showNotification('Eliminado de favoritos');
    } else {
        favorites.push(id);
        showNotification('Añadido a favoritos');
    }
    saveFavorites();
    updateFavoritesModal();
    updateProductFavButtons();
}

function updateFavoritesModal() {
    const itemsDiv = document.getElementById('favoritesItems');
    const emptyDiv = document.getElementById('favoritesEmpty');
    if (!itemsDiv || !emptyDiv) return;

    const allProducts = [...productsHombre, ...productsMujer, ...productsOfertas];

    if (favorites.length === 0) {
        itemsDiv.innerHTML = '';
        emptyDiv.style.display = 'block';
        return;
    }

    emptyDiv.style.display = 'none';

    itemsDiv.innerHTML = favorites.map(id => {
        const p = allProducts.find(x => x.id === id);
        if (!p) return '';
        return `
            <div class="fav-item">
                <div class="fav-item-info">
                    <h4>${p.name}</h4>
                    <p>${p.brand}</p>
                </div>
                <div class="fav-actions">
                    <button class="product-btn" onclick="addToCart(${p.id})">Agregar</button>
                    <button class="cart-item-remove" onclick="addToFavorites(${p.id})">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateProductFavButtons() {
    document.querySelectorAll('.product-fav').forEach(btn => {
        const id = parseInt(btn.dataset.productId, 10);
        if (isFavorite(id)) {
            btn.classList.add('active');
            btn.textContent = '♥';
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.textContent = '♡';
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

// ===== AGREGAR AL CARRITO =====
function addToCart(productId) {
    const allProducts = [...productsHombre, ...productsMujer, ...productsOfertas];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    updateCartModal();
    
    // Mostrar confirmación breve
    showNotification(`${product.name} agregado al carrito`);
}

// ===== ACTUALIZAR CONTADOR DEL CARRITO =====
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
    cartCount = totalItems;
}

// ===== ACTUALIZAR MODAL DEL CARRITO =====
function updateCartModal() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartEmptyDiv = document.getElementById('cartEmpty');
    const cartTotalDiv = document.getElementById('cartTotal');
    const totalPriceSpan = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '';
        cartEmptyDiv.style.display = 'block';
        cartTotalDiv.style.display = 'none';
        return;
    }

    cartEmptyDiv.style.display = 'none';
    cartTotalDiv.style.display = 'block';

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.brand}</p>
                <div style="margin-top:0.5rem; display:flex; gap:1rem; align-items:center;">
                    <input type="number" value="${item.quantity}" min="1" style="width:50px; padding:0.4rem; border:1px solid #e8e8e8;" onchange="updateQuantity(${item.id}, this.value)">
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceSpan.textContent = `$${total.toLocaleString()}`;
}

// ===== ACTUALIZAR CANTIDAD =====
function updateQuantity(productId, newQuantity) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            updateCartModal();
        }
    }
}

// ===== ELIMINAR DEL CARRITO =====
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartModal();
    showNotification('Producto eliminado del carrito');
}

// ===== MOSTRAR NOTIFICACIÓN =====
function showNotification(message) {
    // Crear notificación temporal
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #111;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-size: 0.9rem;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// ===== TOGGLE CARRITO MODAL =====
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;

    const isOpen = modal.classList.toggle('active');

    // Evitar scroll del body cuando el modal esté abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Actualizar contenido y accesibilidad cuando se abre
    if (isOpen) {
        updateCartModal();
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }
}

// ===== IR AL CHECKOUT =====
function goToCheckout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    window.location.href = 'checkout.html';
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`¡Gracias por suscribirse! Confirmaremos tu email en ${email}`);
    e.target.reset();
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// ===== MENU MOBILE =====
function toggleMenu() {
    document.querySelector('.nav').classList.toggle('active');
}

// ===== SCROLL A PRODUCTOS =====
function scrollToProducts() {
    document.getElementById('seccion-hombre').scrollIntoView({ behavior: 'smooth' });
}

// ===== UTILIDADES (PLACEHOLDER) =====
function toggleSearch() {
    let overlay = document.getElementById('searchOverlay');

    // Crear overlay la primera vez
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'searchOverlay';
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-box">
                <button class="search-close" aria-label="Cerrar búsqueda">×</button>
                <input id="searchInput" type="search" placeholder="Buscar productos, marcas..." autofocus>
            </div>
        `;
        document.body.appendChild(overlay);

        // Cerrar al hacer click fuera de la caja o en el botón
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('search-close')) {
                toggleSearch();
            }
        });
    }

    const isOpen = overlay.classList.toggle('active');
    // Manejar bloqueo de scroll cuando el overlay esté activo
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
        const input = document.getElementById('searchInput');
        if (input) input.focus();
    }
}

function toggleFavorites() {
    const modal = document.getElementById('favoritesModal');
    if (!modal) return;

    const isOpen = modal.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
        updateFavoritesModal();
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadFavorites();
    renderProductsCategory(productsHombre, 'productsGridHombre');
    renderProductsCategory(productsMujer, 'productsGridMujer');
    renderProductsCategory(productsOfertas, 'productsGridOfertas');
    revealOnScroll();
    updateCartModal();
    updateFavoritesModal();
    updateProductFavButtons();

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav').classList.remove('active');
        });
    });

    // Cerrar modal al hacer click fuera
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target.id === 'cartModal') {
            toggleCart();
        }
    });

    // Cerrar favoritos al hacer click fuera
    const favModal = document.getElementById('favoritesModal');
    if (favModal) {
        favModal.addEventListener('click', (e) => {
            if (e.target.id === 'favoritesModal') toggleFavorites();
        });
    }

    // Cerrar overlays/modales con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cartModalEl = document.getElementById('cartModal');
            const searchOverlay = document.getElementById('searchOverlay');
            const favModalEl = document.getElementById('favoritesModal');
            const modelModalEl = document.getElementById('modelModal');

            if (cartModalEl && cartModalEl.classList.contains('active')) toggleCart();
            if (searchOverlay && searchOverlay.classList.contains('active')) toggleSearch();
            if (favModalEl && favModalEl.classList.contains('active')) toggleFavorites();
            if (modelModalEl && modelModalEl.classList.contains('active')) close3DViewer();
        }
    });
    
    // Cerrar modal 3D al hacer click fuera
    const modelModal = document.getElementById('modelModal');
    if (modelModal) {
        modelModal.addEventListener('click', (e) => {
            if (e.target.id === 'modelModal') close3DViewer();
        });
    }
});

/* ===== 3D VIEWER: abrir/cerrar modal e inyectar model-viewer ===== */
function open3DViewer(modelPath, posterPath = '', altText = '') {
    const modal = document.getElementById('modelModal');
    const root = document.getElementById('modelViewerRoot');
    if (!modal || !root) return;
    // limpiar contenido previo
    root.innerHTML = '';
    // inyectar
    injectModelViewer('#modelViewerRoot', modelPath, posterPath, altText);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function close3DViewer() {
    const modal = document.getElementById('modelModal');
    const root = document.getElementById('modelViewerRoot');
    if (!modal || !root) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // remover contenido para liberar memoria GPU
    root.innerHTML = '';
}

/* ===== HELPER: INYECTAR model-viewer DESDE LA PLANTILLA ===== */
function injectModelViewer(containerSelector, glbPath, posterPath = '', altText = '') {
    const tpl = document.getElementById('modelViewerTemplate');
    if (!tpl) return null;
    const clone = tpl.content.cloneNode(true);
    const mv = clone.querySelector('model-viewer');
    if (mv) {
        if (glbPath) mv.setAttribute('src', glbPath);
        if (posterPath) mv.setAttribute('poster', posterPath);
        if (altText) mv.setAttribute('alt', altText);
        const img = mv.querySelector('img[slot="fallback"]');
        if (img && posterPath) img.src = posterPath;
        if (img && altText) img.alt = altText + ' (imagen alternativa)';
    }
    const target = document.querySelector(containerSelector);
    if (target) {
        target.appendChild(clone);
        return target;
    }
    return null;
}
