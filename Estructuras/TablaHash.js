class NodoHash {
    constructor(id,categoria) {
        this.id=id;
        this.categoria=categoria

    }
}


class Lista {
    constructor() {
        this.lista = []
    }

    isNull() {
        return this.lista.length == 0
    }

    agregarLista(id,categoria) {
        this.lista.push(new NodoHash(id,categoria))
    }
}

class TablaHash {
    constructor(tamanio) {
        this.tamanio = tamanio;
        this.table = []
        this.ocupados = 0
        for (let i = 0; i < tamanio; i++) {
            this.table.push(new Lista())
        }
    }

    agregar(id,company) {
        let indice = this.indexTabla(id);
        if (this.table[indice].isNull()) {
            this.ocupados++
        }

        this.table[indice].agregarLista(id,company)
        this.rehashing()


    }

    indexTabla(id) {
        return id % this.tamanio;
    }

    rehashing() {
        let porcentaje = this.ocupados / this.tamanio
        if (porcentaje > 0.75) {
            let tempTabla = this.table;
            this.tamanio = this.tamanio * 5;
            this.table = [];

            for (let indice = 0; indice < this.tamanio; indice++) {
                this.table.push(new Lista())
            }


            for (let index = 0; index < tempTabla.length; index++) {
                if (!tempTabla[index].isNull()) {
                    let temp = tempTabla[index].lista
                    for (let j = 0; j < temp.length; j++) {
                        let indice = this.indexTabla(temp[j].id)
                        this.table[indice].agregarLista(temp[j].id,temp[j].categoria)

                    }
                }

            }
            tempTabla = null

        }

    }
    
    recorrer(){
        let temp
        let contenido=""
        for(let i=0; i<this.tamanio; i++){
            if(!this.table[i].isNull()){
                temp=this.table[i].lista
                temp.forEach(element =>{
                    contenido+=`
                        <div class="categoria">
                            <p>ID: ${element.id}</p>
                            <p>Compañia: ${element.categoria}</p>
                        </div>
                    `;
                    
                })
            }
            
            
        }

        return contenido
    }
    


}