/* ===== SOFTWINDOWS COMPONENTS ===== */

// ===== UTF8 → BASE64 =====
function utf8ToB64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

// ===== SVG ГЕНЕРАТОР (улучшенный) =====
function genImg(title, icon, scheme) {
    const s = scheme || 'gazebo';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#87ceeb"/><stop offset="60%" stop-color="#e8f4f8"/><stop offset="100%" stop-color="#f5f5f7"/></linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8d8a8"/><stop offset="100%" stop-color="#7ab87a"/></linearGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b8860b"/><stop offset="100%" stop-color="#8b6914"/></linearGradient>
    <linearGradient id="win" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="rgba(135,206,235,0.3)"/><stop offset="100%" stop-color="rgba(200,230,255,0.15)"/></linearGradient>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#3d3d5c"/></linearGradient>
    </defs>
    <rect width="600" height="300" fill="url(#${s==='night'?'night':'sky'})"/>
    <rect y="300" width="600" height="150" fill="url(#${s==='night'?'night':'ground'})"/>
    ${s==='night'?'<circle cx="500" cy="60" r="30" fill="rgba(255,255,200,0.8)"/><circle cx="100" cy="40" r="20" fill="rgba(255,255,200,0.5)"/>':''}
    ${s==='gazebo'||s==='before'?`<polygon points="100,280 300,120 500,280" fill="url(#wood)"/><rect x="100" y="278" width="400" height="8" fill="#8b6914"/><rect x="110" y="286" width="12" height="120" fill="url(#wood)"/><rect x="478" y="286" width="12" height="120" fill="url(#wood)"/><rect x="290" y="286" width="12" height="120" fill="url(#wood)"/>`:''}
    ${s==='gazebo'?`<rect x="125" y="290" width="160" height="110" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/><rect x="315" y="290" width="160" height="110" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/><line x1="205" y1="290" x2="205" y2="400" stroke="rgba(135,206,235,0.3)" stroke-width="1"/><line x1="395" y1="290" x2="395" y2="400" stroke="rgba(135,206,235,0.3)" stroke-width="1"/>`:''}
    ${s==='before'?`<rect x="125" y="290" width="160" height="110" fill="none" stroke="#ccc" stroke-width="2" stroke-dasharray="8,4"/><rect x="315" y="290" width="160" height="110" fill="none" stroke="#ccc" stroke-width="2" stroke-dasharray="8,4"/>`:''}
    ${s==='veranda'?`<rect x="80" y="180" width="440" height="200" fill="#d4c5a9" opacity="0.7"/><polygon points="60,180 300,80 540,180" fill="url(#wood)"/><rect x="80" y="178" width="440" height="10" fill="#8b6914"/><rect x="90" y="200" width="160" height="170" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/><rect x="260" y="200" width="160" height="170" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/><rect x="430" y="200" width="80" height="170" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/>`:''}
    ${s==='terrace'?`<rect x="60" y="200" width="480" height="8" fill="url(#wood)"/><rect x="70" y="208" width="10" height="140" fill="url(#wood)"/><rect x="520" y="208" width="10" height="140" fill="url(#wood)"/><rect x="90" y="220" width="180" height="120" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/><rect x="290" y="220" width="220" height="120" fill="url(#win)" stroke="rgba(135,206,235,0.4)" stroke-width="1.5"/><circle cx="150" cy="340" r="15" fill="#6b8e23" opacity="0.6"/><circle cx="450" cy="340" r="18" fill="#6b8e23" opacity="0.6"/>`:''}
    ${s==='cafe'||s==='night'?`<rect x="80" y="160" width="440" height="220" fill="#2c2c2c" opacity="0.8"/><polygon points="60,160 300,70 540,160" fill="#5c4033"/><rect x="80" y="158" width="440" height="8" fill="#4a3520"/><rect x="100" y="175" width="180" height="180" fill="url(#win)" stroke="rgba(255,230,150,0.3)" stroke-width="1.5"/><rect x="300" y="175" width="200" height="180" fill="url(#win)" stroke="rgba(255,230,150,0.3)" stroke-width="1.5"/>${s==='night'?'<rect x="120" y="200" width="30" height="20" fill="rgba(255,230,150,0.6)"/><rect x="400" y="200" width="30" height="20" fill="rgba(255,230,150,0.6)"/>':''}<rect x="140" y="320" width="60" height="30" rx="4" fill="#8b6914" opacity="0.7"/><rect x="380" y="320" width="60" height="30" rx="4" fill="#8b6914" opacity="0.7"/>`:''}
    ${s==='pool'?`<rect x="100" y="250" width="400" height="120" fill="#4fc3f7" opacity="0.6" rx="8"/><rect x="80" y="180" width="440" height="60" fill="url(#wood)" opacity="0.8"/><rect x="90" y="190" width="160" height="40" fill="url(#win)" stroke="rgba(135,206,235,0.4)"/><rect x="350" y="190" width="160" height="40" fill="url(#win)" stroke="rgba(135,206,235,0.4)"/>`:''}
    <text x="300" y="430" font-family="-apple-system,sans-serif" font-size="14" font-weight="500" fill="rgba(0,0,0,0.4)" text-anchor="middle">${title}</text>
    <text x="300" y="100" font-size="44" text-anchor="middle">${icon||'🪟'}</text></svg>`;
    return 'data:image/svg+xml;base64,' + utf8ToB64(svg);
}

// ===== СЕРВИСЫ =====
function buildServices() {
    let g = document.getElementById('servicesGrid'); if (!g) return;
    g.innerHTML = servicesData.map(s => `<div class="service-card"><span class="service-icon">${s.icon}</span><h3>${s.title}</h3><p>${s.desc}</p><span class="service-price">${s.price}</span></div>`).join('');
}

// ===== ФИЛЬТРЫ =====
function buildFilters() {
    let c = document.getElementById('filters'); if (!c) return;
    let cats = ['Все', ...new Set(catalogData.map(i => i.cat))];
    c.innerHTML = cats.map(cat => `<button class="filter-btn ${cat==='Все'?'active':''}" data-f="${cat}">${cat}</button>`).join('');
    c.querySelectorAll('.filter-btn').forEach(b => b.addEventListener('click', () => {
        c.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        buildCatalog(b.dataset.f, document.getElementById('search')?.value || '');
    }));
}

// ===== КАТАЛОГ =====
function buildCatalog(filter, search) {
    filter = filter || 'Все'; search = (search || '').toLowerCase();
    let g = document.getElementById('catalogGrid'); if (!g) return;
    let items = catalogData.filter(i => (filter==='Все'||i.cat===filter) && (i.title.toLowerCase().includes(search)||i.desc.toLowerCase().includes(search)||i.cat.toLowerCase().includes(search)));
    if (items.length === 0) { g.innerHTML = '<p style="text-align:center;color:var(--text-tertiary);grid-column:1/-1;padding:3rem">🔍 Ничего не найдено</p>'; return; }
    g.innerHTML = items.map(item => {
        let imgSrc = item.img || genImg(item.title, item.icon, 'gazebo');
        let badgeClass = item.badge === 'Хит' ? 'hit' : item.badge === 'Новинка' ? 'new' : '';
        return `<div class="product-card" style="cursor:pointer" onclick="openProduct(${item.id})">
            ${isAdmin?`<button class="admin-edit" onclick="event.stopPropagation();editProduct(${item.id})">✎</button><button class="admin-delete" onclick="event.stopPropagation();delProduct(${item.id})">✕</button>`:''}
            <div class="product-img"><img src="${imgSrc}" alt="${item.title}" loading="lazy" onerror="this.src='${genImg(item.title,item.icon,'gazebo')}'">${item.badge?`<span class="product-badge ${badgeClass}">${item.badge}</span>`:''}</div>
            <div class="product-body"><p class="product-cat">${item.cat}</p><h3 class="product-title">${item.title}</h3><p class="product-desc">${item.desc}</p>
            <div class="product-footer"><span class="product-price">${item.price} <small>₽</small></span><button class="btn-sm" onclick="event.stopPropagation();addToCart(${item.id})">В корзину</button></div></div></div>`;
    }).join('');
}

// ===== КАРТОЧКА ТОВАРА =====
function openProduct(id) {
    let item = catalogData.find(p => p.id === id); if (!item) return;
    let imgSrc = item.img || genImg(item.title, item.icon, 'gazebo');
    let m = document.createElement('div'); m.className = 'modal-overlay active'; m.id = 'productDetail';
    m.onclick = function(e) { if (e.target === m) m.remove(); };
    m.innerHTML = `<div class="modal-box" style="max-width:520px" onclick="event.stopPropagation()">
    <div style="width:100%;height:260px;border-radius:12px;overflow:hidden;margin-bottom:1.2rem;background:#f5f5f7"><img src="${imgSrc}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover"></div>
    <p style="font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;color:var(--accent);font-weight:700;margin-bottom:0.3rem">${item.cat}</p>
    <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem">${item.title}</h3>
    <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.7;margin-bottom:1.2rem">${item.desc}</p>
    <div style="background:var(--bg-alt);border-radius:12px;padding:1.2rem;margin-bottom:1.2rem">
    <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem"><span style="color:var(--text-secondary)">Цена за м²:</span><span style="font-weight:800;font-size:1.4rem;color:var(--accent)">${item.price} ₽</span></div>
    <div style="display:flex;justify-content:space-between"><span style="color:var(--text-secondary)">Монтаж:</span><span style="font-weight:700">500 ₽/м²</span></div></div>
    <div style="display:flex;gap:0.7rem">
    <button class="btn btn-accent" style="flex:1;justify-content:center" onclick="addToCart(${item.id});document.getElementById('productDetail').remove()">🛒 В корзину</button>
    <a href="tel:+${PHONE}" class="btn btn-outline" style="flex:1;justify-content:center">📞 Позвонить</a></div>
    <button onclick="this.closest('.modal-overlay').remove()" style="position:absolute;top:0.8rem;right:0.8rem;background:rgba(0,0,0,0.05);border:none;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.1rem">✕</button></div>`;
    document.body.appendChild(m);
}

// ===== ПОИСК =====
function initSearch() {
    let s = document.getElementById('search'); if (!s) return;
    s.addEventListener('input', () => { let f = document.querySelector('.filter-btn.active')?.dataset.f || 'Все'; buildCatalog(f, s.value); });
}

// ===== ГАЛЕРЕЯ =====
function buildGallery() {
    let g = document.getElementById('galleryGrid'); if (!g) return;
    const schemes = ['gazebo','veranda','terrace','cafe','gazebo','terrace','pool','veranda','night','gazebo','veranda','terrace'];
    g.innerHTML = galleryData.map((item, i) => {
        let scheme = schemes[i % schemes.length];
        let imgSrc = item.src || genImg(item.title, item.icon, scheme);
        return `<div class="gallery-item">${isAdmin?`<button class="admin-delete" onclick="event.stopPropagation();delGallery(${i})">✕</button>`:''}
        <img src="${imgSrc}" alt="${item.title}" loading="lazy" onerror="this.src='${genImg(item.title,item.icon,scheme)}'">
        <div class="gallery-overlay"><h4>${item.title}</h4><p>${item.desc}</p></div></div>`;
    }).join('');
    g.querySelectorAll('.gallery-item').forEach((el, i) => { if (!isAdmin) el.addEventListener('click', () => openLb(i)); });
}

// ===== LIGHTBOX =====
let lbIdx = 0;
function openLb(i) { if (isAdmin) return; lbIdx = i; let item = galleryData[i]; const schemes = ['gazebo','veranda','terrace','cafe','gazebo','terrace','pool','veranda','night','gazebo','veranda','terrace']; let imgSrc = item.src || genImg(item.title, item.icon, schemes[i%schemes.length]||'gazebo'); document.getElementById('lbImg').src = imgSrc; document.getElementById('lbCap').textContent = `${item.title} — ${item.desc}`; document.getElementById('lightbox').classList.add('active'); }
function closeLb() { document.getElementById('lightbox').classList.remove('active'); }
function closeLbOutside(e) { if (e.target.id === 'lightbox') closeLb(); }
function lbNav(d) { lbIdx = (lbIdx + d + galleryData.length) % galleryData.length; openLb(lbIdx); }
document.addEventListener('keydown', e => { let lb = document.getElementById('lightbox'); if (!lb||!lb.classList.contains('active')) return; if (e.key==='Escape') closeLb(); if (e.key==='ArrowRight') lbNav(1); if (e.key==='ArrowLeft') lbNav(-1); });

// ===== BEFORE/AFTER =====
let baIdx = 0;
function buildBeforeAfter() {
    let c = document.getElementById('baContainer'); if (!c) return;
    let item = beforeAfterData[baIdx];
    let beforeSrc = item.before || genImg('До: '+item.title, '', 'before');
    let afterSrc = item.after || genImg('После: '+item.title, '✨', 'gazebo');
    c.innerHTML = `<img class="ba-img ba-before" src="${beforeSrc}" alt="До"><img class="ba-img ba-after" id="baAfter" src="${afterSrc}" alt="После"><div class="ba-label ba-label-before">До</div><div class="ba-label ba-label-after">После</div><div class="ba-handle" id="baHandle"></div>`;
    initBADrag();
}
function buildBATabs() { let t = document.getElementById('baTabs'); if (!t) return; t.innerHTML = beforeAfterData.map((item,i) => `<button class="ba-tab ${i===baIdx?'active':''}" onclick="switchBA(${i})">${item.title}</button>`).join(''); }
function switchBA(i) { baIdx = i; buildBeforeAfter(); buildBATabs(); }
function initBADrag() {
    let c = document.getElementById('baContainer'), h = document.getElementById('baHandle'), a = document.getElementById('baAfter');
    if (!c||!h||!a) return; let drag = false;
    function setPos(x) { let r = c.getBoundingClientRect(); let pct = ((x-r.left)/r.width)*100; pct = Math.max(0,Math.min(100,pct)); h.style.left = pct+'%'; a.style.clipPath = `inset(0 0 0 ${pct}%)`; }
    h.addEventListener('mousedown', e => { drag=true; e.preventDefault(); });
    c.addEventListener('mousedown', e => { drag=true; setPos(e.clientX); });
    document.addEventListener('mousemove', e => { if(drag) setPos(e.clientX); });
    document.addEventListener('mouseup', () => { drag=false; });
    h.addEventListener('touchstart', e => { drag=true; e.preventDefault(); });
    c.addEventListener('touchstart', e => { drag=true; setPos(e.touches[0].clientX); });
    document.addEventListener('touchmove', e => { if(drag) setPos(e.touches[0].clientX); });
    document.addEventListener('touchend', () => { drag=false; });
}

// ===== ОТЗЫВЫ =====
function buildTestimonials() { let g = document.getElementById('testGrid'); if (!g) return; g.innerHTML = testimonials.map(t => `<div class="test-card"><div class="test-stars">${t.stars}</div><p class="test-text">"${t.text}"</p><p class="test-author">${t.author}</p><p class="test-loc">${t.loc}</p></div>`).join(''); }

// ===== FAQ =====
function buildFAQ() { let g = document.getElementById('faqList'); if (!g) return; g.innerHTML = faqData.map(f => `<div class="faq-item" onclick="this.classList.toggle('open')"><div class="faq-q">${f.q}<span class="arrow">▼</span></div><div class="faq-a">${f.a}</div></div>`).join(''); }

// ===== КАЛЬКУЛЯТОР =====
function calcPrice() {
    let p = pricingMatrix;
    let area = parseInt(document.getElementById('calcArea')?.value) || 0;
    let film = document.getElementById('calcFilm')?.value || 'pvh700';
    let edge = document.getElementById('calcEdge')?.value || 'edgeStandard';
    let fastener = document.getElementById('calcFastener')?.value || 'fastenerStrap';
    let zipper = parseInt(document.getElementById('calcZipper')?.value) || 0;
    let install = document.getElementById('calcInstall')?.checked || false;
    let delivery = document.getElementById('calcDelivery')?.checked || false;
    let pricePerM2 = p[film] + p[edge] + p[fastener];
    let total = pricePerM2 * area + zipper * p.zipper;
    if (install) total += area * p.installation;
    if (delivery) total += p.delivery;
    let min = Math.round(total * 0.95), max = Math.round(total * 1.05);
    let el = document.getElementById('calcResult');
    if (el) el.innerHTML = `<div class="calc-result-label">Ориентировочная стоимость:</div><div class="calc-result-price">${min.toLocaleString('ru-RU')} – ${max.toLocaleString('ru-RU')} ₽</div><div class="calc-result-note">Точная цена — после бесплатного замера. Звоните: <a href="tel:+${PHONE}" style="color:var(--accent);font-weight:600">${PHONE_FMT}</a></div>`;
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    buildServices(); buildFilters(); buildCatalog(); buildGallery();
    buildTestimonials(); buildFAQ(); initSearch();
    buildBeforeAfter(); buildBATabs(); calcPrice();
});
