/**
 * Created by yukiX on 2018/03/04.
 */
import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    // survey form shows a form to add survey
    renderFields(){
        return _.map(formFields, ({label, name})=>{
            return (
                <Field
                    key={name}
                    type="text"
                    name={name}
                    label={label}
                    component={SurveyField}
                />
            );
        });
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                <button type="submit" className="teal btn-flat right white-text">Next
                    <i className="material-icons right">done</i>
                </button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name})=>{
        if(!values[name]){
            if(name === 'recipients'){
                errors[name] = 'You must provide at least one recipient.';
            } else {
                errors[name] = 'You must provide a '+ name;
            }
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);