
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton-seleccionar')
const botonReiniciar = document.getElementById("boton-reiniciar")
seccionReiniciar.style.display = 'none'

const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spamMascotaJugador = document.getElementById('mascota-jugador')
const spamMascotaEnemigo = document.getElementById('mascota-enemigo')

const spamVidasJugador = document.getElementById("vidas-jugador")
const spamVidasEnemigo = document.getElementById("vidas-enemigo")

const ataquesDelJugador  = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionMensaje  = document.getElementById('resultado')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let enemigoId = null
let jugadorId = null
let mokepones = []
let mokeponesEnemigos = []	
let ataqueJugador = []
let ataqueEnemigo=[]
let opcionDeMokepones 
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let inputDino
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua
let botonTierra  
let botonEstrella
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let VidasJugador =3
let VidasEnemigo =3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth-20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre,foto,vidas,fotoMapa,id = 0){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this. vidas = vidas
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width-this.ancho)
        this.y = aleatorio(0,mapa.height-this.alto)  
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5,'./assets/hipodoge.webp')

let capipepo = new Mokepon('Capipepo',"./assets/mokepons_mokepon_capipepo_attack.webp",5,'./assets/capipepo.webp')

let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp',5,'./assets/ratigueya.webp')

let dino = new Mokepon('Dino','https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bbbe.png',5,'https://w7.pngwing.com/pngs/160/655/png-transparent-tyrannosaurus-dinosaur-cartoon-illustration-cartoon-dinosaur-cartoon-character-white-orange.png')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'}
]
const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'}
]
const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
]
const DINO_ATAQUES = [
    {nombre: '💫', id: 'boton-estrella'},
    {nombre: '💫', id: 'boton-estrella'},
    {nombre: '💫', id: 'boton-estrella'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
dino.ataques.push(...DINO_ATAQUES) 

mokepones.push(hipodoge,capipepo,ratigueya,dino)

function iniciaJuego(){
    //todo elemento HTML ya tiene un estilo por defecto, los tamaños de los botones, color de las letras...
    seccionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach(mokepon => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    inputDino = document.getElementById('Dino')
    
    botonMascota.addEventListener('click',seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click',reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){

    fetch("http://localhost:8080/unirse")
    .then((res) => {
        if(res.ok){
            res.text()
            .then((respueta) => {
                console.log(respueta);
                jugadorId = respueta
            })
        }
    })
}

function seleccionarMascotaJugador(){

    if(inputHipodoge.checked){
        spamMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spamMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spamMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else if(inputDino.checked){
        spamMascotaJugador.innerHTML = inputDino.id
        mascotaJugador = inputDino.id
    }else{
        alert("TIENES QUE SELECCIONAR A UNA MASCOTA")
        return//si no se selecciona una mascota, no se ejecuta el resto del codigo
    }

    seccionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({//JSON.stringify convierte un objeto JSON a un string
           
            mokepon: mascotaJugador
        })
    })//como segundo parametro se le pasa un objeto JSON con la configuracion de la peticion
    //al JSON le agragamos el metodo, que tipo de dato se va a enviar y los datos que vamos a enviar
}

function extraerAtaques(mascotaJugador){
    let ataques
    mokepones.forEach(mokepon => {
        if(mascotaJugador === mokepon.nombre){
            ataques = mokepon.ataques
        }
    })
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach(ataque => {
    ataquesMokepon = `
    <button id=${ataque.id} class="boton-ataque">${ataque.nombre}</button>`
    contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botonEstrella = document.getElementById("boton-estrella")
    botones = document.querySelectorAll('.boton-ataque')
    
}

function secuenciaAtaques(){
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }else if(e.target.textContent === "🌱"){
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }else{
                ataqueJugador.push("ESTRELLA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if(ataqueJugador.length === 5){
                enviarAtaque()
            }
        })
    })
}

function enviarAtaque(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50) 
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                .then(function({ataques}){
                    if(ataques.length === 5){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}
function seleccionarMascotaEnemigo(enemigo){
    
    spamMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaques()
}

function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){ 
            indexAmbosOponentes(i,i)
            crearMensaje("EMPATASTE")
        }else if(ataqueJugador[i]==='FUEGO' && ataqueEnemigo[i]==='TIERRA'){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] ==='AGUA' && ataqueEnemigo[i] === 'FUEGO' ){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
            console.log(victoriasJugador)
        }else if(ataqueJugador[i] ==='TIERRA' && ataqueEnemigo[i] === 'AGUA' ){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            console.log(victoriasJugador)
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] ==='ESTRELLA' && ataqueEnemigo[i] === 'AGUA' ){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] ==='ESTRELLA' && ataqueEnemigo[i] === 'FUEGO' ){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[i] ==='ESTRELLA' && ataqueEnemigo[i] === 'TIERRA' ){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spamVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(i,i)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spamVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES GANASTE :) ")
    }else{
        crearMensajeFinal("Lo siento, perdiste :( ")
    }
}

function crearMensaje(resultado){

    let nuevoAtaquesDelJugador = document.createElement('p')
    let nuevoAtaquesDelEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaquesDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaquesDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaquesDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaquesDelEnemigo)

}
function crearMensajeFinal(resultadoFinal){
    
    sectionMensaje.innerHTML =  resultadoFinal 
    seccionReiniciar.style.display = 'block'

}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarMokepon()
    
    enviarPosicon(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon()
    revisarColision(mokepon)
    })       
}

function enviarPosicon(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,//x: x
            y//y: y
        })
    })
    .then(function (res) {
        if(res.ok){
            res.json()
            .then(function ({enemigos}) {
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null //se crea una variable por cada iteracion
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if(mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5,'./assets/hipodoge.webp',enemigo.id)
                    }else if(mokeponNombre === "Capipepo"){
                        mokeponEnemigo = new Mokepon('Capipepo',"./assets/mokepons_mokepon_capipepo_attack.webp",5,'./assets/capipepo.webp',enemigo.id)
                    }else if(mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp',5,'./assets/ratigueya.webp',enemigo.id)
                    }else if(mokeponNombre === "Dino"){
                        mokeponEnemigo = new Mokepon('Dino','https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bbbe.png',5,'https://w7.pngwing.com/pngs/160/655/png-transparent-tyrannosaurus-dinosaur-cartoon-illustration-cartoon-dinosaur-cartoon-character-white-orange.png',enemigo.id)
                    }

                    mokeponEnemigo.x = enemigo.x || 0
                    mokeponEnemigo.y = enemigo.y || 0

                    return mokeponEnemigo
                })
            })
        }
    })
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function moverPersonaje(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto,mascotaJugador)
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener('keydown',moverPersonaje)
    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota(){
    for(let i=0; i<mokepones.length; i++){
        if(mascotaJugador===mokepones[i].nombre){
            return mokepones[i]
        }
     }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se decto colision")
    enemigoId = enemigo.id
    seccionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener('load', iniciaJuego)
