import React, {Component} from 'react'
import {Col} from 'react-bootstrap'
import { Form, StyledText } from 'react-form'

class TeamRegistrationForm extends Component {
    render(){
        const {onSubmit} = this.props;

        return (
            <Form onSubmit={(values) => onSubmit(values)}>
                { formApi => (
                    <form onSubmit={formApi.submitForm} id="team-form">
                        <Col xs={12}>
                        <div className="form-group">
                            <label htmlFor="name">Název týmu</label>
                            <StyledText field="name" id="name" />
                        </div>
                        </Col>

                        <Col xs={12}>
                            <button type="submit" className="btn btn-primary">
                                Vytvořit tým
                            </button>
                        </Col>
                    </form>
                )}
            </Form>
        )
    }
}

export default TeamRegistrationForm;