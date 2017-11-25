import React, {Component} from 'react'
import {Form, StyledText, Text, NestedForm, StyledSelect} from 'react-form'
import {Col, Label, Row} from 'react-bootstrap'

const PlayDay = ({i, playDay, rankOptions, errorValidator}) => (
    <NestedForm field={['playDays', i]} key={`play-day-${i}`}>
        <Form
            defaultValues={{code: playDay.code}}
            validateError={errorValidator}
        >
            {formApi => (
                <div className="form-group">
                    <Label bsStyle={playDay.style}>{playDay.label}</Label>
                    <Text type="hidden" className="form-control" field="code" id={`play-day-code-${i}`}/>
                    <StyledSelect field="rank"
                            id={`play-day-rank-${i}`} options={rankOptions} placeholder='Vyberte preference'/>
                </div>
            )}
        </Form>
    </NestedForm>
)

const Field = ({i, fieldOptions, errorValidator}) => (
    <NestedForm field={['fieldMemberships', i]} key={`field-membership-${i}`}>
        <Form validateError={errorValidator}>
            {formApi => (
                <div className="form-group">
                    <StyledSelect field="field" id={`field-membership-field-${i}`}
                            options={fieldOptions} placeholder='Vyberte hřiště'/>
                </div>
            )}
        </Form>
    </NestedForm>
);

const FieldLocation = ({i, fieldLocationOptions, errorValidator}) => (
    <NestedForm field={['fieldLocationMemberships', i]} key={`field-location-membership-${i}`}>
        <Form validateError={errorValidator}>
            {formApi => (
                <div className="form-group">
                    <StyledSelect field="fieldLocation"
                            id={`field-location-membership-field-location-${i}`} options={fieldLocationOptions}
                            placeholder='Vyberte oblast'/>
                </div>
            )}
        </Form>
    </NestedForm>
);

class TeamApplicationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playDaysRanksSum: 0,
            playDays: [
                {code: "monday", label: "Pondělí", style: "default"},
                {code: "tuesday", label: "Úterý", style: "default"},
                {code: "wednesday", label: "Středa", style: "default"},
                {code: "thursday", label: "Čtvrtek", style: "default"},
                {code: "friday", label: "Pátek", style: "default"},
                {code: "saturday_am", label: "Sobota (dopoledne)", style: "default"},
                {code: "saturday_pm", label: "Sobota (odpoledne)", style: "default"},
                {code: "sunday_am", label: "Neděle (dopoledne)", style: "default"},
                {code: "sunday_pm", label: "Neděle (odpoledne)", style: "default"},
            ]
        }
    }

    render() {
        const {onSubmit, fields, fieldLocations, myTeamId} = this.props;
        const fieldOptions = [...fields.map((field) => {
            return {
                label: field.name,
                value: field.id
            }
        })];

        const fieldLocationOptions = [...fieldLocations.map((fieldLocation) => {
            return {
                label: fieldLocation.name,
                value: fieldLocation.id
            }
        })];

        const rankOptions = [
            {label: 'Ideální termín (1b)', value: 1},
            {label: 'Neutrální termín (3b)', value: 3},
            {label: 'Nevyhovující termín (5b)', value: 5},
        ]

        const renderPlayDaysSubForm = () => {
            return (
                <Row>
                    {
                        this.state.playDays.map((playDay, index) => {
                            return (
                                <Col xs={4} key={index}>
                                    <PlayDay i={index} playDay={playDay} rankOptions={rankOptions} errorValidator={playDayErrorValidator}/>
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        }

        const onChangeFormValues = (values) => {
            if (values.playDays !== undefined) {

                let playDaysRanksSum = 0;
                values.playDays.map((playDay) => {
                    if (playDay !== null && playDay.rank !== undefined) {
                        playDaysRanksSum += playDay.rank;
                    }
                });

                this.setState({
                    playDaysRanksSum
                });
            }
        }

        const playDayErrorValidator = (values) => {
            return {
                rank: values.rank === undefined || values.rank === null ? 'Musíte vybrat vhodnost termínu.' : null
            }
        }

        const fieldErrorValidator = (values) => {
            return {
                field: values.field === undefined || values.field === null ? 'Musíte vybrat hřiště.' : null
            }
        }

        const fieldLocationErrorValidator = (values) => {
            return {
                fieldLocation: values.fieldLocation === undefined || values.fieldLocation === null ? 'Musíte vybrat oblast.' : null
            }
        }

        return (
            <Form defaultValues={{team: myTeamId}} onSubmit={(values) => onSubmit(values)} formDidUpdate={(values) => {
                onChangeFormValues(values.values)
            }}>
                {formApi => (
                    <form onSubmit={formApi.submitForm}
                          id="team-application-form">

                        <Text type="hidden" field="team" id="team"/>

                        <Col xs={12}>
                            <h3>
                                Preferované herní dny
                                <Label className="pull-right"
                                       bsStyle={(this.state.playDaysRanksSum > 33) ? 'danger' : 'success'}>
                                    Součet bodů: {this.state.playDaysRanksSum}b (max. 33b)
                                </Label>
                            </h3>
                            {renderPlayDaysSubForm()}
                        </Col>

                        <Col xs={6}>
                            <h3>Preferovaná hřiště</h3>
                            <Field i={0} fieldOptions={fieldOptions} errorValidator={fieldErrorValidator} />
                            <Field i={1} fieldOptions={fieldOptions} errorValidator={fieldErrorValidator}/>
                            <Field i={2} fieldOptions={fieldOptions} errorValidator={fieldErrorValidator}/>
                        </Col>

                        <Col xs={6}>
                            <h3>Preferované oblasti</h3>
                            <FieldLocation i={0} fieldLocationOptions={fieldLocationOptions} errorValidator={fieldLocationErrorValidator}/>
                            <FieldLocation i={1} fieldLocationOptions={fieldLocationOptions} errorValidator={fieldLocationErrorValidator}/>
                            <FieldLocation i={2} fieldLocationOptions={fieldLocationOptions} errorValidator={fieldLocationErrorValidator}/>
                        </Col>


                            <button type="submit" className="btn btn-primary">
                                Přihlásit tým
                            </button>

                    </form>
                )}
            </Form>
        )
    }
}

export default TeamApplicationForm;