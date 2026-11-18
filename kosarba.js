document.addEventListener('DOMContentLoaded', () => {
    const cartwindow = document.getElementById('cartwindow');
    const quantityInput = document.getElementById('quantityInput');
    const confirmBtn = document.getElementById('btnConfirmAddToCart');

    document.querySelectorAll('.btn-wine-cart').forEach(btn => {
        btn.onclick = e => {
            e.preventDefault();
            const card = btn.closest('.wine-card');
            
            document.getElementById('windowWineImg').src = card.querySelector('.bottle-img').src;
            document.getElementById('windowWineTitle').textContent = card.querySelector('.wine-title').textContent.trim();
            document.getElementById('windowWineVintage').textContent = card.querySelector('.wine-vintage').textContent.trim();
            document.getElementById('windowWinePrice').textContent = card.querySelector('.wine-price').textContent.trim();

            quantityInput.value = 1;
            cartwindow.classList.add('active');
        };
    });

    const closeWindow = () => cartwindow.classList.remove('active');
    document.getElementById('windowCloseBtn').onclick = closeWindow;
    document.getElementById('quantityMinus').onclick = () => quantityInput.value = Math.max(1, +quantityInput.value - 1);
    document.getElementById('quantityPlus').onclick = () => quantityInput.value = +quantityInput.value + 1;

    const updateHeaderCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        const span = document.querySelector('.header-cart span, #headerCartCount');
        if (span) span.textContent = `Kosár (${total})`;
    };

    confirmBtn.onclick = function () {
        const item = {
            name: document.getElementById('windowWineTitle').textContent,
            vintage: document.getElementById('windowWineVintage').textContent,
            price: document.getElementById('windowWinePrice').textContent,
            imgSrc: document.getElementById('windowWineImg').src,
            quantity: +quantityInput.value || 1
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(w => w.name === item.name && w.vintage === item.vintage);
        existing ? (existing.quantity += item.quantity) : cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateHeaderCount();

        this.innerHTML = '<i class="fa-solid fa-check"></i> Hozzáadva!';
        this.style.backgroundColor = '#2e7d32';

        setTimeout(() => {
            closeWindow();
            this.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Kosárba';
            this.style.backgroundColor = '#5c1d24';}, 800);
    };

    updateHeaderCount();
});



 document.addEventListener('DOMContentLoaded', () => {
            const cartwindow = document.getElementById('cartwindow');
            const qtyInput = document.getElementById('quantityInput');
            const confirmBtn = document.getElementById('btnConfirmAddToCart');
            const detailCartBtn = document.querySelector('.btn-add-to-cart');
            
            if (detailCartBtn) {
                detailCartBtn.onclick = e => {
                    e.preventDefault();

                    document.getElementById('windowWineImg').src = document.querySelector('.product-gallery img').src;
                    document.getElementById('windowWineTitle').textContent = document.querySelector('.product-title').textContent.trim();
                    document.getElementById('windowWineVintage').textContent = document.querySelector('.product-meta-quick .item').textContent.trim();
                    document.getElementById('windowWinePrice').textContent = document.querySelector('.product-price').textContent.trim();

                    qtyInput.value = 1;
                    cartwindow.classList.add('active');
                };
            }

            const closeWindow = () => cartwindow.classList.remove('active');
            document.getElementById('windowCloseBtn').onclick = closeWindow;
            document.getElementById('quantityMinus').onclick = () => qtyInput.value = Math.max(1, +qtyInput.value - 1);
            document.getElementById('quantityPlus').onclick = () => qtyInput.value = +qtyInput.value + 1;

            const updateHeaderCount = () => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const total = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
                const span = document.querySelector('.header-cart span, #headerCartCount');
                if (span) span.textContent = `Kosár (${total})`;
            };

            confirmBtn.onclick = function () {
                const item = {
                    name: document.getElementById('windowWineTitle').textContent,
                    vintage: document.getElementById('windowWineVintage').textContent,
                    price: document.getElementById('windowWinePrice').textContent,
                    imgSrc: document.getElementById('windowWineImg').src,
                    quantity: +qtyInput.value || 1
                };

                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existing = cart.find(w => w.name === item.name && w.vintage === item.vintage);
                existing ? (existing.quantity += item.quantity) : cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateHeaderCount();

                this.innerHTML = '<i class="fa-solid fa-check"></i> Hozzáadva!';
                this.style.backgroundColor = '#2e7d32';

                setTimeout(() => {
                    closeWindow();
                    this.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Kosárba';
                    this.style.backgroundColor = '#5c1d24';
                }, 800);
            };

            updateHeaderCount();
            window.addEventListener('storage', e => {
                if (e.key === 'cart') updateHeaderCount();
            });
        });