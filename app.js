// Initialize Stripe
const stripe = Stripe('pk_test_51QCPBwFmLNIUplGX9ub8zUVElvBKh4sHWDedSzmrTQzNKE1OsUxSI4mLUIf7MA2aiBbiTA6t3FyaZnQBrNOn0d1D00O51GWL49'); // Your publishable key
const elements = stripe.elements();

// Create the payment form dynamically
function createPaymentForm() {
    const paymentSection = document.getElementById('payment-section');
    const form = document.createElement('form');
    form.id = 'payment-form';

    const cardElementContainer = document.createElement('div');
    cardElementContainer.id = 'card-element';
    cardElementContainer.style.marginBottom = '20px';

    const cardErrors = document.createElement('div');
    cardErrors.id = 'card-errors';
    cardErrors.style.color = '#fa755a';

    const submitButton = document.createElement('button');
    submitButton.id = 'submit';
    submitButton.textContent = 'Pay Now';
    submitButton.style.backgroundColor = '#28a745';
    submitButton.style.color = 'white';
    submitButton.style.padding = '10px 20px';
    submitButton.style.border = 'none';
    submitButton.style.fontSize = '16px';
    submitButton.style.borderRadius = '5px';
    submitButton.style.cursor = 'pointer';

    form.appendChild(cardElementContainer);
    form.appendChild(cardErrors);
    form.appendChild(submitButton);
    paymentSection.appendChild(form);

    const card = elements.create('card');
    card.mount('#card-element');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const { token, error } = await stripe.createToken(card);
        if (error) {
            cardErrors.textContent = error.message;
        } else {
            submitOrder(token);
        }
    });
}

// Function to send the token to the server
async function submitOrder(token) {
    alert('Preorder submitted! Payment processing will go here.');

    try {
        const response = await fetch('/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token.id,  // Send the Stripe token
                amount: 5000,     // Example amount ($50 in cents)
            }),
        });

        const result = await response.json();
        if (result.success) {
            alert('Payment successful!');
            // Redirect to a confirmation page or display an order confirmation here
        } else {
            alert('Payment failed: ' + result.error);
        }
    } catch (error) {
        alert('Payment error: ' + error.message);
    }
}

// Function to open the modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block"; // Show the modal
    } else {
        console.error(`Modal with ID ${modalId} not found.`);
    }
}

// Function to close the modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none"; // Hide the modal
    } else {
        console.error(`Modal with ID ${modalId} not found.`);
    }
}

// Close the modal when clicking outside of the modal content
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        if (event.target === modal) {
            closeModal(modal.id); // Close the modal if clicked outside content
        }
    });
}

// Show Customer Details after clicking Pre-order
function showCustomerDetails() {
    document.getElementById('product-section').style.display = 'none';
    document.getElementById('customer-details-section').style.display = 'block';
}

// Show Payment Method after customer fills out their details
function showPaymentSection() {
    document.getElementById('customer-details-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
}

// Call the function to create the payment form when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    createPaymentForm();
});


