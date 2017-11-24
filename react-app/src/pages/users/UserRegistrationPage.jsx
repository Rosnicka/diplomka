import React from 'react';
import {connect} from 'react-redux';
import {loginUser} from "../../actions/users/UsersActions";
import RegistrationForm from "../../forms/RegistrationForm";

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitRegistrationForm: (values) => {
            dispatch(loginUser(values.username, values.password));
        }
    };
};

const UserRegistrationPage = (props) => {
    const {onSubmitRegistrationForm} = props;

    return (
        <div>
            <h1>Registrace uživatele</h1>
            <RegistrationForm onSubmitRegistrationForm={onSubmitRegistrationForm}/>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (UserRegistrationPage)