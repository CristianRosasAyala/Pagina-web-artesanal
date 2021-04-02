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
        $countdown.innerHTML = '¡Feliz año nuevo!'
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
let sol = '☀️', luna = '🌙';

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
        console.log(e)
        $youtube.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/36DCuT1KxM4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        $maps.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26963634.440306917!2d86.05396959850373!3d34.41508716680059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31508e64e5c642c1%3A0x951daa7c349f366f!2sChina!5e0!3m2!1ses!2smx!4v1616879754840!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    }else{
        $youtube.innerHTML = `<a href="https://www.youtube.com/watch?v=36DCuT1KxM4&ab_channel=bcdaeiou" target="_blank">Ver video</a>`
        $maps.innerHTML = `<a href="https://goo.gl/maps/RPNwkngoTpRgFg8M9" target="_blank">Ver mapa</a>`
    }
}


breakpoint.addEventListener('change', responsive);

responsive(breakpoint);

//Páginas 
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
    
    //Botón abrir ventana
    if (e.target.matches('#btn-abrirVentana')) {
        
        let url = document.getElementById('url').value,
            ancho = document.getElementById('ancho').value,
            largo = document.getElementById('largo').value;
        abrirVentana(url, ancho, largo);
    }
    //Botón cerrar ventana
    if (e.target.matches('#btn-cerrarVentana')){
        
        if (newUrl) {
            newUrl.close();
            newUrl = null;
        }else{
            alert('No hay ventana para cerrar');
        }
    }
});







});
