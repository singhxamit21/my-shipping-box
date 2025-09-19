import React from 'react'

const InputField = React.memo(({ ...props }) => {
    const { label, error } = props
    return (
        <div>
            <label>{label}</label>
            <input {...props} className="input" />
            {error && <div className="error">{error}</div>}
        </div>
    )
})

export default InputField
