import React, {Component} from 'react';
import {Form, Text, Password} from 'react-form'

class RegistrationForm extends Component {
    render() {
        const {onSubmitRegistrationForm} = this.props;

        return (
            <Form onSubmit={(values) => onSubmitRegistrationForm(values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="login-form">
                        <label htmlFor="username">Přihlašovací email</label>
                        <Text field="username" id="username"/>
                        <label htmlFor="password">Heslo</label>
                        <Text field="password" id="password" type="password"/>
                        <button type="submit" className="btn btn-primary">Přihlásit se</button>
                    </form>
                )}
            </Form>
        );
    }
}

export default RegistrationForm;