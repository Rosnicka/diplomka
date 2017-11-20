import React, {Component} from 'react';
import {Form, Text, Select} from 'react-form'

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
                        <label htmlFor="team">Tým</label>
                        <Select field="team" id="team" options={teamOptions} placeholder='Vybert tým' />
                        <label htmlFor="firstName">Jméno</label>
                        <Text field="firstName" id="firstName" />
                        <label htmlFor="firstName">Příjmení</label>
                        <Text field="lastName" id="lastName" />
                        <label htmlFor="birthNumber">Rodné číslo</label>
                        <Text field="birthNumber" id="birthNumber" />
                        <label htmlFor="number">Číslo dresu</label>
                        <Text field="number" id="number" />
                        <button type="submit" className="btn btn-primary">Vytvořit hráče</button>
                    </form>
                )}
            </Form>
        );
    }
}

export default PlayerForm;
