import React from 'react';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/users/UsersActions";
import RegistrationForm from "../../forms/RegistrationForm";
import {Col} from 'react-bootstrap'

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitRegistrationForm: (values) => {
            dispatch(registerUser(values));
        }
    };
};

const UserRegistrationPage = (props) => {
    const {onSubmitRegistrationForm} = props;

    return (
        <Col xs={8} xsOffset={2} className="user-login-page">
            <h1>Registrace uživatele</h1>
            <Col xs={8} xsOffset={2}>
                <RegistrationForm onSubmitRegistrationForm={onSubmitRegistrationForm}/>
            </Col>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (UserRegistrationPage)