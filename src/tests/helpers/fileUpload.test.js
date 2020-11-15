import '@testing-library/jest-dom';
import cloudinary from 'cloudinary'
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dmuco70hf', 
    api_key: '158936686548932', 
    api_secret: 'JqXTOfMJqtFgJ8VaYoZNxyWNBzo' 
  });

describe('Pruebas en el helper fileUpload', () => {
 
    test('debe de cargar un archivo y retornar el URL ', async(done) => {
        
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_Grupo_Imagen_Multimedia.2016.png')
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );
        
        expect( typeof url ).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/');
        const imageID = segments[ segments.length - 1 ].replace('.png', '');
        
        cloudinary.v2.api.delete_resources(imageID, {}, () => {
            done();
        });
    })


    test('debe de retornar un error ', async() => {
    
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );
        
        expect( url ).toBe(null)
    })
    
    
    
})
