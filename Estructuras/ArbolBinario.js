class NodoArbol{
    constructor(dni,nombre,correo,descripcion){
        this.dni=dni;
        this.nombre=nombre;
        this.correo=correo;
        this.descripcion=descripcion;
        this.izquierda=null
        this.derecha=null
    }
}

class ArbolBinario{
    constructor(){
        this.raiz=null
    }

    agregar(dni,nombre,correo,descripcion){
        if(this.raiz==null){
            this.raiz=new NodoArbol(dni,nombre,correo,descripcion)
            return
        }

        this.#agregarNodo(this.raiz,dni,nombre,correo,descripcion)
    }

    #agregarNodo(nodo,dni,nombre,correo,descripcion){
        if(dni<nodo.dni){
            if(!nodo.izquierda) nodo.izquierda=new NodoArbol(dni,nombre,correo,descripcion)
            else this.#agregarNodo(nodo.izquierda,dni,nombre,correo,descripcion)

        }else{
            if(!nodo.derecha) nodo.derecha=new NodoArbol(dni,nombre,correo,descripcion)
            else this.#agregarNodo(nodo.derecha,dni,nombre,correo,descripcion)
        }
    }

    #Preorder(nodo,temp=""){
        if(nodo!=null){
            temp+=`
            <div class="actor">
                <span>${nodo.nombre}</span>
                <p>${nodo.descripcion}</p>
            </div>
            `;
            temp=this.#Preorder(nodo.izquierda,temp)
            temp=this.#Preorder(nodo.derecha,temp)
            


        }

        return temp
    }


    Preorder(){
        return this.#Preorder(this.raiz)
    }

    #Enorder(nodo,temp=""){
        if(nodo!=null){
            temp=this.#Enorder(nodo.izquierda,temp)
            temp+=`
            <div class="actor">
                <span>${nodo.nombre}</span>
                <p>${nodo.descripcion}</p>
            </div>
            `;
            temp=this.#Enorder(nodo.derecha,temp)
            
        }
        return temp
    }

    Enorder(){
        return this.#Enorder(this.raiz)
    }


    #Postorder(nodo,temp=""){
        if(nodo!=null){
            temp=this.#Postorder(nodo.izquierda,temp)
            temp=this.#Postorder(nodo.derecha,temp)
            temp+=`
            <div class="actor">
                <span>${nodo.nombre}</span>
                <p>${nodo.descripcion}</p>
            </div>
            `;
            
        }
        return temp
    }

    Postorder(){
        return this.#Postorder(this.raiz)
    }


}

