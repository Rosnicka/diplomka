import React, {Component} from 'react'
import { Form, Text } from 'react-form'

class TeamForm extends Component {
    render(){

        return (
            <Form>
                { formApi => (
                    <form onSubmit={formApi.submitForm} id="team-form">
                        <label htmlFor="name">Název týmu</label>
                        <Text field="name" id="name" />
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

export default TeamForm;