// Function to open the modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block"; // Show the modal
        // Reset the modal state when opening
        const shirtNumber = modalId.replace('shirt', '').replace('Modal', '');
        document.getElementById(`product-section-${shirtNumber}`).style.display = 'block';
        document.getElementById(`customer-details-section-${shirtNumber}`).style.display = 'none';
        document.getElementById(`payment-form-${shirtNumber}`).style.display = 'none';
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

// Function to show customer details section
function showCustomerDetails(shirtNumber) {
    document.getElementById(`product-section-${shirtNumber}`).style.display = 'none';
    document.getElementById(`customer-details-section-${shirtNumber}`).style.display = 'block';
}

// Function to show payment section
function showPaymentSection(shirtNumber) {
    const customerDetailsForm = document.getElementById(`customer-details-form-${shirtNumber}`);
    
    if (customerDetailsForm.checkValidity()) {
        customerDetailsForm.parentElement.style.display = 'none';
        document.getElementById(`payment-form-${shirtNumber}`).style.display = 'block';
    } else {
        customerDetailsForm.reportValidity();
    }
}



