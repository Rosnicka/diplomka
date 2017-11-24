import React, {Component} from 'react';
import {Form, Text, Password} from 'react-form'

class LoginForm extends Component {
    render() {
        const {onSubmitLoginForm} = this.props;

        return (
            <Form onSubmit={(values) => onSubmitLoginForm(values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Přihlašovací email</label>
                            <Text className="form-control" field="username" id="username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Heslo</label>
                            <Text className="form-control" field="password" id="password" type="password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Přihlásit se</button>
                    </form>
                )}
            </Form>
        );
    }
}

export default LoginForm;