import '@testing-library/jest-dom'
import { finishLoading, removeError, setError, startLoading } from '../../actions/actionsUi'
import { types } from '../../types/types'


describe('Pruebas en actionsUi', () => {
    
    test('todas las acciones deben de funcionar', () => {
        
        const action = setError('HELP')

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'HELP'
        })

        const removeErrorAction = removeError();
        expect(removeErrorAction).toEqual({ type: types.uiRemoveError });

        const startLoadingAction = startLoading();
        expect( startLoadingAction ).toEqual({ type: types.uiStartLoading });

        const finishLoadingAction =  finishLoading();
        expect( finishLoadingAction ).toEqual({ type: types.uiFinishLoading });
    })
    

})
