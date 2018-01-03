import React from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../forms/LoginForm";
import {loginUser} from "../../actions/users/UsersActions";
import {Col} from 'react-bootstrap'
import AlertMessage from "../../components/utils/AlertMessage";

const mapStateToProps = (state) => {
    return {
        userLoginMsg: state.users.loginMessageBox
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitLoginForm: (values) => {
            dispatch(loginUser(values.username, values.password));
        }
    };
};

const UserLoginPage = (props) => {
    const {onSubmitLoginForm, userLoginMsg} = props;

    const renderMsgBox = () => {
        if (userLoginMsg === false) {
            return '';
        }

        return (
            <AlertMessage type={userLoginMsg.type} text={userLoginMsg.text}/>
        )
    }

    return (
        <Col xs={8} xsOffset={2} className="user-login-page">
            <h1>Přihlášení do aplikace</h1>
            <Col xs={8} xsOffset={2}>
                <LoginForm onSubmitLoginForm={onSubmitLoginForm}/>
                {renderMsgBox()}
            </Col>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLoginPage)