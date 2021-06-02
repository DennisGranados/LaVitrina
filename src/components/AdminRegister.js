import React, { Component } from 'react';

class AdminRegister extends Component {
    render() {
        return (
            <div>
                <form>
                <label for="inputEmail" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="inputEmail"/>
                <label for="inputPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="inputPassword"/>
                <label for="inputConfirmPassword" class="form-label">Confirme contraseña</label>
                <input type="password" class="form-control" id="inputConfirmPassword"/>
                <button type="submit" className="btn btn-primary" >Registrar</button>
                </form>
            </div>
        );
    }
}

export default AdminRegister;