document.addEventListener("DOMContentLoaded", () => {
    setupFormSubmit();
    setupRadioButtons();
    setupFieldListeners(); // Agregar listeners para ocultar errores en tiempo real
    setupCheckboxListener(); // Listener para el checkbox
});

// CONFIGURAR ENVÍO DE FORMULARIO
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

// CONFIGURAR BOTONES DE RADIO
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

// CONFIGURAR EVENTOS PARA CAMPOS INDIVIDUALES
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

    // Agregar listener específico para validar el email en tiempo real
    fields.email.addEventListener("input", () => {
        if (!validateEmail(fields.email)) {
            showError("errorEmail", "Please enter a valid email address");
            markInputError(fields.email);
        } else {
            hideError(fields.email, "errorEmail");
            unmarkInputError(fields.email); // Restablecer el estilo del campo
        }
    });
}

// CONFIGURAR LISTENER PARA CHECKBOX
function setupCheckboxListener() {
    const consentCheckbox = document.getElementById("consent");
    consentCheckbox.addEventListener("change", () => {
        hideError(consentCheckbox, "requiredConsent");
    });
}

// VALIDAR FORMULARIO
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

// VALIDAR UN CAMPO
function validateField(field, errorId) {
    if (field.value.trim() === "") {
        showError(errorId);
        markInputError(field);
        return false;
    }
    hideError(field, errorId); // Ocultar el error si el campo es válido
    return true;
}

// VALIDAR EMAIL
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
    hideError(emailField, "errorEmail"); // Ocultar error cuando el correo es válido
    unmarkInputError(emailField); // Restablecer el estilo del campo si es válido
    return true;
}

// OCULTAR ERROR
function hideError(field, errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.visibility = "hidden";
    }
    field.style.borderColor = ""; // Restablecer el borde del campo
}

// RESTABLECER EL ESTILO DEL CAMPO SI ES VÁLIDO
function unmarkInputError(inputField) {
    inputField.style.borderColor = ""; // Eliminar el borde rojo del campo
}

// VALIDAR TIPO DE CONSULTA
function validateQueryType(query1, query2) {
    if (!query1 && !query2) {
        showError("selectQueryType");
        return false;
    }
    hideError(document.getElementById("radioQuery1"), "selectQueryType");
    return true;
}

// VALIDAR CONSENTIMIENTO
function validateConsent(consent) {
    if (!consent) {
        showError("requiredConsent");
        return false;
    }
    hideError(document.getElementById("consent"), "requiredConsent");
    return true;
}

// MOSTRAR MENSAJE ENVIADO
function showMessageSent() {
    const sendMessage = document.getElementById("messageSent");
    sendMessage.classList.add("active");
    setTimeout(() => {
        sendMessage.classList.remove("active");
    }, 3000);
}

// FUNCIONES AUXILIARES

// MOSTRAR ERROR
function showError(elementId, message) {
    const elementHTML = document.getElementById(elementId);
    elementHTML.style.visibility = "visible";
    if (message) elementHTML.textContent = message;
}

// MARCAR CAMPO CON ERROR
function markInputError(inputField) {
    inputField.style.borderColor = "hsl(0, 66%, 54%)";
}

// RESETEAR ESTILOS DESPUÉS DEL ENVÍO
function resetStyles() {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.style.borderColor = ""; // Restablecer bordes
    });

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => {
        error.style.visibility = "hidden"; // Ocultar todos los errores
    });
}

// SELECCIONAR RADIO BUTTON Y CAMBIAR COLOR
function selectRadio(selectedDiv, otherDiv, radioId) {
    toggleRadioStyle(selectedDiv, otherDiv);
    document.getElementById(radioId).checked = true;
}

// CAMBIAR COLOR DE LOS BOTONES DE RADIO
function toggleRadioStyle(selectedElement, otherElement) {
    const removeSvg = (element) => {
        const existingSvg = element.querySelector("svg");
        if (existingSvg) existingSvg.remove();
    };

    // Resetear otros radios
    otherElement.style.backgroundColor = "white";
    otherElement.style.borderColor = "hsl(186, 15%, 59%)";
    removeSvg(otherElement);

    // Añadir estilos seleccionados
    selectedElement.style.backgroundColor = "hsl(148, 38%, 91%)";
    selectedElement.style.borderColor = "hsl(169, 82%, 27%)";
    removeSvg(selectedElement);
}

// Capitalizar la primera letra de una palabra
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

