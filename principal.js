document.addEventListener('DOMContentLoaded', () =>{
        //Boton hamburguesa
    const $botonHamburguesa = document.querySelector('.hamburger');
    const $menu = document.querySelector('.menu-nav__container');

    $botonHamburguesa.addEventListener('click', (e)=>{
        $menu.classList.toggle('menu_cambiar');
        $botonHamburguesa.classList.toggle('is-active');
        $botonHamburguesa.classList.toggle('hamburger--collapse');
    });


    document.addEventListener('click', (e)=>{
        if(e.target.id === 'iniciar-btn'){
            console.log('tocaste iniciar reloj');
            const $reloj_texto = document.createElement('p');
            const $seccion = document.querySelector('.primera-seccion');
            $reloj_texto.textContent = 'nuevo';
            $reloj_texto.classList.add = 'texto-reloj';
            clock = setInterval(() => {
                let fecha = new Date();
                $reloj_texto.innerHTML = `${fecha.toLocaleTimeString()}`;
                $seccion.insertAdjacentElement('beforeend', $reloj_texto);
                e.target.disabled = true;
            }, 1000);
            
        }
        if(e.target.id === 'desactivar-btn'){
            console.log('remover reloj');
            if(!clock){
                console.log('no hay reloj')
            }else{
                const $reloj_texto = document.getElementById('desactivar-alarma-btn');
                clearInterval(clock);
                $reloj_texto.nextSibling.remove();
            }
            
        }

        //RELOJ
        const $alarma = document.createElement('audio')
        $alarma.src = 'http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg';
        let alarma;
        
        if(e.target.id=== 'iniciar-alarma-btn'){
            console.log('alarma')
            alarma = setTimeout(() => {
                $alarma.play();
                
            }, 0);
            
        }
        if(e.target.id === 'desactivar-alarma-btn'){
            console.log('terminar alarma');
            clearTimeout(alarma);
            $alarma.pause();
            $alarma.currentTime = 0;

        }
    })

    //Mover circulo
    const $circulo = document.getElementById('circulo');
    const $escenario = document.getElementById('subtitulos-segunda')

    let x = 0, y = 0;

    document.addEventListener('keydown', e =>{
        const limiteEscenario = $escenario.getBoundingClientRect();
        const limitePelota = $circulo.getBoundingClientRect();
        
        const {style} = $circulo;
        if(e.key === 'ArrowLeft'){
            if(limitePelota.left>limiteEscenario.left) x--;
            e.preventDefault();
        }
        if(e.key === 'ArrowRight'){
            if(limitePelota.right<limiteEscenario.right) x++;
            e.preventDefault();
        }
        if(e.key === 'ArrowUp'){
            
            e.preventDefault();
            if(limitePelota.top>limiteEscenario.top) y--;
            e.preventDefault();
        }
        if(e.key === 'ArrowDown'){
            e.preventDefault();
            if(limitePelota.bottom<limiteEscenario.bottom) y++;
            e.preventDefault();
        }
        style.transform = `translate(${x*10+"px"},${y*10+"px"})`;
        
    })


    //Cuenta regresiva
    const $countdown = document.querySelector('.countdown');

    const tiempoRestante = () =>{
        
        let relojActual = new Date().getTime(),
            relojFuturo = new Date('March 17, 2022 03:24:00').getTime(),
            diferencia = relojFuturo-relojActual;
        
        
        return{
            milisegundos: diferencia,
            segundos: diferencia/(1000),
            minutos: diferencia/(1000*60),
            horas: diferencia/(1000*60*60),
            dias: diferencia/(1000*60*60*24),
        }
        
        
    }

    setInterval(() => {

        
        let {milisegundos, segundos, minutos, horas, dias} = tiempoRestante();

        if(milisegundos>0){
            $countdown.innerHTML = `Dias: ${Math.ceil(dias)} Horas: ${Math.ceil(horas)} Minutos: ${Math.ceil(minutos)} Segundos: ${Math.ceil(segundos)} Milisegundos: ${Math.ceil(milisegundos)}`;
        }else{
            $countdown.innerHTML = '??Feliz a??o nuevo!'
        }
        
    }, 1000);

    tiempoRestante();


    //Boton scroll-up
    const $botonScrollUp = document.querySelector('.scroll-up');
    window.addEventListener('scroll', e =>{
        
        if(window.scrollY>=400){
            $botonScrollUp.classList.add('scroll-up-on');
        }else{
            $botonScrollUp.classList.remove('scroll-up-on');
        }
    });

    $botonScrollUp.addEventListener('click', e =>{
        console.log(e.target);
        window.scrollTo( 0, 0 );
    });

    //Boton nocturno
    let sol = '??????', luna = '????';

    document.addEventListener('click', e=>{
        if (e.target.matches('.boton-dianoche')) {
            
            
            if (e.target.innerText === luna ) {
                console.log('era una luna y cambie a sol');
                e.target.classList.add('noche-boton');
                document.body.classList.add('noche');
                e.target.innerHTML = sol;
                localStorage.setItem('nocturno', 'on');
            }else{
                console.log('era un sol y cambie a luna');
                e.target.classList.remove('noche-boton');
                document.body.classList.remove('noche');
                e.target.innerHTML = luna;
                localStorage.removeItem('nocturno', 'off');
            }
        }
    });
    if (localStorage.getItem('nocturno', 'on')) {
        document.body.classList.add('noche');
        $botonNocturno = document.querySelector('.boton-dianoche').innerHTML = sol;
        $botonNocturno = document.querySelector('.boton-dianoche').classList.add('noche');
    }else{
        document.body.classList.remove('noche');
        $botonNocturno = document.querySelector('.boton-dianoche').innerHTML = luna;
        $botonNocturno = document.querySelector('.boton-dianoche').classList.remove('noche');
    }



    //Responsive MQ
    const $youtube = document.getElementById('youtube'),
        $maps = document.getElementById('maps');

    let breakpoint = window.matchMedia('(min-width: 1024px)');


    const responsive = (e) =>{
        if (e.matches) {
            
            $youtube.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/36DCuT1KxM4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            $maps.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26963634.440306917!2d86.05396959850373!3d34.41508716680059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31508e64e5c642c1%3A0x951daa7c349f366f!2sChina!5e0!3m2!1ses!2smx!4v1616879754840!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
        }else{
            $youtube.innerHTML = `<a href="https://www.youtube.com/watch?v=36DCuT1KxM4&ab_channel=bcdaeiou" target="_blank">Ver video</a>`
            $maps.innerHTML = `<a href="https://goo.gl/maps/RPNwkngoTpRgFg8M9" target="_blank">Ver mapa</a>`
        }
    }


    breakpoint.addEventListener('change', responsive);

    responsive(breakpoint);

    //P??ginas 
    let newUrl;
    document.addEventListener('click', e =>{
        //Funcion para abrir

        const abrirVentana = (url = null, ancho = null, largo = null) =>{
            if (url && ancho && largo) {
                if (newUrl) {
                    newUrl.close();
                    newUrl = null;
                }
                console.log('abriendo ventana');
                newUrl = window.open(url, "", `width=${ancho},height=${largo}`);
                
            }else{
                alert('Completa los campos');
            }
        }
        
        //Bot??n abrir ventana
        if (e.target.matches('#btn-abrirVentana')) {
            
            let url = document.getElementById('url').value,
                ancho = document.getElementById('ancho').value,
                largo = document.getElementById('largo').value;
            abrirVentana(url, ancho, largo);
        }
        //Bot??n cerrar ventana
        if (e.target.matches('#btn-cerrarVentana')){
            
            if (newUrl) {
                newUrl.close();
                newUrl = null;
            }else{
                alert('No hay ventana para cerrar');
            }
        }
    });
    
    //
    const $infoDispositivo = document.getElementById('info-dispositivo'),
        ua = navigator.userAgent,
        isMobile = {
            android: () => ua.match(/android/i),
            ios: () => ua.match(/iphone|ipad|ipod/i),
            windows: () => ua.match(/windows phone/i),
            any: function(){
                return this.android()||this.ios()||this.windows();
            }
        },
        isDesktop = {
            linux: ua.match(/linux/i),
            mac: ua.match(/ios/i),
            windows: ua.match(/windows nt/i),
            any: function() {
                return this.linux||this.mac||this.windows;
            }
        },
        browser = {
            chrome: ua.match(/chrome/i),
            firefox: ua.match(/firefox/i),
            edge: ua.match(/edge/i),
            safari: ua.match(/safari/i),
            any: function () {
                return this.chrome||this.firefox||this.edge||this.safari;
            }
        };
    $infoDispositivo.innerHTML = `<ul>
        <li>Info: ${ua}</li>
        <li>Plataforma: ${isDesktop.any() ? isDesktop.any(): isMobile.any()}</li>
        <li>Navegador: ${browser.any()}</li>
    </ul>`;

    //Contenido exclusivo
    if (browser.chrome) {
        $infoDispositivo.innerHTML += `<p style = "color:blue">CONTENIDO EXCLUSIVO DE CHROME</p>`
    }
    if (browser.firefox) {
        $infoDispositivo.innerHTML += `<p style = "color:orange">CONTENIDO EXCLUSIVO DE FIREFOX</p>`
    }

    //Redirecci??n
    /* if (isMobile.android()) {
        window.location.href = "https://www.youtube.com";
    } */


    //Estado de la red
    const $estadoRedAviso = document.getElementById('advertencia-red');
    const estadoRedNormal = () =>{
        setTimeout(() => {
            $estadoRedAviso.classList.remove('advertencia-red-online');
            $estadoRedAviso.classList.remove('advertencia-red-offline');
            $estadoRedAviso.innerHTML = '';
        }, 3000);
        
        
    }
    const estadoRedOnline = () =>{
        
        console.log(navigator.onLine);
        $estadoRedAviso.classList.add('advertencia-red-online');
        $estadoRedAviso.innerHTML = `<h2>De nuevo en linea</h2>`;
    }
    const estadoRedOffline = () =>{
        
        console.log(navigator.onLine);
        $estadoRedAviso.classList.add('advertencia-red-offline');
        $estadoRedAviso.innerHTML = `<h2>Sin conexi??n</h2>`;

    }
    window.addEventListener('online', async e=>{
        
        if (navigator.onLine) {
            await estadoRedOnline();
            await estadoRedNormal();
            
        }
    } );
    window.addEventListener('offline',async e=>{
        if (!navigator.onLine) {
            await estadoRedOffline();
            await estadoRedNormal();
        }
    })

    //Webcam
     let $camara = document.getElementById('webcam');
     navigator.mediaDevices.getUserMedia({video:{width:480, height:240}, audio:false})
        .then(data =>{
            $camara.srcObject = data;
            $camara.play();
        })
        .catch(er =>{
            $camara.innerHTML = `Se produjo el siguiente error: ${er}`;
        })
    

    //Geolocalizaci??n
    const $geoContainer = document.getElementById('geo');
    const ubicacion = (latitud, longitud, precision,  contenedor) => {
        contenedor.innerHTML = `<p>Latitud: ${latitud}</p><p>Longitud: ${longitud}</p><p>Precisi??n: ${precision} metros</p>
        <a href="https://www.google.com/maps/@${latitud},${longitud}z" target="_blank">Abrir en Google Maps</a>`
        //https://www.google.com/maps/@19.0683728,-98.1229337,15z
        
    }
    if (!navigator) {
        $geoContainer.innerHTML = "La versi??n de tu navegador no soporta Geolocalizaci??n... ";
    }else{
        
        navigator.geolocation.getCurrentPosition((position) => {
            ubicacion(position.coords.latitude, position.coords.longitude, position.coords.accuracy ,$geoContainer);
            console.log(position)
          }, (e)=> $geoContainer.innerHTML = 'Ocurrio un error: '+e.message);

    }







});
