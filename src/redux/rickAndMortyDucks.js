import axios from "axios" // Necesario para el llamado a la api

// Constants
const dataInicial = {
    info: {
        count: 0,
        next: null,
        pages: 0,
        prev: null,
    },
    results: []
    
}
/* Las constantes toman una data inicial que tienen nuestros estados
que estarán limpios o vacíos por defecto. */

// Types
const GET_RAM_SUCCESS = 'GET_RAM_SUCCESS'
const NEXT_RAM_SUCCESS = 'NEXT_RAM_SUCCESS'
const PREVIOUS_RAM_SUCCESS = 'NEXT_RAM_SUCCESS'
/* Los Types son constantes que generalmente van en mayúsculas y nosotros
describimos lo más específicamente posible lo que va a hacer
nuestro switch y eso va a ser igual a nuestra constante. */

// Reducer
export default function ramReducer(state = dataInicial, action){
    switch(action.type) {
        case GET_RAM_SUCCESS:
            return {...state, ...action.payload} /* Este caso retorna 
            un objeto con una acción que modifica nuestro state: El
            state tiene que ser copiado de la data inicial (con los 3
            puntitos accedemos al array), el array va a ser igual al 
            action.payload que es nuestro array de personajes, por lo tanto
            cuando nosotros tengamos una acción de getRamAction,
            en nuestro Reducer se van a enviar toda esa lista de personajes
            a nuestro state (data inicial). */
        case NEXT_RAM_SUCCESS:
            return {...state, ...action.payload}
            /*Hacemos el caso de NEXT_RAM_SUCCESS el cual retorna lo que venga del
            state ya modificado, el array que es igual a action.payload.array que es 
            otro array con los 20 siguientes personajes y además el offset va a ser igual
            a action.payload.offset el cual por cada siguiente sumará 20. */
        case PREVIOUS_RAM_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
        /* Es recomendable colocar un default en el caso de que no se lea ninguna
        de las opciones (casos) que le mandemos y retornamos nuestro state
        que puede ser nuestro estado inicial o nuestro estado ya modificado */
    } /* El switch va a leer las action (nuestra acción obtenerPokemonsAction)
    luego va a leer el type (GET_POKE_SUCCESS) y va a generar un case: en
    el caso de que nosotros mandemos este type, generamos una acción (un 
    return de alguna modificacion de nuestro state que es 
    nuestra data inicial, nuestro array). */
}

// Actions
export const getRamAction = () => async (dispatch, getState) => {

    if (localStorage.getItem('page=1')) {
        dispatch ({
            type: GET_RAM_SUCCESS,
            payload: JSON.parse(localStorage.getItem('page=1'))
        })
        return
    }

    try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character?page=1`)
        // console.log(res.data);
        dispatch ({
            type: GET_RAM_SUCCESS,
            payload: res.data
        })
        localStorage.setItem('page=1', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const nextRamAction = () => async (dispatch, getState) => {

    // const next = getState().characters.info.next
    const {next} = getState().characters.info // Lo de arriba es lo mismo

    if (localStorage.getItem(next)) {
        dispatch ({
            type: GET_RAM_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        const res = await axios.get(next)
        dispatch ({
            type: NEXT_RAM_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const previousRamAction = () => async (dispatch, getState) => {

    // const prev = getState().characters.info.prev
    const {prev} = getState().characters.info // Lo de arriba es lo mismo

    if (localStorage.getItem(prev)) {
        dispatch ({
            type: GET_RAM_SUCCESS,
            payload: JSON.parse(localStorage.getItem(prev))
        })
        return
    }

    try {
        const res = await axios.get(prev)
        dispatch ({
            type: PREVIOUS_RAM_SUCCESS,
            payload: res.data
        })
        localStorage.setItem(prev, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}