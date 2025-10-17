// animations.js - applies site-wide animated glows & intro fades
document.addEventListener('DOMContentLoaded', ()=> {
  // header fade-in
  const header = document.querySelector('.header');
  if(header) header.style.opacity = 0;
  setTimeout(()=> { if(header) header.style.transition = 'opacity 0.6s ease'; if(header) header.style.opacity = 1; }, 200);

  // subtle floating for feature cards
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((c,i)=>{
    c.style.transform = 'translateY(0)';
    const dur = 3000 + i*400;
    let dir = 1;
    setInterval(()=>{
      c.style.transform = `translateY(${dir * 6}px)`;
      dir *= -1;
    }, dur);
  });

  // animated gradient on buttons
  const grads = document.querySelectorAll('.button-gradient, .button-primary');
  grads.forEach(btn=>{
    btn.style.backgroundSize = '200% 100%';
    btn.style.transition = 'transform .18s ease';
    btn.addEventListener('mouseenter', ()=> btn.style.transform = 'translateY(-3px)');
    btn.addEventListener('mouseleave', ()=> btn.style.transform = 'translateY(0)');
  });
});
