import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateForm = (data) => {
    const errors = {}

    if (!data.name.trim()) {
      errors.name = 'Full Name is required.'
    }

    if (!data.email.trim()) {
      errors.email = 'Email Address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., user@domain.com).'
    }

    if (!data.message.trim()) {
      errors.message = 'Message is required.'
    }

    return errors
  }

  const errors = validateForm(formData)

  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!isFormValid) return

  setSubmitted(false)
  setSubmitError('')

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit contact form')
    }

    setSubmitted(true)

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })

    setTouched({
      name: false,
      email: false,
      message: false,
    })
  } catch (error) {
    setSubmitError(error.message)
  }
}

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Full Name *</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your name"
        className={touched.name && errors.name ? 'input-error' : ''}
        required
      />
      {touched.name && errors.name && (
        <span className="error-text" role="alert">{errors.name}</span>
      )}

      <label htmlFor="email">Email Address *</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your email"
        className={touched.email && errors.email ? 'input-error' : ''}
        required
      />
      {touched.email && errors.email && (
        <span className="error-text" role="alert">{errors.email}</span>
      )}

      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
      />

      <label htmlFor="message">Message *</label>
      <textarea
        id="message"
        name="message"
        rows="6"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Write your message here..."
        className={touched.message && errors.message ? 'input-error' : ''}
        required
      />
      {touched.message && errors.message && (
        <span className="error-text" role="alert">{errors.message}</span>
      )}

      <button type="submit" disabled={!isFormValid}>
        Send Message
      </button>

      {submitted && (
        <p className="form-success-msg">
          Thank you! Your message has been sent successfully.
        </p>
      )}
      {submitError && (
      <p className="error-text" role="alert">
        {submitError}
      </p>
      )}
    </form>
  )
}

export default ContactForm
