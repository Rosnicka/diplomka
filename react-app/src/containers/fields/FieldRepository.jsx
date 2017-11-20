import React, {Component} from 'react';
import FieldForm from "../../forms/FieldForm";
import {FIELDS_URL} from "../../constants/Routes";
import {fetchPost} from "../../utils/FetchMethods";

class FieldRepository extends Component {
    onSubmitFieldForm = (values) => {
        createField(values);
    };

    render() {
        return (
            <div>
                <h2>Hřiště</h2>
                <FieldForm onSubmitFieldForm={this.onSubmitFieldForm}/>
            </div>
        );
    }
}

const createField = (values) => {
    fetchPost(FIELDS_URL, values).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    }).catch(function (error) {
        console.log(error);
    });
}

export default FieldRepository;
