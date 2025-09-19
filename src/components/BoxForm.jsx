import React, { useState, useMemo } from 'react'
import { saveBox } from '../services/api'
import { getRates, calcShippingCost, rgbStringFromHex } from '../utils/helpers'
import InputField from './common/InputField'
import Dropdown from './common/Dropdown'

const DEFAULT_BOX_COLOUR = '#ffffff'

const BoxForm = ({ onSaved }) => {
    const countries = useMemo(() => Object.keys(getRates()), [])

    const [formData, setFormData] = useState({
        receiver: '',
        weight: '',
        color: DEFAULT_BOX_COLOUR,
        country: ''
    })

    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        let updatedValue = value

        if (name === 'receiver') {
            updatedValue = value.replace(/[^a-zA-Z\s]/g, '')
        }
        if (name === 'weight') {
            updatedValue = value.replace(/[^0-9.]/g, '')
        }

        setFormData((prev) => ({ ...prev, [name]: updatedValue }))
        setErrors((prev) => {
            const { [name]: removed, ...rest } = prev
            return rest
        })
    }


    const validate = () => {
        const e = {}
        if (!formData.receiver.trim()) e.receiver = 'Receiver name is required.'

        if (formData.weight === '' || formData.weight === null) {
            e.weight = 'Weight is required.'
        } else if (Number(formData.weight) < 0) {
            e.weight = 'Negative values are not permitted. Defaulted to zero.'
            setFormData((prev) => ({ ...prev, weight: 0 }))
        }
        
        if (!formData.color) {
            e.color = 'Box colour is required.'
        } else if (!/^#[0-9A-Fa-f]{6}$/.test(formData.color)) {
            e.color = 'Invalid colour format. Use # followed by 6 hex characters.'
        }

        if (!formData.country) e.country = 'Destination country is required.'
        return e
    }


    const handleSave = async () => {
        const v = validate()
        if (Object.keys(v).length) {
            setErrors(v)
            return
        }

        setSaving(true)
        try {
            const rgb = rgbStringFromHex(formData.color)
            const payload = {
                receiver: formData.receiver.trim(),
                weight: Number(formData.weight),
                color: rgb,
                country: formData.country,
                cost: calcShippingCost(Number(formData.weight), formData.country)
            }
            await saveBox(payload)
            setFormData({ receiver: '', weight: '', color: DEFAULT_BOX_COLOUR, country: '' })
            setErrors({})
            if (onSaved) onSaved()
        } catch (err) {
            console.error(err)
            setErrors({ form: 'Failed to save. Try again.' })
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="card form-card">
            <h2 className="form-title">📦 Add Shipping Box</h2>

            {errors.form && <div className="error">{errors.form}</div>}

            <div className="form-grid">
                <InputField
                    label={<><span>Receiver name</span><span className="required">*</span></>}
                    name="receiver"
                    placeholder="Enter receiver name"
                    value={formData.receiver}
                    onChange={handleChange}
                    error={errors.receiver}
                    maxLength={50}
                />

                <InputField
                    label={<><span>Weight (kg)</span><span className="required">*</span></>}
                    name="weight"
                    placeholder="Enter weight in kilograms"
                    value={formData.weight}
                    onChange={handleChange}
                    error={errors.weight}
                    maxLength={4}
                />

                <div className="form-field">
                    <label>
                        <span>Box colour</span><span className="required">*</span>
                    </label>

                    <div className="color-picker">
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="color-input"
                        />
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="input"
                            maxLength={7}
                        />
                    </div>
                    {errors.color && <div className="error">{errors.color}</div>}
                </div>

                <Dropdown
                    label={<><span>Destination country</span><span className="required">*</span></>}
                    name="country"
                    value={formData.country}
                    options={countries}
                    onChange={handleChange}
                    error={errors.country}
                />
            </div>

            <div className="form-actions">
                <button type="button" className="btn primary" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    )
}

export default React.memo(BoxForm)
