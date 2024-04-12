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




/* 
// Función para cargar la API de YouTube de forma asíncrona
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
// Función que se ejecuta cuando la API de YouTube está lista
let player;
const audioUrl = playButton.getAttribute('data-audio-url');
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtubePlayer', {
    height: '0',
    width: '0',
    videoId: audioUrl,
    playerVars: {
      autoplay: 0, // 0 para desactivar la reproducción automática
      controls: 0, // 0 para ocultar los controles del reproductor
      disablekb: 1, // 1 para deshabilitar el control de teclado
      enablejsapi: 1, // 1 para habilitar la API JavaScript
      origin: window.location.origin, // URL del sitio web actual
      iv_load_policy: 3, // 3 para desactivar las anotaciones
      loop: 1, // 1 para reproducir el audio en bucle
      modestbranding: 1, // 1 para ocultar el logo de YouTube
      playsinline: 1, // 1 para reproducir el audio en línea en dispositivos móviles
      start: 0, // Segundo inicial del audio
      fs: 0 // 0 para ocultar el botón de pantalla completa
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}
const playButton = document.getElementById('playButton');


// Función que se ejecuta cuando el reproductor está listo
function onPlayerReady(event) {
  // Asigna el evento click al botón de reproducción
  playButton.addEventListener('click', () => {
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
      player.playVideo();
      playButton.textContent = 'Pausar';
    } else {
      player.pauseVideo();
      playButton.textContent = 'Reproducir';
    }
  });
}

// Cargar la API de YouTube cuando se cargue la página
window.onload = loadYouTubeAPI;
 // Función que se ejecuta cuando el reproductor cambia de estado
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PAUSED) {
    player.seekTo(0); // Vuelve al segundo inicial del video
  }
}

// Función que se ejecuta cuando el reproductor está listo
function onPlayerReady(event) {
  // Asigna el evento click al botón de reproducción
  playButton.addEventListener('click', () => {
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
      player.loadVideoById({
        videoId: audioUrl,
        startSeconds: 0
      });
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
    } else {
      player.pauseVideo();
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    }
  });
   
  
  // Asigna el evento onStateChange al reproductor
  player.addEventListener('onStateChange', onPlayerStateChange);
}

// Cargar la API de YouTube cuando se cargue la página
window.onload = loadYouTubeAPI;
playerVars: {
  autoplay: 0, // No reproducir automáticamente al cargar el reproductor
  controls: 0, // Ocultar los controles del reproductor
  disablekb: 1, // Deshabilitar el control de teclado
  enablejsapi: 1, // Habilitar la API JavaScript
  modestbranding: 1, // Ocultar el logo de YouTube
  playsinline: 1, // Reproducir el video en línea en dispositivos móviles
  fs: 0 // Ocultar el botón de pantalla completa
  // Otras configuraciones del reproductor pueden agregarse aquí
}
 */// Array para almacenar referencias a los reproductores activos

 // Array para almacenar referencias a los reproductores activos
// Array para almacenar referencias a los reproductores activos

// Array para almacenar referencias a los reproductores activos

// Array para almacenar referencias a los reproductores activos

// Array para almacenar referencias a los reproductores activoslet player;

let player;
const playButton = document.getElementById('playButton');
const playIcon = playButton.querySelector('i');

// Función para cargar la API de YouTube de forma asíncrona
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Función que se ejecuta cuando la API de YouTube está lista
function onYouTubeIframeAPIReady() {
    // No hacemos nada aquí, cargaremos el video cuando se haga clic en el botón de reproducción
}

// Función que se ejecuta cuando el reproductor está listo
function onPlayerReady(event) {
    // Asignamos el evento clic al botón de reproducción
    playButton.addEventListener('click', () => {
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
            player.playVideo();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            player.pauseVideo();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });
}

// Función para crear el reproductor y cargar el video
function createYouTubePlayer(videoId) {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            autoplay: 0, // Desactivar la reproducción automática
            controls: 0, // Ocultar los controles del reproductor
            disablekb: 1, // Deshabilitar el control de teclado
            enablejsapi: 1, // Habilitar la API JavaScript
            origin: window.location.origin, // URL del sitio web actual
            iv_load_policy: 3, // Desactivar las anotaciones
            modestbranding: 1, // Ocultar el logo de YouTube
            playsinline: 1, // Reproducir el audio en línea en dispositivos móviles
            fs: 0 // Ocultar el botón de pantalla completa
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Cargar la API de YouTube cuando se cargue la página
window.onload = loadYouTubeAPI;

// Asignar el evento clic al botón de reproducción con el video correspondiente
playButton.addEventListener('click', () => {
    const videoId = playButton.getAttribute('data-audio-url');
    if (!player) {
        // Si el reproductor no está creado, lo creamos y cargamos el video
        createYouTubePlayer(videoId);
    } else {
        // Si el reproductor ya está creado, solo reproducimos o pausamos el video
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
            player.playVideo();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            player.seekTo(0); // Reiniciamos el audio al principio
        }
    }
});
