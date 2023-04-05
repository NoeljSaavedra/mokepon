const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque") 
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")





let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let inputLangostelvis 
let inputTucapalma 
let inputPydos 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasEnemigo = 5
let vidasJugador = 5
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap1.png"
let alturaQueBuscamos
let anchoDelMapa=window.innerWidth-30
const anchoMaximoDelMapa= 800
if(anchoDelMapa>anchoMaximoDelMapa){anchoDelMapa=anchoMaximoDelMapa-20}
alturaQueBuscamos=anchoDelMapa*600/1050
mapa.width=anchoDelMapa
mapa.height=alturaQueBuscamos


let altoMokepon 
let anchoMokepon 
if(window.innerWidth < 451){
    altoMokepon=28
    anchoMokepon=28
    

}
else {
        altoMokepon=40
        anchoMokepon=40
        
    }

class Mokepon {
    constructor (nombre, foto, vida, id = 0){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = anchoMokepon
        this.alto = altoMokepon
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
           this.mapaFoto,
           this.x,
           this.y,
           this.ancho,
           this.alto,
        )
    }
}
let hipodoge = new Mokepon("Hipodoge","./assets/hipodoge.png", 5,)

let capipepo = new Mokepon("Capipepo","./assets/capipepo.png", 5)

let ratigueya = new Mokepon("Ratigueya","./assets/ratigueya.png", 5)

let langostelvis = new Mokepon("Langostelvis","./assets/langostelvis.png", 5)

let tucapalma = new Mokepon("Tucapalma","./assets/tucapalma.png", 5)

let pydos = new Mokepon("Pydos","./assets/pydos.png", 5)



const HIPODOGE_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},

]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)



const RATIGUEYA_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)



const LANGOSTELVIS_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]

langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)


const TUCAPALMA_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
]

tucapalma.ataques.push(...TUCAPALMA_ATAQUES)


const PYDOS_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
]

pydos.ataques.push(...PYDOS_ATAQUES)


mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,tucapalma,pydos)


function iniciarJuego() {
     
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    sectionReiniciar.style.display = "none"
    

   
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputTucapalma = document.getElementById("Tucapalma")
        inputPydos = document.getElementById("Pydos")
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    

    botonReiniciar.addEventListener("click", reiniciarJuego)
    
    unirseAlJuego()
} 

function unirseAlJuego() {
    fetch("http://192.168.0.104:8080/unirse")
    .then((res)=>{if(res.ok){res.text().then((respuesta)=>{console.log(respuesta);jugadorId=respuesta})}})}

function seleccionarMascotaJugador() { 
    sectionSeleccionarMascota.style.display = "none"
    
    let jugar = 1;

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        } else if (inputCapipepo.checked){
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id
            }
        else if (inputRatigueya.checked){
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
            }
        else if (inputLangostelvis.checked){
            spanMascotaJugador.innerHTML = inputLangostelvis.id
            mascotaJugador = inputLangostelvis.id
            }
        else if (inputTucapalma.checked){
            spanMascotaJugador.innerHTML = inputTucapalma.id
            mascotaJugador = inputTucapalma.id
            }
        else if (inputPydos.checked){
            spanMascotaJugador.innerHTML = inputPydos.id
            mascotaJugador = inputPydos.id
            }
        else { 
            alert("No seleccionaste a ninguna mascota")
            jugar = 0;
            reiniciarJuego()
            } 
            
            if (jugar = 1) {
                
                seleccionarMokepon(mascotaJugador)

                extraerAtaques(mascotaJugador)
                sectionVerMapa.style.display = "flex"
                iniciarMapa()
                
            
           }      
   }

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.0.104:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    }) 
}

function extraerAtaques(mascotaJugador){let ataques
    for(let i=0;i<mokepones.length;i++){if(mascotaJugador===mokepones[i].nombre){ataques=mokepones[i].ataques}}
    mostrarAtaques(ataques)}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon=`
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    `
contenedorAtaques.innerHTML+=ataquesMokepon

})

botonFuego=document.getElementById("boton-fuego")
botonAgua=document.getElementById("boton-agua")
botonTierra=document.getElementById("boton-tierra")
botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque(){

    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
            if (e.target.textContent === "🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                
                boton.disabled = true 
            } else if (e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                
                boton.disabled = true
            }
            else {
                    ataqueJugador.push("TIERRA")
                    console.log(ataqueJugador)
        
                    boton.disabled = true
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
    
}

function enviarAtaques(){fetch(`http://192.168.0.104:8080/mokepon/${jugadorId}/ataques`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({ataques:ataqueJugador})})
intervalo=setInterval(obtenerAtaques,50)}


function obtenerAtaques(){fetch(`http://192.168.0.104:8080/mokepon/${enemigoId}/ataques`).then(function(res){if(res.ok){res.json().then(function({ataques}){if(ataques.length===5){ataqueEnemigo=ataques
combate()}})}})}




function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML= enemigo.nombre

    ataquesMokeponEnemigo=enemigo.ataques

    secuenciaAtaque()
}


function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("LOS MOKEPONES UTILIZARON EL MISMO ATAQUE")
        }
         else if(ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes(index, index)
        crearMensaje("EL ENEMIGO PERDIO 1 VIDA")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
         
    }   else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
        indexAmbosOponentes(index, index)
        crearMensaje("EL ENEMIGO PERDIO 1 VIDA")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
        
    }   else if(ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") { 
        indexAmbosOponentes(index, index)
        crearMensaje("EL ENEMIGO PERDIO 1 VIDA")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    }   else {
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE 1 VIDA")
        victoriasEnemigo++
       spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
}
revisarVidas()
}
function revisarVidas(){
    
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!⚔️")
        document.getElementById('pelea').style.display = 'none';

        
    }
    else if (victoriasJugador > victoriasEnemigo){
    crearMensajeFinal("FELICITACIONES! Ganaste 🎉")
       // document.getElementById('mensajes').style.display = 'none';
        //document.getElementById('vidas-j').style.display = 'none';
       // document.getElementById('vidas-e').style.display = 'none';
       document.getElementById('pelea').style.display = 'none';
       
    }   
    else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("Lo siento, perdiste 😔")
        //document.getElementById('mensajes').style.display = 'none';
       // document.getElementById('vidas-j').style.display = 'none';
       // document.getElementById('vidas-e').style.display = 'none';
       document.getElementById('pelea').style.display = 'none';
    } 
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)   
}


function crearMensajeFinal(resultadoFinal){

    sectionMensajes.innerHTML = resultadoFinal
    
    sectionReiniciar.style.display = "block"  
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor( Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height

    )

    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

   mokeponesEnemigos.forEach(function(mokepon){
    mokepon.pintarMokepon()
    revisarColision(mokepon)
   })
    
}

function enviarPosicion(x,y){
fetch(`http://192.168.0.104:8080/mokepon/${jugadorId}/posicion`,{ 
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        x,
        y
    })
    })
    .then(function(res){
        if (res.ok){
            res.json()
            .then(function({enemigos}){
                
                mokeponesEnemigos= enemigos.map(function(enemigo){
                    console.log({enemigo});
                    let mokeponEnemigo = null
                    const mokeponNombre=enemigo.mokepon.nombre||""
                    
                    if(mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon("Hipodoge","./assets/hipodoge.png", 5, enemigo.id)
                    } else if (mokeponNombre === "Capipepo"){
                        mokeponEnemigo = new Mokepon("Capipepo","./assets/capipepo.png", 5, enemigo.id)
                    } else if (mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon("Ratigueya","./assets/ratigueya.png", 5, enemigo.id)
                    } else if (mokeponNombre === "Langostelvis"){
                        mokeponEnemigo = new Mokepon("Langostelvis","./assets/langostelvis.png", 5, enemigo.id)
                    } else if (mokeponNombre === "Tucapalma"){
                        mokeponEnemigo = new Mokepon("Tucapalma","./assets/tucapalma.png", 5, enemigo.id)
                    } else if (mokeponNombre === "Pydos"){
                        mokeponEnemigo = new Mokepon("Pydos","./assets/pydos.png", 5, enemigo.id)
                    }
                    mokeponEnemigo.x=enemigo.x||0
                    mokeponEnemigo.y=enemigo.y||0

                    return mokeponEnemigo
                })
            })
        }}
        )
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

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
    
        default:
            break
    }
}

function iniciarMapa()
{
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);

    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener("keydown",sePresionoUnaTecla)
    
    window.addEventListener("keyup",detenerMovimiento)
}

function obtenerObjetoMascota(){
    for(let i=0;i<mokepones.length;i++){if(mascotaJugador===mokepones[i].nombre){
        return mokepones[i]

}
}
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota= mascotaJugadorObjeto.y
    const abajoMascota= mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota= mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota= mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    
}

window.addEventListener("load", iniciarJuego)
