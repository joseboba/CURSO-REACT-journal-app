import { types } from "../types/types"
import Swal from 'sweetalert2'

export const setError = (err) => {
    Swal.fire('Error', err, 'error')
    return {
        type: types.uiSetError,
        payload: err
    }
}

export const removeError = () => {
    return {
        type: types.uiRemoveError,
    }
}

export const startLoading = () => {
    return {
        type: types.uiStartLoading,
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading,
    }
} 
