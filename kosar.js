document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('cartTableBody');
    const emptyMsg = document.getElementById('emptyCartMsg');
    const contentCard = document.getElementById('cartContentCard');
    const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
    
    const saveAndRender = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        const headerSpan = document.querySelector('.header-cart span, #headerCartCount');
        if (headerSpan) headerSpan.textContent = `Kosár (${total})`;
        renderCart();
    };

    const renderCart = () => {
        const cart = getCart();
        const isEmpty = cart.length === 0;
        contentCard.style.display = isEmpty ? 'none' : 'block';
        emptyMsg.style.display = isEmpty ? 'block' : 'none';
        if (isEmpty) return;

        let subtotal = 0;
        tableBody.innerHTML = cart.map((item, i) => {
            const price = parseFloat(item.price.replace(/[^0-9]/g, '')) || 0;
            const total = price * item.quantity;
            subtotal += total;

            return `
                <tr>
                    <td class="col-product">
                        <div class="cart-product-cell">
                            <img src="${item.imgSrc}" alt="${item.name}" class="cart-product-img">
                            <div class="cart-product-info">
                                <span class="cart-product-name">${item.name}</span>
                                <span class="cart-product-vintage"><i class="fa-solid fa-wine-glass"></i> ${item.vintage}</span>
                            </div>
                        </div>
                    </td>
                    <td class="col-quantity">
                        <div class="cart-table-quantity-picker">
                            <button type="button" data-action="dec" data-index="${i}"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" value="${item.quantity}" readonly>
                            <button type="button" data-action="inc" data-index="${i}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </td>
                    <td class="col-price"><span class="cart-price-text">${item.price}</span></td>
                    <td class="col-total"><span class="cart-total-text">${total.toLocaleString('hu-HU')} Ft</span></td>
                    <td class="col-action">
                        <button type="button" class="btn-delete-item" data-action="del" data-index="${i}" title="Tétel törlése">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </td>
                </tr>`;
        }).join('');

        const formattedSubtotal = `${subtotal.toLocaleString('hu-HU')} Ft`;
        document.getElementById('cartSubtotal').textContent = formattedSubtotal;
        document.getElementById('cartGrandTotal').textContent = formattedSubtotal;
    };

    tableBody.onclick = (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const cart = getCart();
        const idx = +btn.dataset.index;
        const action = btn.dataset.action;

        if (action === 'inc') cart[idx].quantity++;
        else if (action === 'dec' && cart[idx].quantity > 1) cart[idx].quantity--;
        else if (action === 'del') cart.splice(idx, 1);

        saveAndRender(cart);
    };

    const clearBtn = document.getElementById('btnClearCart');
    if (clearBtn) clearBtn.onclick = () => saveAndRender([]);

    const checkoutBtn = document.getElementById('btnCheckout');
    if (checkoutBtn) checkoutBtn.onclick = () => alert('A pénztár funkció fejlesztés alatt áll.');

    saveAndRender(getCart());
});