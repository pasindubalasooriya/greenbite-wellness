
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];


document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    initializeFAQ();
});

function initializeForm() {
    const form = document.getElementById('contact-form');
    const confirmationMessage = document.querySelector('.confirmation-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value,
                date: new Date().toISOString()
            };

            feedbacks.push(formData);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

            confirmationMessage.classList.add('visible');
            
            form.reset();
            
            setTimeout(() => {
                confirmationMessage.classList.remove('visible');
            }, 5000);
        }
    });

    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });
    });
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;

    formGroup.classList.remove('error');

    if (field.name === 'name' && !field.value.trim()) {
        errorMessage.textContent = 'Name is required';
        isValid = false;
    }

    if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!field.value.trim()) {
            errorMessage.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(field.value)) {
            errorMessage.textContent = 'Please enter a valid email address';
            isValid = false;
        }
    }

    if (field.name === 'message' && field.value.trim().length < 10) {
        errorMessage.textContent = 'Message must be at least 10 characters long';
        isValid = false;
    }

    if (!isValid) {
        formGroup.classList.add('error');
    }

    return isValid;
}

function initializeFAQ() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}