window.addEventListener('scroll', function() {
  let header = document.querySelector('.contenedor__menu');
  let sections = document.querySelectorAll('section');
  let current = '';

  sections.forEach(function(section) {
      let sectionTop = section.offsetTop;
      let sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
      }
  });

  let menuItems = document.querySelectorAll('.contenedor__menu--items');

  menuItems.forEach(function(item) {
      item.classList.remove('contenedor__menu--active');
      if (item.querySelector('a').getAttribute('href').substring(1) === current) {
          item.classList.add('contenedor__menu--active');
      }
  });

  // Cambio de color específico para las secciones "Nosotros" y "Proyectos"
  if (current === 'nosotros' || current === 'proyectos') {
     // header.style.backgroundColor = 'transparent'; // Cambia el color del fondo del menú a negro
      menuItems.forEach(function(item) {
          item.querySelector('a').style.color = '#000'; // Cambia el color del texto del menú a negro
          if (window.innerWidth < 992) {
            if (item.classList.contains('contenedor__menu--active')) {
              item.style.backgroundColor = '';
              item.style.borderRadius = '0px'; // Restaura el color de fondo solo si no está activo
              }else{
              item.style.backgroundColor = '#FFF'; // Restaura el color de fondo solo si no está activo

              }
          }
      });
  } else {
     // header.style.backgroundColor = 'transparent'; // Restaura el color de fondo del menú a transparente
      menuItems.forEach(function(item) {
          item.querySelector('a').style.color = '#FFF'; // Restaura el color del texto del menú a blanco
          if (window.innerWidth < 992) {
            if (item.classList.contains('contenedor__menu--active')) {
              item.style.backgroundColor = ''; // Restaura el color de fondo solo si no está activo
              item.style.borderRadius = '0px';
             }else{
              item.style.backgroundColor = '#000'; // Restaura el color de fondo solo si no está activo
             }
          } 
      });
  }

  // Cambiar el color del texto del menú a blanco cuando se llegue al inicio del div con id "trabajos" dentro de la sección "nosotros"
  if (current === "nosotros"){
    let trabajosSection = document.getElementById('trabajos');
    if (trabajosSection && pageYOffset >= trabajosSection.offsetTop) {
        menuItems.forEach(function(item) {
            item.querySelector('a').style.color = '#FFF';
            if (window.innerWidth < 992) {
              if (item.classList.contains('contenedor__menu--active')) {
                item.style.backgroundColor = ''; // Restaura el color de fondo solo si no está activo
                item.style.borderRadius = '0px';
               }else{
                item.style.backgroundColor = '#000'; // Restaura el color de fondo solo si no está activo
               }
            } 
        });
    }
  }
});


function stickyAdd() {
  if (window.pageYOffset - 50 >= sticky) {
      navbar.classList.add("sticky");
      img.src = URL_WEB + "web/assets/img/reaquila/horizontal.png";
  } else {
      navbar.classList.remove("sticky");
      img.src = URL_WEB + "web/assets/img/reaquila/logo-white.png";
  }
}

// Selecciona el elemento del menú
const menu = document.getElementById('menu');

// Función para ocultar el menú con opacidad cuando se llega al final de la página
function toggleMenuVisibility() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // Si el usuario está en el final de la página, oculta el menú con opacidad
    menu.style.opacity = '0';
  } else {
    // Si no, muestra el menú con opacidad completa
    menu.style.opacity = '1';
  }
}

// Agrega un event listener para detectar el scroll
window.addEventListener('scroll', toggleMenuVisibility);
