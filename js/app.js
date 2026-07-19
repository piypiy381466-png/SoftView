/* ===== SOFTWINDOWS APP ===== */
const PHONE = '89999395285';
const PHONE_FMT = '8 999 939-52-85';

let isAdmin = false;
let cart = [];

async function sha256(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function checkPassword(input) {
    if (input === '2002709SV56RCW371a!!!') return true;
    try { const h = await sha256(input); if (h === localStorage.getItem('sw_admin_hash')) return true; } catch(e) {}
    return false;
}

function showPasswordPrompt() {
    const old = document.getElementById('pwOverlay'); if (old) old.remove();
    const overlay = document.createElement('div');
    overlay.className = 'pw-overlay active'; overlay.id = 'pwOverlay';
    overlay.innerHTML = `<div class="pw-box"><h3>🔐 Доступ администратора</h3><p>Введите пароль</p><input type="password" id="pwInput" placeholder="Пароль" autocomplete="off"><div class="pw-error" id="pwError">Неверный пароль</div><button class="btn btn-accent" style="width:100%;justify-content:center" id="pwSubmit">Войти</button></div>`;
    document.body.appendChild(overlay);
    const input = document.getElementById('pwInput'), error = document.getElementById('pwError');
    async function tryLogin() {
        const val = input.value.trim(); if (!val) return;
        if (await checkPassword(val)) {
            try { const h = await sha256(val); localStorage.setItem('sw_admin_hash', h); } catch(e) {}
            sessionStorage.setItem('sw_admin_session', '1'); overlay.remove(); enableAdmin();
        } else { error.style.display='block'; input.style.borderColor='var(--red)'; input.value=''; setTimeout(()=>{error.style.display='none';input.style.borderColor='#e5e5ea'},2000); }
    }
    document.getElementById('pwSubmit').addEventListener('click', tryLogin);
    input.addEventListener('keydown', e => { if(e.key==='Enter') tryLogin(); }); input.focus();
}

function enableAdmin() { isAdmin=true; const b=document.getElementById('adminBar'); if(b)b.classList.add('show'); refreshAll(); }
function disableAdmin() { isAdmin=false; sessionStorage.removeItem('sw_admin_session'); const b=document.getElementById('adminBar'); if(b)b.classList.remove('show'); refreshAll(); }
function refreshAll() {
    if(typeof buildCatalog==='function'){const f=document.querySelector('.filter-btn.active')?.dataset.f||'Все';buildCatalog(f,document.getElementById('search')?.value||'');}
    if(typeof buildGallery==='function')buildGallery();
    if(typeof buildBATabs==='function')buildBATabs();
    if(typeof buildServices==='function')buildServices();
    if(typeof buildTestimonials==='function')buildTestimonials();
    if(typeof buildFAQ==='function')buildFAQ();
}

(async function init(){
    try{
        const sc=localStorage.getItem('sw_cart'); if(sc)cart=JSON.parse(sc);
        const sC=localStorage.getItem('sw_catalog'); if(sC)catalogData=JSON.parse(sC);
        const sG=localStorage.getItem('sw_gallery'); if(sG)galleryData=JSON.parse(sG);
        const sB=localStorage.getItem('sw_ba'); if(sB)beforeAfterData=JSON.parse(sB);
        const sT=localStorage.getItem('sw_test'); if(sT)testimonials=JSON.parse(sT);
        const sF=localStorage.getItem('sw_faq'); if(sF)faqData=JSON.parse(sF);
        const sS=localStorage.getItem('sw_services'); if(sS)servicesData=JSON.parse(sS);
    }catch(e){}
    if(sessionStorage.getItem('sw_admin_session')==='1'){isAdmin=true;const b=document.getElementById('adminBar');if(b)b.classList.add('show');}
    updateCartCount(); highlightNav();
})();

function highlightNav(){
    const page=location.pathname.split('/').pop()||'index.html';
    const map={'index.html':'home','catalog.html':'catalog','gallery.html':'gallery','about.html':'about','contact.html':'contact'};
    document.querySelectorAll('.nav-links a[data-page]').forEach(a=>a.classList.toggle('active',a.dataset.page===map[page]));
}

// Корзина
function addToCart(id){const item=catalogData.find(p=>p.id===id);if(!item)return;const ex=cart.find(c=>c.id===id);if(ex){ex.qty=(ex.qty||1)+1}else{cart.push({id:item.id,title:item.title,price:item.price,icon:item.icon,img:item.img,qty:1})}saveCart();updateCartCount();const el=document.getElementById('cartCount');if(el){el.style.transform='scale(1.5)';setTimeout(()=>el.style.transform='scale(1)',200)}}
function openCart(){const m=document.getElementById('cartModal');if(!m)return;renderCart();m.classList.add('active');document.body.style.overflow='hidden'}
function closeCart(){const m=document.getElementById('cartModal');if(m)m.classList.remove('active');document.body.style.overflow=''}
function closeCartOutside(e){if(e.target.id==='cartModal')closeCart()}
function clearCart(){cart=[];saveCart();updateCartCount();renderCart()}
function removeCartItem(id){cart=cart.filter(c=>c.id!==id);saveCart();updateCartCount();renderCart()}
function updateCartQty(id,d){const item=cart.find(c=>c.id===id);if(!item)return;item.qty=(item.qty||1)+d;if(item.qty<=0){removeCartItem(id);return}saveCart();updateCartCount();renderCart()}
function renderCart(){
    const c=document.getElementById('cartItems'),t=document.getElementById('cartTotal');if(!c)return;
    if(cart.length===0){c.innerHTML='<div class="cart-empty">🛒 Корзина пуста</div>';if(t)t.textContent='0 ₽';return}
    c.innerHTML=cart.map(i=>{const img=i.img||(typeof genImg==='function'?genImg(i.title,i.icon,'gazebo'):'');const p=parseInt(String(i.price).replace(/\s/g,''))||0;const s=p*(i.qty||1);return`<div class="cart-item"><img class="cart-item-img" src="${img}" onerror="this.style.display='none'"><div class="cart-item-info"><div class="cart-item-title">${i.title}</div><div class="cart-item-price">${s.toLocaleString('ru-RU')} ₽</div></div><div class="cart-item-qty"><button onclick="updateCartQty(${i.id},-1)">−</button><span>${i.qty||1}</span><button onclick="updateCartQty(${i.id},1)">+</button></div><span class="cart-item-remove" onclick="removeCartItem(${i.id})">✕</span></div>`}).join('');
    const total=cart.reduce((s,i)=>{const p=parseInt(String(i.price).replace(/\s/g,''))||0;return s+p*(i.qty||1)},0);
    if(t)t.textContent=total.toLocaleString('ru-RU')+' ₽';
}
function updateCartCount(){const el=document.getElementById('cartCount');if(el){const c=cart.reduce((s,i)=>s+(i.qty||1),0);el.textContent=c;el.style.display=c>0?'flex':'none'}}
function saveCart(){try{localStorage.setItem('sw_cart',JSON.stringify(cart))}catch(e){}}

// Админ
function adminLogin(){showPasswordPrompt()}
function adminLogout(){disableAdmin()}
function closeModal(id){const m=document.getElementById(id);if(m)m.classList.remove('active')}
function closeModalOutside(e){if(e.target.classList.contains('modal-overlay'))e.target.classList.remove('active')}

// CRUD товаров
function openProductModal(id){if(!isAdmin){showPasswordPrompt();return}const m=document.getElementById('productModal');if(!m)return;document.getElementById('editId').value='';document.getElementById('productModalTitle').textContent='Новый товар';['f_cat','f_title','f_desc','f_price','f_img','f_icon','f_badge'].forEach(f=>{const el=document.getElementById(f);if(el)el.value=''});m.classList.add('active')}
function editProduct(id){if(!isAdmin){showPasswordPrompt();return}const item=catalogData.find(p=>p.id===id);if(!item)return;const m=document.getElementById('productModal');if(!m)return;document.getElementById('editId').value=id;document.getElementById('productModalTitle').textContent='Редактировать';document.getElementById('f_cat').value=item.cat||'';document.getElementById('f_title').value=item.title||'';document.getElementById('f_desc').value=item.desc||'';document.getElementById('f_price').value=item.price||'';document.getElementById('f_img').value=item.img||'';document.getElementById('f_icon').value=item.icon||'';document.getElementById('f_badge').value=item.badge||'';m.classList.add('active')}
function saveProduct(){if(!isAdmin)return;const eid=document.getElementById('editId').value;const d={cat:document.getElementById('f_cat').value.trim(),title:document.getElementById('f_title').value.trim(),desc:document.getElementById('f_desc').value.trim(),price:document.getElementById('f_price').value.trim(),img:document.getElementById('f_img').value.trim(),icon:document.getElementById('f_icon').value.trim()||'📦',badge:document.getElementById('f_badge').value.trim()};if(!d.title||!d.cat){alert('Название и категория обязательны');return}if(eid){const idx=catalogData.findIndex(p=>p.id===parseInt(eid));if(idx>=0)catalogData[idx]={...catalogData[idx],...d}}else{const maxId=catalogData.reduce((max,p)=>Math.max(max,p.id),0);catalogData.push({id:maxId+1,...d})}persistData();closeModal('productModal');refreshAll();if(typeof buildFilters==='function')buildFilters()}
function delProduct(id){if(!isAdmin)return;if(!confirm('Удалить товар?'))return;catalogData=catalogData.filter(p=>p.id!==id);persistData();refreshAll();if(typeof buildFilters==='function')buildFilters()}

// CRUD галереи
function openGalleryModal(){if(!isAdmin){showPasswordPrompt();return}const m=document.getElementById('galleryModal');if(!m)return;['g_title','g_desc','g_src','g_icon'].forEach(f=>{const el=document.getElementById(f);if(el)el.value=''});const fe=document.getElementById('g_file');if(fe)fe.value='';const pr=document.getElementById('g_preview');if(pr)pr.innerHTML='';m.classList.add('active')}
function previewGalleryPhoto(input){const pr=document.getElementById('g_preview');if(!pr)return;if(input.files&&input.files[0]){const r=new FileReader();r.onload=function(e){pr.innerHTML=`<img src="${e.target.result}" style="max-width:100%;max-height:180px;border-radius:10px"><br><small style="color:var(--green)">Фото загружено</small>`;document.getElementById('g_src').value=e.target.result};r.readAsDataURL(input.files[0])}}
function saveGallery(){if(!isAdmin)return;const d={title:document.getElementById('g_title').value.trim(),desc:document.getElementById('g_desc').value.trim(),src:document.getElementById('g_src').value.trim(),icon:document.getElementById('g_icon').value.trim()||'📷'};if(!d.title){alert('Название обязательно');return}galleryData.push(d);persistData();closeModal('galleryModal');if(typeof buildGallery==='function')buildGallery()}
function delGallery(i){if(!isAdmin)return;if(!confirm('Удалить фото?'))return;galleryData.splice(i,1);persistData();if(typeof buildGallery==='function')buildGallery()}

// Редактор всего
function editAllData(){if(!isAdmin){showPasswordPrompt();return}const data={catalogData,galleryData,beforeAfterData,testimonials,faqData,servicesData};const json=JSON.stringify(data,null,2);const modal=document.createElement('div');modal.className='modal-overlay active';modal.onclick=function(e){if(e.target===modal)modal.remove()};modal.innerHTML=`<div class="modal-box" style="max-width:700px" onclick="event.stopPropagation()"><h3>📝 Редактор всех данных (JSON)</h3><textarea id="allDataEditor" style="width:100%;height:400px;font-family:monospace;font-size:12px;padding:12px;border:1.5px solid #e5e5ea;border-radius:10px">${json}</textarea><div class="modal-btns"><button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">Отмена</button><button class="btn btn-accent" id="saveAllData">Сохранить всё</button></div></div>`;document.body.appendChild(modal);document.getElementById('saveAllData').addEventListener('click',function(){try{const nd=JSON.parse(document.getElementById('allDataEditor').value);if(nd.catalogData)catalogData=nd.catalogData;if(nd.galleryData)galleryData=nd.galleryData;if(nd.beforeAfterData)beforeAfterData=nd.beforeAfterData;if(nd.testimonials)testimonials=nd.testimonials;if(nd.faqData)faqData=nd.faqData;if(nd.servicesData)servicesData=nd.servicesData;persistData();modal.remove();refreshAll();if(typeof buildFilters==='function')buildFilters();alert('✅ Сохранено!')}catch(e){alert('❌ Ошибка JSON: '+e.message)}})}

function persistData(){try{localStorage.setItem('sw_catalog',JSON.stringify(catalogData));localStorage.setItem('sw_gallery',JSON.stringify(galleryData));localStorage.setItem('sw_ba',JSON.stringify(beforeAfterData));localStorage.setItem('sw_test',JSON.stringify(testimonials));localStorage.setItem('sw_faq',JSON.stringify(faqData));localStorage.setItem('sw_services',JSON.stringify(servicesData))}catch(e){alert('⚠️ localStorage переполнен')}}
function exportData(){if(!isAdmin)return;const d={catalogData,galleryData,beforeAfterData,testimonials,faqData,servicesData};const b=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='softwindows_backup_'+new Date().toISOString().slice(0,10)+'.json';a.click();URL.revokeObjectURL(u)}
function importData(){if(!isAdmin)return;const inp=document.createElement('input');inp.type='file';inp.accept='.json';inp.onchange=function(){const f=this.files[0];if(!f)return;const r=new FileReader();r.onload=function(e){try{const d=JSON.parse(e.target.result);if(d.catalogData)catalogData=d.catalogData;if(d.galleryData)galleryData=d.galleryData;if(d.beforeAfterData)beforeAfterData=d.beforeAfterData;if(d.testimonials)testimonials=d.testimonials;if(d.faqData)faqData=d.faqData;if(d.servicesData)servicesData=d.servicesData;persistData();alert('✅ Загружено!');location.reload()}catch(err){alert('❌ Ошибка формата')}};r.readAsText(f)};inp.click()}

// Обратный звонок
function requestCallback(){
    const input=document.getElementById('callbackPhone');
    const success=document.getElementById('callbackSuccess');
    if(!input)return;
    const phone=input.value.trim();
    if(!phone){alert('Введите номер телефона');return}
    // Сохраняем заявку
    try{
        const requests=JSON.parse(localStorage.getItem('sw_callbacks')||'[]');
        requests.push({phone,time:new Date().toISOString()});
        localStorage.setItem('sw_callbacks',JSON.stringify(requests));
    }catch(e){}
    input.value='';
    if(success){success.style.display='block';setTimeout(()=>success.style.display='none',5000)}
}

function toggleMenu(){document.getElementById('navLinks').classList.toggle('open')}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeCart();document.querySelectorAll('.modal-overlay.active').forEach(m=>m.classList.remove('active'))}});
document.addEventListener('contextmenu',function(e){if(e.target.closest('.admin-bar')||isAdmin)return;if(e.target.tagName==='IMG'&&!e.target.closest('.modal-overlay'))e.preventDefault()});
