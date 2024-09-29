document.addEventListener("DOMContentLoaded", () => {
    setupFormSubmit();
    setupRadioButtons();
    setupFieldListeners(); // Agregar listeners para ocultar errores en tiempo real
    setupCheckboxListener(); // Listener para el checkbox
    setupInputBorderFocus() ;
});

function setupFormSubmit() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validateForm()) {
            showMessageSent();
            form.reset(); // Restablecer el formulario
            resetStyles(); // Resetear los estilos de error si es necesario
        }
    });
}
function setupRadioButtons() {
    const divQuery1 = document.getElementById("radioQuery1");
    const divQuery2 = document.getElementById("radioQuery2");

    divQuery1.addEventListener("click", () => selectRadio(divQuery1, divQuery2, "generalEnquiry"));
    divQuery2.addEventListener("click", () => selectRadio(divQuery2, divQuery1, "supportRequest"));

    // Listener para cambios en los radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            hideError(document.getElementById("radioQuery1"), "selectQueryType");
        });
    });
}
function setupFieldListeners() {
    const fields = {
        firstName: document.getElementById("firstN"),
        lastName: document.getElementById("lastN"),
        email: document.getElementById("emailA"),
        message: document.getElementById("message")
    };
    Object.keys(fields).forEach(key => {
        fields[key].addEventListener("input", () => {
            hideError(fields[key], `required${capitalize(key)}`);
        });
    });
    fields.email.addEventListener("input", () => {
        if (!validateEmail(fields.email)) {
            showError("errorEmail", "Please enter a valid email address");
            markInputError(fields.email);
        } else {
            hideError(fields.email, "errorEmail");
            unmarkInputError(fields.email); 
        }
    });
}

function setupCheckboxListener() {
    const consentCheckbox = document.getElementById("consent");
    consentCheckbox.addEventListener("change", () => {
        hideError(consentCheckbox, "requiredConsent");
    });
}

function setupInputBorderFocus() {
    console.log("La función setupInputBorderFocus() se ha ejecutado.");
    const inputFields = document.querySelectorAll('input, textarea');
    inputFields.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = "hsl(169,82%,27%)"; 
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = "hsl(187, 24%, 22%)";
        });
    });
}

function validateForm() {
    const fields = {
        firstName: document.getElementById("firstN"),
        lastName: document.getElementById("lastN"),
        email: document.getElementById("emailA"),
        message: document.getElementById("message"),
        consent: document.getElementById("consent").checked,
        queryType1: document.getElementById("generalEnquiry").checked,
        queryType2: document.getElementById("supportRequest").checked
    };

    let isValid = true;

    isValid = validateField(fields.firstName, "requiredFirstName") && isValid;
    isValid = validateField(fields.lastName, "requiredLastName") && isValid;
    isValid = validateEmail(fields.email) && isValid;
    isValid = validateField(fields.message, "requiredMessage") && isValid;
    isValid = validateQueryType(fields.queryType1, fields.queryType2) && isValid;
    isValid = validateConsent(fields.consent) && isValid;

    return isValid;
}

function validateField(field, errorId) {
    if (field.value.trim() === "") {
        showError(errorId);
        markInputError(field);
        return false;
    }
    hideError(field, errorId); 
    return true;
}

function validateEmail(emailField) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value.trim() === "") {
        showError("requiredEmail");
        markInputError(emailField);
        return false;
    } else if (!emailRegex.test(emailField.value.trim())) {
        showError("errorEmail", "Please enter a valid email address");
        markInputError(emailField);
        return false;
    }
    hideError(emailField, "errorEmail"); 
    unmarkInputError(emailField);
    return true;
}

function hideError(field, errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        
        errorElement.style.display = "none";
    }
    field.style.borderColor = ""; 
}

function unmarkInputError(inputField) {
    inputField.style.borderColor = "";
}

function validateQueryType(query1, query2) {
    if (!query1 && !query2) {
        showError("selectQueryType");
        return false;
    }
    hideError(document.getElementById("radioQuery1"), "selectQueryType");
    return true;
}

function validateConsent(consent) {
    if (!consent) {
        showError("requiredConsent");
        return false;
    }
    hideError(document.getElementById("consent"), "requiredConsent");
    return true;
}


function showMessageSent() {
    const sendMessage = document.getElementById("messageSent");
    sendMessage.classList.add("active");
    setTimeout(() => {
        sendMessage.classList.remove("active");
    }, 3000);
}

//  AUXILIAR FUNCTIONS
function showError(elementId, message) {
    const elementHTML = document.getElementById(elementId);
    elementHTML.style.display = "inline-block";
    if (message) elementHTML.textContent = message;
}


function markInputError(inputField) {
    inputField.style.borderColor = "hsl(0, 66%, 54%)";
}


function resetStyles() {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.style.borderColor = ""; 
    });

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => {
        error.style.display = "none";
    });
}

function selectRadio(selectedDiv, otherDiv, radioId) {
    toggleRadioStyle(selectedDiv, otherDiv);
    document.getElementById(radioId).checked = true;
}

function toggleRadioStyle(selectedElement, otherElement) {
    const removeSvg = (element) => {
        const existingSvg = element.querySelector("svg");
        if (existingSvg) existingSvg.remove();
    };

    // Reset other radio
    otherElement.style.backgroundColor = "white";
    otherElement.style.borderColor = "hsl(186, 15%, 59%)";
    removeSvg(otherElement);

    //Add new styles
    selectedElement.style.backgroundColor = "hsl(148, 38%, 91%)";
    selectedElement.style.borderColor = "hsl(169, 82%, 27%)";
    removeSvg(selectedElement);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

