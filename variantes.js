// Vista orientativa de acabados. Mantiene el original intacto.
window.crearVistaAcabado = async function(imagen, color, esTapiz) {
  const original = new Image(); original.src = imagen;
  await original.decode();
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 1000/Math.max(original.naturalWidth, original.naturalHeight));
  canvas.width=Math.round(original.naturalWidth*scale);canvas.height=Math.round(original.naturalHeight*scale);
  const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(original,0,0,canvas.width,canvas.height);
  const pixels=ctx.getImageData(0,0,canvas.width,canvas.height), d=pixels.data;
  const W=canvas.width,H=canvas.height;
  const bg=new Uint8Array(W*H), queue=new Int32Array(W*H);let head=0,tail=0;
  function isPale(i){const k=i*4,r=d[k],g=d[k+1],b=d[k+2];return Math.min(r,g,b)>185&&Math.max(r,g,b)-Math.min(r,g,b)<34;}
  function visit(i){if(i<0||i>=W*H||bg[i]||!isPale(i))return;bg[i]=1;queue[tail++]=i;}
  for(let x=0;x<W;x++){visit(x);visit((H-1)*W+x)}for(let y=0;y<H;y++){visit(y*W);visit(y*W+W-1)}
  while(head<tail){const i=queue[head++],x=i%W,y=(i/W)|0;if(x>0)visit(i-1);if(x<W-1)visit(i+1);if(y>0)visit(i-W);if(y<H-1)visit(i+W)}
  const colors={Negro:[44,44,45],Beige:[210,192,163],Gris:[135,136,137],'Roble claro':[196,158,109],Nogal:[105,68,46],Ceniza:[155,150,142]};
  const target=colors[color];if(!target)return imagen;
  for(let i=0;i<W*H;i++){
    if(bg[i])continue;
    const k=i*4,r=d[k],g=d[k+1],b=d[k+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),chroma=mx-mn,lum=(r+g+b)/3;
    // Conserva metales negros, cromados, objetos oscuros y fondos claros.
    let strength=0;
    if(esTapiz){if(lum>85 && lum<242 && chroma<78)strength=0.75;}
    else {if(r>g*1.045 && g>b*.96 && lum>68 && lum<244)strength=.78;}
    if(!strength)continue;
    const shade=Math.max(.44,Math.min(1.24,lum/165));
    for(let c=0;c<3;c++)d[k+c]=Math.round(d[k+c]*(1-strength)+Math.min(255,target[c]*shade)*strength);
  }
  ctx.putImageData(pixels,0,0);return canvas.toDataURL('image/jpeg',.88);
};
