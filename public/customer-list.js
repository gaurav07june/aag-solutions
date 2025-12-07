document.addEventListener('DOMContentLoaded', async function () {
    const listContainer = document.getElementById('customers')
    const loadingText = document.querySelector('.loading-text')

    const renderCustomers = (customers) => {
        if (!customers || customers.length === 0) {
            listContainer.innerHTML = '<p>No customers found.</p>'
            return
        }
        const items = customers
            .map((c) => {
                const name = c.name || ''
                const mobile = c.mobileNumber || ''
                const address = c.address || ''
                const email = c.email || ''
                return `<article class="single-task">
          <h5 style="margin: 0 0 0.25rem 0;">${name}</h5>
          <p style="margin: 0.1rem 0;"><strong>Mobile:</strong> ${mobile}</p>
          <p style="margin: 0.1rem 0;"><strong>Address:</strong> ${address}</p>
          <p style="margin: 0.1rem 0;"><strong>Email:</strong> ${email}</p>
        </article>`
            })
            .join('')
        listContainer.innerHTML = items
    }

    try {
        const { data } = await axios.get('/api/v1/customers')
        if (loadingText) loadingText.style.display = 'none'
        renderCustomers(data.customers)
    } catch (err) {
        if (loadingText) loadingText.textContent = 'Failed to load customers.'
    }
})


