// ===== CARGAR DATOS DE LA COMPRA =====
let orderData = null;

function loadOrderData() {
    const saved = localStorage.getItem('urban_order');
    if (saved) {
        orderData = JSON.parse(saved);
    }
}

// ===== RENDERIZAR DETALLES DE LA COMPRA =====
function renderOrderDetails() {
    if (!orderData) {
        document.querySelector('.success-panel').innerHTML = `
            <div style="text-align:center; padding:3rem;">
                <p style="color:#777; margin-bottom:2rem;">No hay datos de compra. <a href="index.html" style="color:#111; text-decoration:underline;">Volver a la tienda</a></p>
            </div>
        `;
        return;
    }

    // Número de pedido
    document.getElementById('orderNum').textContent = orderData.orderNumber;
    
    // Email
    document.getElementById('emailDisplay').textContent = orderData.email;

    // Items
    const itemsDiv = document.querySelector('.order-details');
    const itemsHtml = orderData.items.map(item => `
        <div class="success-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="success-item-info">
                <h4>${item.name}</h4>
                <p>${item.brand}</p>
                <p class="success-item-qty">Cantidad: ${item.quantity}</p>
            </div>
            <div class="success-item-price">
                $${(item.price * item.quantity).toLocaleString()}
            </div>
        </div>
    `).join('');

    itemsDiv.innerHTML = `
        <h3>Detalles del pedido</h3>
        ${itemsHtml}
        <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid #e8e8e8; text-align:right;">
            <p style="color:#777; margin-bottom:0.5rem;">Subtotal:</p>
            <p style="font-size:0.95rem;">$${(orderData.total).toLocaleString()}</p>
            <p style="color:#777; margin-top:0.5rem; margin-bottom:0.5rem;">IVA (16%):</p>
            <p style="font-size:0.95rem;">$${(orderData.iva).toLocaleString()}</p>
            <p style="color:#111; margin-top:1rem; font-weight:500;">Total pagado:</p>
            <p style="font-size:1.4rem; font-weight:500;" id="successTotal">$${((orderData.total + orderData.iva)).toLocaleString()}</p>
        </div>
    `;
}

// ===== DESCARGAR RECIBO (SIMULADO) =====
function downloadInvoice() {
    if (!orderData) return;

    const invoiceText = `
RECIBO DE COMPRA - URBAN MODE
=====================================

Número de Pedido: ${orderData.orderNumber}
Fecha: ${new Date(orderData.timestamp).toLocaleString('es-MX')}

DATOS DEL CLIENTE
Nombre: ${orderData.fullName}
Email: ${orderData.email}

DETALLES DEL PEDIDO
${orderData.items.map(item => `
${item.name}
Marca: ${item.brand}
Cantidad: ${item.quantity}
Precio unitario: $${item.price.toLocaleString()}
Subtotal: $${(item.price * item.quantity).toLocaleString()}
`).join('\n---\n')}

RESUMEN FINANCIERO
Subtotal: $${orderData.total.toLocaleString()}
IVA (16%): $${orderData.iva.toLocaleString()}
TOTAL: $${(orderData.total + orderData.iva).toLocaleString()}

Método de Pago: ${orderData.paymentMethod.toUpperCase()}

=====================================
¡Gracias por tu compra!
www.urbanmode.com
`;

    // Crear blob y descargar
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceText));
    element.setAttribute('download', `recibo-${orderData.orderNumber}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    loadOrderData();
    renderOrderDetails();

    // Limpiar localStorage después de un tiempo (opcional)
    // setTimeout(() => {
    //     localStorage.removeItem('urban_order');
    // }, 3600000); // 1 hora
});
