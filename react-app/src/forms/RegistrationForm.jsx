import React, {Component} from 'react';
import {Form, Text, Password} from 'react-form'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

class RegistrationForm extends Component {
    render() {
        const {onSubmitRegistrationForm} = this.props;

        return (
            <Form onSubmit={(values) => onSubmitRegistrationForm(values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="login-form">
                        <div className="form-group">
                            <label htmlFor="first_name">Jméno</label>
                            <Text className="form-control" field="first_name" id="first_name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Příjmení</label>
                            <Text className="form-control" field="last_name" id="last_name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Přihlašovací e-mail</label>
                            <Text className="form-control" field="email" id="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Heslo</label>
                            <Text className="form-control" field="password" id="password" type="password"/>
                        </div>
                        <button type="submit" className="btn btn-success">Registrovat se</button>
                        <LinkContainer to={'/'}>
                            <Button bsStyle="info">Zpět na přihlášení</Button>
                        </LinkContainer>
                    </form>
                )}
            </Form>
        );
    }
}

export default RegistrationForm;