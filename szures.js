document.addEventListener('DOMContentLoaded', () => {
            const filterForm = document.getElementById('wineFilterForm');
            const productsGrid = document.getElementById('productsGrid');
            const resultsCount = document.getElementById('resultsCount');
            const sortSelect = document.getElementById('sort-select');

            resultsCount.textContent = productsGrid.querySelectorAll('.wine-card').length;

            filterForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(filterForm);
                const queryParams = new URLSearchParams(formData).toString();

                try {
                    const response = await fetch(`szures.php?${queryParams}`);
                    const wines = await response.json();

                    if (wines.error) {
                        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #5c1d24; padding: 30px;">${wines.error}</p>`;
                        resultsCount.textContent = 0;
                        return;
                    }

                    resultsCount.textContent = wines.length;

                    if (wines.length === 0) {
                        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px 0;">Nincs a megadott feltételeknek megfelelő bor.</p>';
                        return;
                    }

                    productsGrid.innerHTML = wines.map(wine => `
                        <article class="wine-card">
                            <div class="wine-card-media">
                                <span class="wine-badge ${wine.fajta}">${wine.fajta_megnevezes}</span>
                                <img src="${wine.kep_utvonal}" alt="${wine.nev}" class="bottle-img">
                            </div>
                            <div class="wine-card-body">
                                <h2 class="wine-title">${wine.nev}</h2> 
                                <span class="wine-vintage">${wine.evjarat}</span>
                                <div class="wine-price">${Number(wine.ar).toLocaleString('hu-HU')} Ft</div>
                                <div class="wine-card-actions">
                                    <a href="${wine.reszletek_url}" class="btn-wine-details">Részletek</a>
                                    <button type="button" class="btn-wine-cart">
                                        <i class="fa-solid fa-cart-shopping"></i> Kosárba
                                    </button>
                                </div>
                            </div>
                        </article>
                    `).join('');

                    sortSelect.value = 'default';
                } catch (err) {
                    console.error('Hiba a szűrés során:', err);
                }
            });

            productsGrid.addEventListener('click', (e) => {
                const cartBtn = e.target.closest('.btn-wine-cart');
                if (!cartBtn) return;

                const card = cartBtn.closest('.wine-card');
                document.getElementById('windowWineImg').src = card.querySelector('.bottle-img').src;
                document.getElementById('windowWineTitle').textContent = card.querySelector('.wine-title').textContent.trim();
                document.getElementById('windowWineVintage').textContent = card.querySelector('.wine-vintage').textContent.trim();
                document.getElementById('windowWinePrice').textContent = card.querySelector('.wine-price').textContent.trim();
                document.getElementById('quantityInput').value = 1;
                document.getElementById('cartwindow').classList.add('active');
            });

            sortSelect.addEventListener('change', function () {
                const cards = Array.from(productsGrid.querySelectorAll('.wine-card'));
                const type = this.value;
                if (type === 'default') return;

                const getPrice = card => parseInt(card.querySelector('.wine-price').textContent.replace(/[^0-9]/g, ''));
                cards.sort((a, b) => type === 'price-asc' ? getPrice(a) - getPrice(b) : getPrice(b) - getPrice(a));
                cards.forEach(card => productsGrid.appendChild(card));
            });
        });