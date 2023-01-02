class NodoLista{
    constructor(dpi,nombre,usuario,correo,contrasenia,telefono){
        this.dpi=dpi;
        this.nombre=nombre;
        this.usuario=usuario;
        this.correo=correo;
        this.contrasenia=contrasenia;
        this.telefono=telefono;
        this.siguiente=null
    }
}

class ListaSimple{
    constructor(){
        this.primero=null
        this.ultimo=null
    }

    agregar(dpi,nombre,usuario,correo,contrasenia,telefono){
        if(this.primero==null){
            this.primero=new NodoLista(dpi,nombre,usuario,correo,contrasenia,telefono)
            this.ultimo=this.primero
            return
        } 
        this.ultimo.siguiente=new NodoLista(dpi,nombre,usuario,correo,contrasenia,telefono)
        this.ultimo=this.ultimo.siguiente

    }


    buscar(usuario,password){
        let actual=this.primero
        while(actual!=null){
            if(actual.usuario==usuario && password==actual.contrasenia) return actual.nombre
            actual=actual.siguiente
        }
    }

    recorrer(){
        let actual=this.primero
        while(actual!=null){
            console.log(actual.nombre)
            actual=actual.siguiente
        }
    }
}


