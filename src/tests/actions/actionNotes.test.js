import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { types } from '../../types/types';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/actionsNotes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg'
    })
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "GPDnLXnhqKNg9gUZRxNg",
      title: "titulo",
      body: "body",
    },
  },
};

let store = mockStore(initState)

describe('Pruebas en actionNotes', () => {

    beforeEach(() => {
        store = mockStore(initState)
    })

    test('debe de crear una nueva note en startNewNote', async () => {

        
        
        await store.dispatch( startNewNote() );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[1].payload.id;
        await db.doc(`TESTING/journal/notes/${ docId }`).delete();

    });


    test('startLoadingNotes debe de cargar las notas', async() => {
        
        await store.dispatch( startLoadingNotes('TESTING') )
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

    })
    

    test('startSaveNote debe de actualizar la nota', async() => {
        
        const note = {
            id: 'GPDnLXnhqKNg9gUZRxNg',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch( startSaveNote( note ) )
        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdate );

    })
    
    test('startUploading debe de actualizar el url del entry', async() => {
        
        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading(file) )

        const docRef = await db.doc('TESTING/journal/notes/GPDnLXnhqKNg9gUZRxNg').get(); 
        expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg')

    })
    
    

    
})
