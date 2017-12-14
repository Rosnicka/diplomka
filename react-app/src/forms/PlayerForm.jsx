import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {Form, Text, StyledSelect, StyledText} from 'react-form'

class PlayerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false
        }
    }

    render() {
        const {onSubmitPlayerForm, player} = this.props;

        const defaultValues = () => {
            if (player === false) {
                return {}
            }
            return {
                firstName: player.first_name,
                lastName: player.last_name,
                birthNumber: player.birth_number,
                number: player.number,
            }
        }

        const requiredFieldsValidator = (values) => {
            return {
                firstName: values.firstName === undefined ||
                           values.firstName === null ||
                           values.firstName === '' ? 'Musíte vyplnit jméno.' : null,

                lastName: values.lastName === undefined ||
                values.lastName === null ||
                values.lastName === '' ? 'Musíte vyplnit příjmení.' : null,

                birthNumber: values.birthNumber === undefined ||
                values.birthNumber === null ||
                values.birthNumber === '' ? 'Musíte vyplnit rodné číslo.' : null,

                number: values.number === undefined ||
                values.number === null ||
                values.number === '' ? 'Musíte vyplnit číslo dresu.' : null
            }
        }

        return (
            <Form
                defaultValues={defaultValues()}
                validateError={requiredFieldsValidator}
                onSubmit={(values) => onSubmitPlayerForm(player, values)}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} id="player-form">
                        <Col xs={6}>
                            <label htmlFor="firstName">Jméno</label>
                            <StyledText field="firstName" id="firstName" />
                        </Col>
                        <Col xs={6}>
                        <label htmlFor="lastName">Příjmení</label>
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
                        <button type="submit" className="btn btn-primary">
                            {(player === false) ? 'Vytvořit hráče' : 'Uložit změny'}
                        </button>
                        </Col>
                    </form>
                )}
            </Form>
        );
    }
}

export default PlayerForm;
