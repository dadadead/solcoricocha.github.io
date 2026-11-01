// IMPORTANTE: reemplaza el número por el WhatsApp comercial, con código de país, sin + ni espacios.
// Ejemplo Perú: 519XXXXXXXX. Mientras esté vacío, no se enviará el mensaje.
const WHATSAPP_EMPRESA = '';
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => { const open=nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded',String(open)); });
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent = new Date().getFullYear();
const form=document.getElementById('contactForm');
if(form){
 document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('product').value=a.dataset.product}));
form.addEventListener('submit',e=>{
 e.preventDefault();
 if(!/^\d{10,15}$/.test(WHATSAPP_EMPRESA)){alert('Falta configurar el número comercial de WhatsApp en script.js.');return;}
 const name=document.getElementById('name').value.trim();const product=document.getElementById('product').value;const details=document.getElementById('details').value.trim();
 const message=`Hola, soy ${name}. Quiero cotizar: ${product}.${details?' Detalles: '+details:''}`;
 window.open(`https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
});

}
const filterButtons=document.querySelectorAll('[data-filter]');
const catalogSearch=document.getElementById('catalogSearch');
const catalogCards=[...document.querySelectorAll('.catalog-page-grid .catalog-card')];
const catalogCount=document.getElementById('catalogCount');
const catalogEmpty=document.getElementById('catalogEmpty');
const clearCatalogSearch=document.getElementById('clearCatalogSearch');
let activeCategory='todos';
const normalizeText=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').trim();
function updateCatalog(){
 const query=normalizeText(catalogSearch?.value||'');
 let count=0;
 catalogCards.forEach(card=>{
  const matchesCategory=activeCategory==='todos'||card.dataset.category===activeCategory;
  const matchesText=normalizeText(card.textContent+' '+card.dataset.category+' '+(card.querySelector('img')?.alt||'')).includes(query);
  card.hidden=!(matchesCategory&&matchesText);
  if(!card.hidden)count++;
 });
 if(catalogCount)catalogCount.textContent=`${count} ${count===1?'mueble encontrado':'muebles encontrados'}`;
 if(catalogEmpty)catalogEmpty.hidden=count!==0;
 if(clearCatalogSearch)clearCatalogSearch.hidden=!catalogSearch.value;
}
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
 activeCategory=btn.dataset.filter;
 filterButtons.forEach(b=>b.classList.toggle('active',b===btn));
 updateCatalog();
}));
if(catalogSearch){
 catalogSearch.addEventListener('input',updateCatalog);
 clearCatalogSearch?.addEventListener('click',()=>{catalogSearch.value='';updateCatalog();catalogSearch.focus();});
 updateCatalog();
}

// Galería ampliada del catálogo AGORA
const gallery=document.getElementById('productGallery');
if(gallery){
 const image=gallery.querySelector('#galleryImage');
 document.querySelectorAll('[data-gallery-src]').forEach(btn=>btn.addEventListener('click',()=>{image.src=btn.dataset.gallerySrc;image.alt=btn.getAttribute('aria-label');gallery.showModal();}));
 gallery.querySelector('.gallery-close').addEventListener('click',()=>gallery.close());
 gallery.addEventListener('click',e=>{if(e.target===gallery)gallery.close();});
}
