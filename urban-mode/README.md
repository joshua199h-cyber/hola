# 🛍️ URBAN MODE - Tienda Online Completa

## 📁 Estructura del Proyecto

```
urban-mode/
├── index.html          ← ABRE ESTE ARCHIVO EN VS CODE
├── checkout.html       
├── success.html        
├── css/
│   ├── styles.css      (Estilos principales)
│   ├── checkout.css    (Estilos del checkout)
│   └── success.css     (Estilos de éxito)
├── js/
│   ├── app.js          (Lógica tienda principal)
│   ├── checkout.js     (Lógica del formulario)
│   └── success.js      (Lógica confirmación)
└── README.md           (Este archivo)
```

---

## 🚀 Cómo Usar en Visual Studio Code

### Opción 1: Live Server (Recomendado)

1. **Abre VS Code**
2. **Abre la carpeta `urban-mode`** (File → Open Folder)
3. **Instala Live Server** si no lo tienes:
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "Live Server"
   - Click en Install

4. **Ejecuta Live Server**:
   - Click derecho en `index.html`
   - Selecciona "Open with Live Server"
   - ¡Se abrirá automáticamente en tu navegador! 🎉

### Opción 2: Sin Extension

1. **Abre VS Code**
2. **Abre Terminal** (Ctrl+`)
3. **Escribe**:
   ```bash
   python -m http.server 8000
   ```
4. **Abre navegador** en: `http://localhost:8000`

---

## 📝 Archivos Principales

| Archivo | Qué hace |
|---------|----------|
| `index.html` | Página principal con productos |
| `checkout.html` | Carrito y formulario de pago |
| `success.html` | Confirmación de compra |
| `css/styles.css` | Todos los estilos principales |
| `js/app.js` | Productos, carrito, navegación |

---

## ✨ Funcionalidades

✅ **Tienda Completa**
- 12 productos (Hombre, Mujer, Ofertas)
- Carrito funcional
- Precios con IVA

✅ **Navegación**
- `index.html` → Tienda principal
- Agregar al carrito (guarda en localStorage)
- `checkout.html` → Formulario de pago
- `success.html` → Confirmación

✅ **Datos Persistentes**
- El carrito se guarda automáticamente
- No se pierden al recargar la página
- Se borran cuando haces una compra

✅ **Responsive**
- Funciona en móvil, tablet y desktop

---

## 🎯 Flujo de Compra

```
1. index.html
   ↓ (Agregar productos al carrito)
2. Modal carrito
   ↓ (Click en "Ir al Checkout")
3. checkout.html
   ↓ (Completar formulario)
4. success.html
   ↓ (Ver pedido y descargar recibo)
```

---

## 💰 Personalización

### Cambiar Precio de Productos

Abre `js/app.js` y busca:

```javascript
const productsHombre = [
    {
        name: 'Camiseta Premium',
        price: 450,  // ← Cambiar aquí
        ...
    }
]
```

### Cambiar Impuestos

En `js/checkout.js`:

```javascript
const iva = Math.floor(subtotal * 0.16); // 0.16 = 16%
// Cambia 0.16 por tu porcentaje
```

### Cambiar Colores

En `css/styles.css`:

```css
:root {
    --color-accent: #000000;  ← Color principal
    --color-text: #1a1a1a;    ← Texto
    --color-bg: #ffffff;      ← Fondo
}
```

---

## 🔧 Editando en VS Code

**Todos los archivos están listos para editar:**

- **HTML**: Agregar más productos o secciones
- **CSS**: Cambiar estilos y colores
- **JS**: Modificar precios, lógica, textos

**Hot Reload**: Live Server actualiza automáticamente al guardar (Ctrl+S)

---

## 📱 Testing

1. **Desktop**: Prueba en navegador normal
2. **Móvil**: Press F12 → Click Device Toolbar
3. **Carrito**: Agrega productos y verifica que aparezcan
4. **Checkout**: Completa el formulario
5. **Confirmación**: Verifica número de pedido

---

## 🎨 Lo que Puedes Hacer

✏️ **Editar Productos** en `js/app.js`
✏️ **Cambiar Colores** en `css/styles.css`
✏️ **Modificar Textos** en los .html
✏️ **Agregar Más Secciones** en `index.html`
✏️ **Cambiar Logos** editando en `<div class="logo">URBAN MODE</div>`

---

## ⚠️ Notas Importantes

- Los datos se guardan en **localStorage** del navegador
- Si limpias el historial, se pierden los datos
- Las imágenes usan URLs de internet (requieren conexión)
- No es un carrito real, es una demo educativa

---

## 🆘 Si Algo No Funciona

1. **Abre la consola** (F12)
2. **Busca errores rojos**
3. **Verifica que todos los archivos estén en sus carpetas**
4. **Recarga la página** (Ctrl+R)

---

## 📞 Atajos Útiles en VS Code

| Atajo | Qué hace |
|-------|----------|
| Ctrl+S | Guardar |
| Ctrl+` | Abrir Terminal |
| Alt+L + Alt+O | Abrir con Live Server |
| F12 | Inspector de elementos |
| Ctrl+F | Buscar en archivo |

---

**¡Listo para vender! 🎉**

Cualquier duda, revisa los comentarios en el código (comienzan con `//`)
