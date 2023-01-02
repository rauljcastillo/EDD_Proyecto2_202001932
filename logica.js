//-------------Instancias------------------
let clientes=new ListaSimple()
let actores=new ArbolBinario()
let peliculas=new AVL()
let thash=new TablaHash(20)
let comments
let usuario_nombre=null

//-------------Finaliza instancias---------


//Login y admin 
let user_admin={
    "dpi": "123123",
    "nombre": "Raul",
    "usuario": "raulc",
    "password": "123",
    "telefono": "4229744",
}

//Checkbox
let check=document.getElementById("admin")


document.querySelector(".login form").addEventListener("submit",(e)=>{
    e.preventDefault()
    if(check.checked){
        let a=document.getElementById("usuario").value
        let b=document.getElementById("password").value
        if(user_admin.usuario==a && user_admin.password==b){
            document.querySelector(".admin").style.display="block"
            document.querySelector(".login").style.display="none"
            document.querySelector(".login form").reset()
            return 
        }

        alert("Administrador no encontrado")
        return
    }
    let a=document.getElementById("usuario").value
    let b=document.getElementById("password").value
    usuario_nombre=clientes.buscar(a,b)
    if(usuario_nombre){
        document.querySelector(".usuario").style.display="block";
        document.querySelector(".login").style.display="none";
        document.querySelector(".bienvenida").innerHTML=`<p>Bienvenido: ${usuario_nombre}</p>`;
        document.querySelector(".contenido-pel").innerHTML=peliculas.preorder()
        document.querySelector(".contenido-categories").innerHTML=thash.recorrer()
        document.querySelector(".contenido-actores").innerHTML=actores.Preorder()
        document.querySelector(".login form").reset()
        return
    }

    alert("Usuario no encontrado")



    
})


//-------------------------Ocultar o mostrar componentes------------------------

function formPeliculas(){
    document.querySelector(".form-peliculas").style.display="flex"
    document.querySelector(".form-clientes").style.display="none"
    document.querySelector(".form-actores").style.display="none"
    document.querySelector(".form-categorias").style.display="none"

}

function formClientes(){
    document.querySelector(".form-peliculas").style.display="none"
    document.querySelector(".form-clientes").style.display="flex"
    document.querySelector(".form-actores").style.display="none"
    document.querySelector(".form-categorias").style.display="none"
}

function formActores(){
    document.querySelector(".form-peliculas").style.display="none"
    document.querySelector(".form-clientes").style.display="none"
    document.querySelector(".form-actores").style.display="flex"
    document.querySelector(".form-categorias").style.display="none"
}

function formCategorias(){
    document.querySelector(".form-peliculas").style.display="none"
    document.querySelector(".form-clientes").style.display="none"
    document.querySelector(".form-actores").style.display="none"
    document.querySelector(".form-categorias").style.display="flex"
}

function SesionAdmin(){
    document.querySelector(".admin").style.display="none";
    document.querySelector(".login").style.display="block";

}

function SesionUSuario(){
    document.querySelector(".usuario").style.display="none";
    document.querySelector(".login").style.display="block";
    document.querySelector(".contenido-carrito").innerHTML="";

}


//------------------Seccion de cargar archivos--------------------
document.querySelector(".form-peliculas form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let archivo=document.getElementById("file-1").files[0];
    let reader=new FileReader()
    let contenido
    reader.onload= function (e){
        contenido=e.target.result;
        contenido=JSON.parse(contenido);

    }

    reader.readAsText(archivo)
})

//Esta funcion lee el archivo de clientes 
document.querySelector(".form-clientes form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let archivo=document.getElementById("file-2").files[0];
    let reader=new FileReader()
    let contenido
    reader.onload=function (e){
        contenido=e.target.result;
        contenido=JSON.parse(contenido)
        contenido.forEach(element => {
            clientes.agregar(element.dpi,element["nombre_completo"],element["nombre_usuario"],element.correo,element.contrasenia,element.telefono)
        })

    }
    reader.readAsText(archivo)
    document.querySelector(".form-clientes form").reset()
    alert("Archivo de usuarios cargado")
})

//Esta funcion lee el archivo de actores 
document.querySelector(".form-actores form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let archivo=document.getElementById("file-3").files[0];
    let reader=new FileReader()
    let contenido
    reader.onload=function (e){
        contenido=e.target.result;
        contenido=JSON.parse(contenido)
        contenido.forEach(element => {
            actores.agregar(element.dni,element["nombre_actor"],element.correo,element.descripcion)
        })

    }
    reader.readAsText(archivo)
    document.querySelector(".form-actores form").reset()
    alert("Archivo de actores cargado")
})


//Esta funcion lee el archivo de peliculas
document.querySelector(".form-peliculas form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let archivo=document.getElementById("file-1").files[0];
    let reader=new FileReader()
    let contenido
    reader.onload=function (e){
        contenido=e.target.result;
        contenido=JSON.parse(contenido)
        contenido.forEach(element => {
            peliculas.agregar(element["id_pelicula"],element["nombre_pelicula"],element["descripcion"],element["puntuacion_star"],element["precio_Q"],element["paginas"],element["categoria"])
        })

    }
    reader.readAsText(archivo)
    document.querySelector(".form-peliculas form").reset()
    alert("Archivo de peliculas cargado")

})


//Esta funcion lee el archivo de categorias
document.querySelector(".form-categorias form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let archivo=document.getElementById("file-4").files[0];
    let reader=new FileReader()
    let contenido
    reader.onload=function (e){
        contenido=e.target.result;
        contenido=JSON.parse(contenido)
        contenido.forEach(element => {
            thash.agregar(element["id_categoria"],element["company"])
        })

    }
    reader.readAsText(archivo)
    document.querySelector(".form-categorias form").reset()
    alert("Archivo de categorias cargado")

})


//--------------Termina la seccion cargar archivos-----------------


//----Funcion para mostrar actores o peliculas,etc
function mostrarActores(){
    document.querySelector(".mostrar-peliculas").style.display="none"
    document.querySelector(".mostrar-actores").style.display="block"
    document.querySelector(".carrito").style.display="none"
    document.querySelector(".mostrar-categorias").style.display="none"

}

function mostrarPeliculas(){
    document.querySelector(".mostrar-peliculas").style.display="flex"
    document.querySelector(".mostrar-actores").style.display="none"
    document.querySelector(".carrito").style.display="none"
    document.querySelector(".mostrar-categorias").style.display="none"
}


function mostrarCarro(){
    document.querySelector(".mostrar-peliculas").style.display="none"
    document.querySelector(".mostrar-actores").style.display="none"
    document.querySelector(".carrito").style.display="block"
    document.querySelector(".mostrar-categorias").style.display="none"
}


function mostrarCategorias(){
    document.querySelector(".mostrar-peliculas").style.display="none"
    document.querySelector(".mostrar-actores").style.display="none"
    document.querySelector(".carrito").style.display="none"
    document.querySelector(".mostrar-categorias").style.display="block"
}

//----------------------------Añadir evento click al div de cada pelicula------------------
document.querySelector(".contenido-pel").addEventListener("click",(e)=>{
    if(e.target.name=="information"){
        let padre=e.target.parentElement
        let id=padre.querySelector("span").textContent;
        comments=peliculas.buscar(id)
        let titulo=padre.getElementsByTagName("p")[0].textContent
        
        let descr=padre.querySelector(".descripcion p").textContent
        
        let price=padre.getElementsByTagName("p")[2].textContent
        let inform=document.querySelector(".info-pel")
        inform.querySelector("h2").textContent=titulo
        inform.querySelector(".popup-descrip p").textContent=descr
        inform.querySelector(".puntaje h2").textContent=price
        let inputs=inform.getElementsByTagName("input")
        //{name: "RAul", "message": "Muy buena"}
        inform.querySelector(".comments").innerHTML=""
        comments.comments.forEach(element=>{
            inform.querySelector(".comments").innerHTML+=`<p>${element.name}: ${element.message}</p>`;
        })

        for(let i=0; i<inputs.length; i++){
            if(inputs[i].value==comments.puntuacion){
                inputs[i].checked=true
                break;
            }
        }
        

        inform.style.display="block"


    }else if(e.target.name=="cart"){
        let padre=e.target.parentElement
        let titulo=padre.getElementsByTagName("p")[0].textContent
        let price=padre.getElementsByTagName("p")[2].textContent
        document.querySelector(".contenido-carrito").innerHTML+=`
            <div class="product">
                <p>${titulo}</p>
                <p>${price}</p>
            </div>
        `;

        alert("Pelicula agregada al carrito")

    }
})

//----Alquiler cada pelicula desde el pop pup
document.getElementById("alquilar").addEventListener("click",(e)=>{
    let title=e.target.parentElement.parentElement.getElementsByTagName("h2")[0].textContent
    let price=e.target.parentElement.parentElement.getElementsByTagName("h2")[1].textContent
    document.querySelector(".contenido-carrito").innerHTML+=`
        <div class="product">
            <p>${title}</p>
            <p>${price}</p>
        </div>
        `;
    alert("Pelicula agregada al carrito")
})

//-----------Publicar comentario--------
document.querySelector(".publicar form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let coment=document.getElementById("comentario").value
    comments.comments.push({"name": usuario_nombre, "message": coment})
    document.querySelector(".comments").innerHTML+=`<p>${usuario_nombre}: ${coment}</p>`;
    document.querySelector(".publicar form").reset()
})

//----------------------------Modificar puntuacion---------------------
function modificarPunt(){
    let a=document.querySelector(".clasificacion").getElementsByTagName("input")
    for(let i=0; i<a.length;i++){
        if(a[i].checked){
            comments.puntuacion=parseInt(a[i].value,10);
            break;
        }
    }
}


//---------Div informacion de la pelicula ------
function ocultarInfor(){
    document.querySelector(".info-pel").style.display="none";

}


document.getElementById("ordenar").addEventListener("change",(e)=>{
    if(e.target.options[document.getElementById("ordenar").selectedIndex].value=="As"){
        document.querySelector(".contenido-pel").innerHTML=peliculas.ordenarAscendente()
    }else if(e.target.options[document.getElementById("ordenar").selectedIndex].value=="Des"){
        document.querySelector(".contenido-pel").innerHTML=peliculas.ordenarDescendente()
    }
})


//--------Funcion que crean las diferentes tarjetas-------

function pelicula(){
    document.querySelector(".contenido-pel").innerHTML=peliculas.preorder()
}


//-------Aplica el recorrido para los actores---------
document.getElementById("recorrido").addEventListener("change",(e)=>{
    if(e.target.options[document.getElementById("recorrido").selectedIndex].value=="pre"){
        document.querySelector(".contenido-actores").innerHTML=actores.Preorder()
    }else if(e.target.options[document.getElementById("recorrido").selectedIndex].value=="en"){
        document.querySelector(".contenido-actores").innerHTML=actores.Enorder()
    }else if(e.target.options[document.getElementById("recorrido").selectedIndex].value=="post"){
        document.querySelector(".contenido-actores").innerHTML=actores.Postorder()
    }
})


//------Genera las tarjetas de categorias-------
function categorias(){
    document.querySelector(".contenido-categories").innerHTML=thash.recorrer()
}
