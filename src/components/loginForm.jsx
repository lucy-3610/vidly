import React, { Component, useState } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        account: { username: "", password: "" },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    validate = () => {
        const { error } = Joi.validate(this.state.account, this.schema, { abortEarly: false })
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message
        return errors;

        // const errors = {};

        // const { account } = this.state;
        // if (account.username.trim() === "")
        //     errors.username = "Username is required";
        // if (account.password.trim() === "")
        //     errors.password = "Password is required";

        // return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        console.log("Form Submitted")
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null
        // if (name === "username") {
        //     if (value.trim() === "") return "Username is required"
        // }
        // if (name === "password") {
        //     if (value.trim() === "") return "Password is required"
        // }
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const account = { ...this.state.account }
        account[input.name] = input.value

        this.setState({ account, errors })
    }

    render() {
        const { account, errors } = this.state;
        return (<React.Fragment>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <Input name="username" label="Username" value={account.username} onChange={this.handleChange} error={errors.username} />
                <Input name="password" label="Password" value={account.password} onChange={this.handleChange} error={errors.password} />
                <button disabled={this.validate()} className="btn btn-primary mt-3">Login</button>
            </form>
        </React.Fragment>);
    }
}

export default LoginForm;