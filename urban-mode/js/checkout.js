// ===== CARGAR CARRITO AL CHECKOUT =====
let checkoutCart = [];

// Detalles de cuenta para Transferencia (editar con datos reales)
const TRANSFER_DETAILS = {
    bank: 'Mercado Pago W',
    clabe: '722969028027434759',
    holder: 'Hugo Joshua Montellano Barajas'
};

function loadCheckoutCart() {
    const saved = localStorage.getItem('urban_cart');
    if (saved) {
        checkoutCart = JSON.parse(saved);
    }
}

// ===== RENDERIZAR ITEMS EN CHECKOUT =====
function renderCheckoutItems() {
    const itemsDiv = document.getElementById('checkoutItems');
    
    if (checkoutCart.length === 0) {
        itemsDiv.innerHTML = '<p style="color:#777; padding:2rem 0;">El carrito está vacío</p>';
        return;
    }

    itemsDiv.innerHTML = checkoutCart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div style="text-align:left;">
                <h3>${item.name}</h3>
                <p>${item.brand}</p>
                <p style="margin-top:0.5rem; color:#777;">Cantidad: ${item.quantity}</p>
            </div>
            <div class="summary-item-price">
                $${(item.price * item.quantity).toLocaleString()}
            </div>
        </div>
    `).join('');

    updateCheckoutTotals();
}

// ===== CALCULAR TOTALES =====
function updateCheckoutTotals() {
    const subtotal = checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // IVA no se aplica/mostrar según petición del cliente
    const iva = 0;
    const total = subtotal; // sin IVA

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toLocaleString()}`;
    // mantener el campo IVA actualizado por si se necesita, aunque está oculto
    const ivaEl = document.getElementById('checkoutIva');
    if (ivaEl) ivaEl.textContent = `$${iva.toLocaleString()}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toLocaleString()}`;
    // Si el panel de transferencia está visible, actualizar su resumen
    const transferEl = document.getElementById('transferInfo');
    if (transferEl && transferEl.style.display !== 'none') {
        populateTransferInfo();
    }
}

// ===== SELECCIONAR MÉTODO DE PAGO =====
function selectPayment(button) {
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    document.getElementById('paymentMethod').value = button.getAttribute('data-payment');
}

// Ajustar la UI según el método seleccionado
function updatePaymentUI(method) {
    const transferInfo = document.getElementById('transferInfo');
    const cardFields = document.querySelectorAll('#cardNumber, #cardName, #expiry, #cvv');

    if (method === 'transfer') {
        if (transferInfo) transferInfo.style.display = 'block';
        // rellenar con los datos actuales del formulario
        populateTransferInfo();
        cardFields.forEach(f => {
            if (f) {
                f.removeAttribute('required');
                f.closest('.checkout-field')?.classList.add('hidden-field');
            }
        });
    } else if (method === 'auto') {
        if (transferInfo) transferInfo.style.display = 'none';
        cardFields.forEach(f => {
            if (f) {
                f.setAttribute('required', 'true');
                f.closest('.checkout-field')?.classList.remove('hidden-field');
            }
        });
    } else {
        if (transferInfo) transferInfo.style.display = 'none';
        cardFields.forEach(f => {
            if (f) {
                f.setAttribute('required', 'true');
                f.closest('.checkout-field')?.classList.remove('hidden-field');
            }
        });
    }
}

// Rellena el bloque #transferInfo con datos del comprador y totales actuales
function populateTransferInfo() {
    const fullName = document.getElementById('fullName')?.value || '--';
    const email = document.getElementById('email')?.value || '--';
    const totalText = document.getElementById('checkoutTotal')?.textContent || '--';

    const summary = `Nombre: <strong>${fullName}</strong><br>Total a pagar: <strong>${totalText}</strong>`;
    const summaryEl = document.getElementById('transferSummary');
    if (summaryEl) summaryEl.innerHTML = summary;

    const clabeEl = document.getElementById('transferClabe');
    const holderEl = document.getElementById('transferHolder');
    if (clabeEl) clabeEl.textContent = TRANSFER_DETAILS.clabe;
    if (holderEl) holderEl.textContent = TRANSFER_DETAILS.holder;
}

// ===== PROCESAR CHECKOUT =====
function processCheckout(event) {
    event.preventDefault();

    if (checkoutCart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Validación básica
    if (!fullName || !email) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }

    // Generar número de pedido (simulado)
    const orderNumber = Math.floor(Math.random() * 1000000000).toString().padStart(8, '0');

    // Guardar datos de la compra en localStorage
    const orderData = {
        orderNumber: orderNumber,
        email: email,
        fullName: fullName,
        items: checkoutCart,
        total: checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        iva: 0,
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString()
    };

    // Lógica según método de pago seleccionado
    if (paymentMethod === 'transfer') {
        // marcar pedido como pendiente hasta recibir comprobante
        orderData.status = 'pending_transfer';
        localStorage.setItem('urban_order', JSON.stringify(orderData));
        localStorage.removeItem('urban_cart');
        alert('Seleccionaste Transferencia. Tu pedido quedó pendiente.');
        window.location.href = 'success.html';
        return;
    }

    if (paymentMethod === 'auto') {
        // Simular cobro automático con validación mínima de tarjeta
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!cardNumber || !cardName || !expiry || !cvv) {
            alert('Para cobro automático complete los datos de tarjeta.');
            return;
        }

        // A modo de simulación, aceptamos el pago y lo registramos como pagado
        orderData.status = 'paid';
        localStorage.setItem('urban_order', JSON.stringify(orderData));
        localStorage.removeItem('urban_cart');
        // pequeño delay para simular procesamiento
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 700);
        return;
    }

    // Métodos por defecto (credit, debit, paypal): procesado sin integración real
    orderData.status = 'paid';
    localStorage.setItem('urban_order', JSON.stringify(orderData));
    localStorage.removeItem('urban_cart');
    setTimeout(() => {
        window.location.href = 'success.html';
    }, 500);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutCart();
    renderCheckoutItems();
    
    if (checkoutCart.length === 0) {
        document.querySelector('form').innerHTML = `
            <div style="text-align:center; padding:3rem;">
                <p style="color:#777; margin-bottom:2rem;">Tu carrito está vacío. <a href="index.html" style="color:#111; text-decoration:underline;">Volver a la tienda</a></p>
            </div>
        `;
    }
    // Asegurar UI de método de pago acorde al valor inicial
    const currentMethod = document.getElementById('paymentMethod')?.value;
    if (currentMethod) updatePaymentUI(currentMethod);
});

// Escuchar cambios en selección de pago para actualizar UI
document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.payment-method');
    if (btn) {
        const method = btn.getAttribute('data-payment');
        // small timeout to allow class toggling sequence
        setTimeout(() => updatePaymentUI(method), 10);
    }
});
