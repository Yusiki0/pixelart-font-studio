export function initMenus() {
  const menus = Array.from(document.querySelectorAll('.menu'));
  
  function closeAllMenus() { 
    menus.forEach(m => m.classList.remove('open')); 
  }

  menus.forEach(menu => {
    const trigger = menu.querySelector('.menu-trigger');
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const wasOpen = menu.classList.contains('open');
      closeAllMenus();
      if(!wasOpen) menu.classList.add('open');
    });

    trigger.addEventListener('mouseenter', () => {
      if(menus.some(m => m.classList.contains('open'))) {
        closeAllMenus();
        menu.classList.add('open');
      }
    });

    menu.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => closeAllMenus());
    });
  });

  document.addEventListener('click', closeAllMenus);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeAllMenus(); });
}