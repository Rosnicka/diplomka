import React, {Component} from 'react';
import {Form, Text, Password} from 'react-form'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

class LoginForm extends Component {
    render() {
        const {onSubmitLoginForm} = this.props;

        return (
            <Form onSubmit={(values) => onSubmitLoginForm(values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Přihlašovací e-mail</label>
                            <Text className="form-control" field="username" id="username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Heslo</label>
                            <Text className="form-control" field="password" id="password" type="password"/>
                        </div>
                        <button type="submit" className="btn btn-success">Přihlásit se</button>
                        <LinkContainer to={'/registrace'}>
                            <Button bsStyle="info">Registrovat se</Button>
                        </LinkContainer>
                    </form>
                )}
            </Form>
        );
    }
}

export default LoginForm;