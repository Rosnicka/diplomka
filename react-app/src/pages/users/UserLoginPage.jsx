import React from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../forms/LoginForm";
import {loginUser} from "../../actions/users/UsersActions";
import {Col, Row} from 'react-bootstrap'

const mapStateToProps = (state) => {
    return {
        userIdentity: state.userIdentity,
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
    const {onSubmitLoginForm} = props;

    return (
        <Col xs={8} xsOffset={2} className="user-login-page">
            <h1>Přihlášení do aplikace</h1>
            <Col xs={8} xsOffset={2}>
                <LoginForm onSubmitLoginForm={onSubmitLoginForm}/>
            </Col>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (UserLoginPage)