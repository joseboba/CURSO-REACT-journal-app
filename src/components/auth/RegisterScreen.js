import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPasswordName } from '../../actions/actionsAuth'
import { removeError, setError } from '../../actions/actionsUi'
import { useForm } from '../../hooks/useForm'


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
       name: 'Jose Enrique', email: 'joseboba18@gmail.com', password: '123456', password2: '123456'
      })
    const { name, email, password, password2 } = formValues;


    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
          dispatch( startRegisterWithEmailPasswordName(email, password, name) ) 
        }
    }

    const isFormValid = () => {
        
        if(name.trim().length === 0){
          dispatch(setError('Name es requerido'))
          return false;
        }else if( !validator.isEmail(email) ){
          dispatch(setError('Email es incorrecto o no se ha escrito'))
          return false;
        }else if( password !== password2 || password.length < 5 ){
          dispatch(setError('La contraseña no es completamente segura o no coinciden'))
          return false;
        }
        dispatch(removeError())
        return true;
    }

    return (
        <>
        <h3 className="auth__title" > Register </h3>

        <form onSubmit={ handleRegister } autoComplete="off">

          <input
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="off"
            className="auth_input"
            value={ name }
            onChange={ handleInputChange }
          />


          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
            className="auth_input"
            value={ email }
            onChange={ handleInputChange }
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            className="auth_input"
            value={ password }
            onChange={ handleInputChange }
          />

          <input
            type="password"
            placeholder="Confirme su password"
            name="password2"
            autoComplete="off"
            className="auth_input"
            value={ password2 }
            onChange={ handleInputChange }
          />

          <button type="submit" className="btn btn-primary btn-block mt-5"  >Register</button>
        

            <Link 
                to="/auth/login"
                className="link "
            >
                ¿Ya estás registrado?
            </Link>

        </form>
      </>
    )
}
