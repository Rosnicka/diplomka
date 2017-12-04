import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {Form, Text, StyledSelect, StyledText} from 'react-form'

class PlayerForm extends Component {
    render() {
        const {onSubmitPlayerForm, teams} = this.props;
        const teamOptions = [...teams.map((team) => {
            return {
                label: team.name,
                value: team.id
            }
        })];

        return (
            <Form onSubmit={(values) => onSubmitPlayerForm(values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="player-form">
                        {/*<label htmlFor="team">Tým</label>*/}
                        {/*<div className="form-group">*/}
                            {/*<StyledSelect field="team" id="team" options={teamOptions} placeholder='Vyberte tým' />*/}
                        {/*</div>*/}
                        <Col xs={6}>
                            <label htmlFor="firstName">Jméno</label>
                            <StyledText field="firstName" id="firstName" />
                        </Col>
                        <Col xs={6}>
                        <label htmlFor="firstName">Příjmení</label>
                        <StyledText field="lastName" id="lastName" />
                        </Col>
                        <Col xs={6}>
                        <label htmlFor="birthNumber">Rodné číslo</label>
                        <StyledText field="birthNumber" id="birthNumber" />
                        </Col>
                        <Col xs={6}>
                        <label htmlFor="number">Číslo dresu</label>
                        <StyledText field="number" id="number" />
                        </Col>
                        <Col xs={12}>
                        <button type="submit" className="btn btn-primary">Vytvořit hráče</button>
                        </Col>
                    </form>
                )}
            </Form>
        );
    }
}

export default PlayerForm;
