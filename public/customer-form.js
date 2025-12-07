document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('customer-form')
    const alertBox = form.querySelector('.form-alert')

    const setAlert = (msg, isError = false) => {
        if (!alertBox) return
        alertBox.textContent = msg
        alertBox.style.color = isError ? 'red' : 'green'
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault()
        setAlert('')

        const name = document.getElementById('name').value.trim()
        const mobileNumber = document.getElementById('mobileNumber').value.trim()
        const address = document.getElementById('address').value.trim()
        const email = document.getElementById('email').value.trim()

        try {
            await axios.post('/api/v1/customers', {
                name,
                mobileNumber,
                address,
                email,
            })
            setAlert('Customer created successfully.')
            form.reset()
        } catch (err) {
            const msg = err?.response?.data?.msg || 'Failed to create customer.'
            setAlert(msg, true)
        }
    })
})


