const PRODUCTS = [{"id":1,"name":"Consola Recibidor Agatha Blanco Dorado","category":"Consolas","image":"assets/catalogo/mueble-001-00.jpeg","images":["assets/catalogo/mueble-001-00.jpeg","assets/catalogo/mueble-001-01.jpeg","assets/catalogo/mueble-001-02.jpeg","assets/catalogo/mueble-001-03.jpeg","assets/catalogo/mueble-001-04.jpeg"]},{"id":2,"name":"Consola Recibidor Gatsby Caramelo","category":"Consolas","image":"assets/catalogo/mueble-002-00.jpeg","images":["assets/catalogo/mueble-002-00.jpeg","assets/catalogo/mueble-002-01.jpeg","assets/catalogo/mueble-002-02.jpeg","assets/catalogo/mueble-002-03.jpeg","assets/catalogo/mueble-002-04.jpeg"]},{"id":3,"name":"Consola Recibidor Industrial Berilio Caramelo","category":"Consolas","image":"assets/catalogo/mueble-003-00.jpeg","images":["assets/catalogo/mueble-003-00.jpeg","assets/catalogo/mueble-003-01.jpeg","assets/catalogo/mueble-003-02.jpeg","assets/catalogo/mueble-003-03.jpeg","assets/catalogo/mueble-003-04.jpeg"]},{"id":4,"name":"Consola Recibidor Sterling Blanco","category":"Consolas","image":"assets/catalogo/mueble-004-00.webp","images":["assets/catalogo/mueble-004-00.webp","assets/catalogo/mueble-004-01.jpeg","assets/catalogo/mueble-004-02.jpeg","assets/catalogo/mueble-004-03.jpeg","assets/catalogo/mueble-004-04.jpeg","assets/catalogo/mueble-004-05.jpeg"]},{"id":5,"name":"Escritorio Archivador Gamer Battle Negro","category":"Escritorios industriales","image":"assets/catalogo/mueble-005-00.jpeg","images":["assets/catalogo/mueble-005-00.jpeg","assets/catalogo/mueble-005-01.jpeg","assets/catalogo/mueble-005-02.jpeg","assets/catalogo/mueble-005-03.jpeg","assets/catalogo/mueble-005-04.jpeg","assets/catalogo/mueble-005-05.jpeg","assets/catalogo/mueble-005-06.jpeg"]},{"id":6,"name":"Escritorio Estante Industrial Noah Gales","category":"Escritorios industriales","image":"assets/catalogo/mueble-006-00.jpeg","images":["assets/catalogo/mueble-006-00.jpeg","assets/catalogo/mueble-006-01.jpeg","assets/catalogo/mueble-006-02.jpeg","assets/catalogo/mueble-006-03.jpeg","assets/catalogo/mueble-006-04.jpeg"]},{"id":7,"name":"Escritorio Industrial Summer Duna","category":"Escritorios industriales","image":"assets/catalogo/mueble-007-00.jpeg","images":["assets/catalogo/mueble-007-00.jpeg","assets/catalogo/mueble-007-01.jpeg","assets/catalogo/mueble-007-02.jpeg","assets/catalogo/mueble-007-03.jpeg","assets/catalogo/mueble-007-04.jpeg"]},{"id":8,"name":"Set de Mesas de Centro Industrial Loki Caramelo - Cemento","category":"Mesas de centro","image":"assets/catalogo/mueble-008-00.jpeg","images":["assets/catalogo/mueble-008-00.jpeg","assets/catalogo/mueble-008-01.jpeg","assets/catalogo/mueble-008-02.jpeg","assets/catalogo/mueble-008-03.jpeg","assets/catalogo/mueble-008-04.jpeg"]}];
const id=Number(new URLSearchParams(location.search).get('id'));
const p=PRODUCTS.find(x=>x.id===id);
const target=document.getElementById('detail');
if(!p){target.textContent='No encontramos este mueble. Regresa al catálogo.';}else{
  document.title=p.name+' | Soluciones Coricocha';
  const photo=document.createElement('section');
  photo.className='gallery-section';
  const gallery=document.createElement('div');gallery.className='product-gallery';
  const rail=document.createElement('div');rail.className='gallery-rail';rail.setAttribute('aria-label','Vistas del producto');
  const stage=document.createElement('div');stage.className='gallery-stage';
  const hero=document.createElement('img');hero.src=p.image;hero.alt=p.name;hero.className='gallery-main-image';
  const left=document.createElement('button'),right=document.createElement('button');
  left.className='gallery-arrow gallery-prev';right.className='gallery-arrow gallery-next';
  left.textContent='‹';right.textContent='›';left.setAttribute('aria-label','Imagen anterior');right.setAttribute('aria-label','Imagen siguiente');
  stage.append(hero,left,right);
  const views=p.images.map((src,i)=>({src,label:i===0?'Imagen principal':`Fotografía ${i+1}`}));
  let active=0;
  const buttons=views.map((v,i)=>{
    const btn=document.createElement('button');btn.type='button';btn.className='gallery-thumb';btn.title=v.label;btn.setAttribute('aria-label',v.label);
    const pic=document.createElement('img');pic.src=v.src;pic.alt=p.name+' — '+v.label;pic.loading='lazy';btn.append(pic);
    btn.addEventListener('click',()=>show(i));rail.append(btn);return btn;
  });
  const caption=document.createElement('p');caption.className='gallery-caption';
  function show(i){active=(i+views.length)%views.length;const v=views[active];hero.src=v.src;hero.style.transform='none';hero.style.objectPosition='center';buttons.forEach((b,j)=>b.setAttribute('aria-current',j===active?'true':'false'));caption.textContent=v.label+' · '+p.name;}
  left.addEventListener('click',()=>show(active-1));right.addEventListener('click',()=>show(active+1));
  gallery.append(rail,stage);photo.append(gallery,caption);show(0);
  const side=document.createElement('section');side.className='detail-side';
  const eyebrow=document.createElement('div');eyebrow.className='detail-eyebrow';eyebrow.textContent=p.category;
  const title=document.createElement('h1');title.textContent=p.name;
  const description=document.createElement('p');description.textContent='Diseño para espacios residenciales y comerciales. Consulta materiales, medidas y acabados disponibles con nuestro equipo.';
  const hr=document.createElement('hr');hr.className='detail-rule';
  const price=document.createElement('div');price.className='detail-price';price.textContent='Precio a cotizar';
  const small=document.createElement('small');small.textContent='El precio se confirma según medidas y acabados';price.append(small);
  const sizes=document.createElement('div');sizes.className='detail-field';sizes.innerHTML='<strong>TAMAÑO</strong><span>Consultar medidas disponibles</span>';
  const quote=document.createElement('a');quote.className='quote-detail';quote.target='_blank';quote.rel='noopener noreferrer';quote.textContent='Solicitar cotización ↗';quote.href='https://wa.me/51923118162?text='+encodeURIComponent('Hola, estoy interesado en este mueble: '+p.name);
  side.append(eyebrow,title,description,hr,price,sizes,quote);target.append(photo,side);
}
