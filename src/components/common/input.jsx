import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
    return (<div className="form-group my-3"><label htmlFor={name}>{label}</label><input value={value} onChange={onChange} name={name} id={name} type="text" className="form-control my-2" />{error && <div className='alert alert-danger'>{error}</div>}</div>);
}

export default Input;