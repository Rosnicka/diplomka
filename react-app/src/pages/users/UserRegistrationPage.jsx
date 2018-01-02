import React from 'react';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/users/UsersActions";
import RegistrationForm from "../../forms/RegistrationForm";
import {Col} from 'react-bootstrap'
import AlertMessage from "../../components/utils/AlertMessage";

const mapStateToProps = (state) => {
    return {
        registerMessageBox: state.users.registerMessageBox
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitRegistrationForm: (values) => {
            dispatch(registerUser(values));
        }
    };
};

const UserRegistrationPage = (props) => {
    const {registerMessageBox, onSubmitRegistrationForm} = props;

    const renderMsgBox = () => {
        if (registerMessageBox === false) {
            return '';
        }

        return (
            <AlertMessage type={registerMessageBox.type} text={registerMessageBox.text}/>
        )
    }

    return (
        <Col xs={8} xsOffset={2} className="user-login-page">
            <h1>Registrace uživatele</h1>
            <Col xs={8} xsOffset={2}>
                <RegistrationForm onSubmitRegistrationForm={onSubmitRegistrationForm}/>
                {renderMsgBox()}
            </Col>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (UserRegistrationPage)