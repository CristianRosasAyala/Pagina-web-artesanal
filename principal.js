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

console.log(localStorage)
let sol = '☀️', luna = '🌙';

document.addEventListener('click', e=>{
    if (e.target.matches('.boton-dianoche')) {
        console.log(e)
        console.log(document.body)
        
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