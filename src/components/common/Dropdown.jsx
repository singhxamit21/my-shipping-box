import React from 'react'

const Dropdown = React.memo(({ ...props }) => {
    const { label, options, error } = props;
    return (
        <div>
            <label>{label}</label>
            <select {...props} className="input">
                <option value="" disabled>Select</option>
                {options.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            {error && <div className="error">{error}</div>}
        </div>
    )
})

export default Dropdown
