import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <div className="form-group my-3">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} {...rest} className='form-control my-2'>
                <option value="" />
                {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>
                )}
            </select>
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>);
}

export default Select;