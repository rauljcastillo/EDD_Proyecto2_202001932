class NodoAvl {
    constructor(id,nombre,descripcion,puntuacion,precio,paginas,categoria) {
        this.id=id
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.puntuacion=puntuacion;
        this.precio=precio;
        this.paginas=paginas;
        this.categoria=categoria;
        this.comments=[]
        this.izquierda = null
        this.derecha = null
        this.altura = 0
    }
}

class AVL {
    constructor() {
        this.raiz = null
        this.recorrido=[]
    }

    agregar(id,nombre,descripcion,puntuacion,precio,paginas,categoria) {
        this.raiz = this.#agregar(id,nombre,descripcion,puntuacion,precio,paginas,categoria, this.raiz);
    }


    #agregar(id,nombre,descripcion,puntuacion,precio,paginas,categoria, nodo) {
        if (nodo == null) return new NodoAvl(id,nombre,descripcion,puntuacion,precio,paginas,categoria)

        if (id < nodo.id) {
            nodo.izquierda = this.#agregar(id,nombre,descripcion,puntuacion,precio,paginas,categoria, nodo.izquierda)
            if ((this.height(nodo.izquierda) - this.height(nodo.derecha)) == 2) {
                if(id<nodo.izquierda.id) return this.simpleDerecha(nodo)
                else return this.dobleDerecha(nodo)
                
            }
        }
        else if(id>nodo.id)  {
            nodo.derecha = this.#agregar(id,nombre,descripcion,puntuacion,precio,paginas,categoria, nodo.derecha)
            if ((this.height(nodo.izquierda) - this.height(nodo.derecha)) == -2) {
                if (id > nodo.derecha.id) return this.simpleIzquierda(nodo);    
                else return this.dobleIzquierda(nodo);  
            }
        }
        else{
            return
        }

        nodo.altura = this.maximo(this.height(nodo.izquierda),this.height(nodo.derecha))+1
        return nodo

    }


    simpleDerecha(nodo) {
        let aux = nodo.izquierda
        nodo.izquierda = aux.derecha
        aux.derecha = nodo
        nodo.altura = this.maximo(this.height(nodo.izquierda),this.height(nodo.derecha))+1
        aux.altura = this.maximo(this.height(aux.izquierda),this.height(aux.derecha))+1
        return aux
    }

    simpleIzquierda(nodo) {
        let aux = nodo.derecha
        nodo.derecha = aux.izquierda
        aux.izquierda = nodo
        nodo.altura = this.maximo(this.height(nodo.izquierda),this.height(nodo.derecha))+1
        aux.altura = this.maximo(this.height(aux.izquierda),this.height(aux.derecha))+1
        return aux
    }

    dobleDerecha(nodo) {
        nodo.izquierda = this.simpleIzquierda(nodo.izquierda)
        return this.simpleDerecha(nodo)
    }

    dobleIzquierda(nodo) {
        nodo.derecha = this.simpleDerecha(nodo.derecha)
        return this.simpleIzquierda(nodo)
    }

    height(nodo) {
        if (nodo == null) return -1
        return nodo.altura
    }

    maximo(x, y) {
        if (x > y) return x
        return y
    }


    #Preorder(nodo,temp="") {
        if (nodo != null) {
            temp+=`
                <div class="peliculas">
                    <span>${nodo.id}</span>
                    <p>${nodo.nombre}</p>
                    <div class="descripcion">
                        <p>${nodo.descripcion}</p>
                    </div>
                    <button name="information" id="information"></button>
                    <button name="cart" id="cart"></button>
                    <p>Precio: Q${nodo.precio}</p>
                </div>
            `;
            this.recorrido.push({"id":nodo.id,"nombre":nodo.nombre,"descripcion":nodo.descripcion,"puntuacion": nodo.puntuacion,"precio": nodo.precio,"paginas":nodo.paginas,"categoria":nodo.categoria})
            temp=this.#Preorder(nodo.izquierda,temp);
            temp=this.#Preorder(nodo.derecha,temp);

        }
        return temp
    }

    #buscar(nodo,id){
        if (nodo==null) return 
        if(nodo.id==id){
            return nodo;
        }
        if(id<nodo.id) return this.#buscar(nodo.izquierda,id)
        else return this.#buscar(nodo.derecha,id)

    }

    buscar(id){
        return this.#buscar(this.raiz,id)
    }



    preorder() {
        return this.#Preorder(this.raiz)
    }



    ordenarAscendente(){
        for (let index = 0; index < this.recorrido.length; index++) {
            let apuntador=index
            while(apuntador>=1 && this.recorrido[apuntador-1].nombre> this.recorrido[apuntador].nombre){
                let temp=this.recorrido[apuntador]
                this.recorrido[apuntador]=this.recorrido[apuntador-1]
                this.recorrido[apuntador-1]=temp
                apuntador--
            }
        }
        return this.generarString()
        
    }

    ordenarDescendente(){
        for (let index = 0; index < this.recorrido.length; index++) {
            let apuntador=index
            while(apuntador>=1 && this.recorrido[apuntador-1].nombre<this.recorrido[apuntador].nombre){
                let temp=this.recorrido[apuntador]
                this.recorrido[apuntador]=this.recorrido[apuntador-1]
                this.recorrido[apuntador-1]=temp
                apuntador--
            }
        }
        return this.generarString()
        
    }

    generarString(){
        let cadena=""
        this.recorrido.forEach(element=>{
            cadena+=`
            <div class="peliculas">
                <span>${element.id}</span>
                <p>${element.nombre}</p>
                <div class="descripcion">
                    <p>${element.descripcion}</p>
                </div>
                <button name="information" id="information"></button>
                <button name="cart" id="cart"></button>
                <p>Precio: Q${element.precio}</p>
            </div>`;
        })

        return cadena
    }

}

/*
let obj = new AVL()
obj.agregar(5);
obj.agregar(40);
obj.agregar(100);
obj.agregar(280);
obj.agregar(80);
obj.agregar(4020);
obj.agregar(9);


obj.buscar(9);
*/

