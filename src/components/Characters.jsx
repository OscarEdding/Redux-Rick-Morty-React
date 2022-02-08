import React from "react"

import { useDispatch, useSelector } from "react-redux"
import {getRamAction, nextRamAction, previousRamAction} from '../redux/rickAndMortyDucks'

const Characters = () => {
    const dispatch = useDispatch() /* Declaramos dispatch el cual va a disparar
    nuestra/s acción obtenerPokemonsAction */

    const characters = useSelector(store => store.characters.results)
    /* El useSelector devuelve a traves de una función de flecha, todo nuestro store
    y retornamos nuestro array que se encuentra en la tienda (store.characters.array) */
    const next = useSelector(store => store.characters.info.next)
    const prev = useSelector(store => store.characters.info.prev)

	return (
        <div className="row mt-5">
            <div className="col-md-6">
                <p class="center"><h3>Lista de Personajes</h3></p>
                <br />
                <div className="d-flex justify-content-between mt-4">
                    {
                        characters.length === 0 &&
                        <button onClick={() => dispatch(getRamAction())} className="btn btn-dark">Get Characters</button>
                    }

                    {
                        next &&
                        <button onClick={() => dispatch(nextRamAction())} className="btn btn-dark">Next ▶</button>
                    }

                    {
                        prev &&
                        <button onClick={() => dispatch(previousRamAction())} className="btn btn-dark">◀ Previous</button>
                    }
                    
                </div>
                <ul className="list-group mt-4">
                    {
                        characters.map(item => (
                            <li key={item.id} className="list-group-item text-uppercase">
                                {item.name}
                            </li>
                        ))
                    } {/* Pintamos los personajes en una lista */}
                </ul>
            </div>
        </div>
    )
    {/* Si el pokemones.length es 0, que se muestre el botón Obtener Pokemones */}
    {/* -------------------------- FLUJO DUCKS -------------------------- */}
    {/* Nuestra lista de personajes va a viajar directamente a nuestro array inicial,
    ya que una vez que presionemos el botón, va ir al try, va a decir "intenta
    consumir esta api". En el caso de que NO falle, vamos a ejecutar el dispatch
    el cual va a generar un type que es GET_POKE_SUCCESS y va a ejecutar 
    nuestro return en el caso perteneciente a este type en el switch, pero
    sin antes de que nosotros le enviemos el payload que contiene todos los 
    pokemones. Este payload va a viajar al action con la key peyload,
    por lo tanto, en el return nosotros devbolvemos el state que en este caso 
    será nuestro array vacio, pero le indicamos que el array ya no este vacio,
    sino que ahora sea lo que venga del payload. (Video número 105 - 07:40) */}
} 

export default Characters
