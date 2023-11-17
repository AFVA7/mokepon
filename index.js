const express = require('express');//importamos express
const cors = require('cors');//importamos cors
const app = express();//instancia del servidor express 

app.use(express.static('public'))//usamos express para servir archivos estaticos
app.use(cors())//usamos cors para que el servidor acepte peticiones de cualquier origen
app.use(express.json())//usamos express para que el servidor acepte json

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actializarPosicion(x, y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    } 
}

//servicio num 1
//le decimos al servidor reciba una peticion get en la url /unirse 
app.get("/unirse", (req, res) => {// la ruta raiz sería esta "/"
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})//ruta o end point y arrow function con parametros de request y response

//servicio num 2 jugadirId en este caso es una variable tipo parametro
app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "" //se extrae los parametros de la url
    const nombre = req.body.mokepon || "" //se extrae el body de la peticion
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()//termina la respuesta
})




//añadimos un nuevo end point de tipo post
//Esto es el 3rd servicio que recibe un jugadorId y una posicion y que será consumido por el cliente
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
     const jugadorId = req.params.jugadorId || ""
     const x = req.body.x || 0
     const y = req.body.y || 0
     const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
     if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actializarPosicion(x, y)
     }

     const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

     //En expressjs no se puede enviar un objeto(lista) como respuesta, solo json
     res.send({
            enemigos
     })  
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "" 
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    //busco el jugador y si existe le asigno los ataques
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "" 
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
   
    res.send({
        ataques: jugador.ataques || []
    })
})

//le decimos al servidor que escuche constantemente en el puerto 8080
app.listen(8080, () => {
    console.log('servidor funcionando en 8080')
});//puerto de escucha y arrow function con aviso de que el servidor esta corriendo