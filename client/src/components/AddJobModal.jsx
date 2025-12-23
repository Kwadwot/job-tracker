import { useState, useEffect } from 'react';

const STATUS_OPTIONS = [
    'Not Applied',
    'Applied',
    'Interviewing',
    'Offer',
    'Rejected',
    'Withdrawn'
];

// ModalHeader component
function ModalHeader({ title, onClose }) {
    return (
        <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
    );
}

// FormField component - reusable form input
function FormField({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = '',
    options = null
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label} {required && '*'}
            </label>
            {options ? (
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows="4"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}

// FormActions component
function FormActions({ onCancel, submitLabel }) {
    return (
        <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-cancel">
                Cancel
            </button>
            <button type="submit" className="btn btn-submit">
                {submitLabel}
            </button>
        </div>
    );
}

// JobForm component - contains all form fields
function JobForm({ formData, onChange, onSubmit, onCancel, isEditMode }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <form onSubmit={onSubmit} className="job-form">
            <FormField
                id="position"
                name="position"
                label="Position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="e.g., Software Engineer"
            />

            <FormField
                id="company"
                name="company"
                label="Company/Organization"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="e.g., Tech Corp"
            />

            <FormField
                id="location"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
            />

            <FormField
                id="site_link"
                name="site_link"
                label="Job Posting URL"
                type="url"
                value={formData.site_link}
                onChange={handleChange}
                placeholder="https://..."
            />

            <FormField
                id="status"
                name="status"
                label="Status"
                type="select"
                value={formData.status}
                onChange={handleChange}
                required
                options={STATUS_OPTIONS}
            />

            <FormField
                id="date_applied"
                name="date_applied"
                label="Date Applied"
                type="date"
                value={formData.date_applied}
                onChange={handleChange}
            />

            <FormField
                id="notes"
                name="notes"
                label="Notes"
                type="textarea"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes about this application..."
            />

            <FormActions
                onCancel={onCancel}
                submitLabel={isEditMode ? 'Update Application' : 'Add Application'}
            />
        </form>
    );
}

// Main AddJobModal component
function AddJobModal({ isOpen, onClose, onSave, jobToEdit = null }) {
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        location: '',
        site_link: '',
        status: 'Not Applied',
        notes: '',
        date_applied: ''
    });

    // Initialize form data when modal opens or jobToEdit changes
    useEffect(() => {
        if (jobToEdit) {
            setFormData({
                position: jobToEdit.position || '',
                company: jobToEdit.company || '',
                location: jobToEdit.location || '',
                site_link: jobToEdit.site_link || '',
                status: jobToEdit.status || 'Not Applied',
                notes: jobToEdit.notes || '',
                date_applied: jobToEdit.date_applied || ''
            });
        } else {
            setFormData({
                position: '',
                company: '',
                location: '',
                site_link: '',
                status: 'Not Applied',
                notes: '',
                date_applied: ''
            });
        }
    }, [jobToEdit, isOpen]);

    const handleFieldChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    const isEditMode = !!jobToEdit;
    const modalTitle = isEditMode ? 'Edit Job Application' : 'Add New Job Application';

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <ModalHeader title={modalTitle} onClose={handleClose} />

                <JobForm
                    formData={formData}
                    onChange={handleFieldChange}
                    onSubmit={handleSubmit}
                    onCancel={handleClose}
                    isEditMode={isEditMode}
                />
            </div>
        </div>
    );
}

export default AddJobModal;