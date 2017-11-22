import React from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../forms/LoginForm";
import {loginUser} from "../../actions/UsersActions";

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
        <div>
            <h1>Login obrazovka</h1>
            <LoginForm onSubmitLoginForm={onSubmitLoginForm}/>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (UserLoginPage)