import React, {Component} from 'react';
import {Form, Text} from 'react-form'

class FieldForm extends Component {
    render() {
        const {onSubmitFieldForm} = this.props;

        return (
            <Form onSubmit={(values) => onSubmitFieldForm(values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="field-form">
                        <label htmlFor="name">Název hřiště</label>
                        <Text field="name" id="name"/>
                        <label htmlFor="code">Zkratka</label>
                        <Text field="code" id="code"/>
                        <label htmlFor="address">Adresa</label>
                        <Text field="address" id="address"/>
                        <button type="submit" className="btn btn-primary">Vytvořit hřiště</button>
                    </form>
                )}
            </Form>
        );
    }
}

export default FieldForm;