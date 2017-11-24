import React, {Component} from 'react'
import { Form, Text } from 'react-form'

class TeamRegistrationForm extends Component {
    render(){
        const {onSubmit} = this.props;

        return (
            <Form onSubmit={(values) => onSubmit(values)}>
                { formApi => (
                    <form onSubmit={formApi.submitForm} id="team-form">
                        <label htmlFor="name">Název týmu</label>
                        <Text field="name" id="name" />
                        <button type="submit" className="btn btn-primary">
                            Vytvořit tým
                        </button>
                    </form>
                )}
            </Form>
        )
    }
}

export default TeamRegistrationForm;