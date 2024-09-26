document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {

    event.preventDefault();

    let valid = validateForm();

    //SI LA VALICACION ES CORRECTA, SE ENVIA EL FORMULARIO
    if (valid) {
      const sendMessage = document.getElementById("messageSent");
      sendMessage.classList.add("active");
      setTimeout(() => {
        sendMessage.classList.remove("active");
      }, 3000);
    }
    resetError();
  });
  const divQuery1 = document.getElementById("radioQuery1");
  const divQuery2 = document.getElementById("radioQuery2");
  const radio1 = document.getElementById("generalEnquiry");
  const radio2 = document.getElementById("supportRequest");


  divQuery1.addEventListener("click", () => {
    divColorGreen(divQuery1, divQuery2);
    radio1.checked = true;
  });
  divQuery2.addEventListener("click", () => {
    divColorGreen(divQuery2, divQuery1);
    radio2.checked = true;
  });
  

});

// Functionss

function validateForm() {
  const firstName = document.getElementById("firstN").value.trim();
  const lastName = document.getElementById("lastN").value.trim();
  const email = document.getElementById("emailA").value.trim();
  const message = document.getElementById("message").value.trim();
  const consent = document.getElementById("consent").checked;
  const queryType1 = document.getElementById("generalEnquiry").checked;
  const queryType2 = document.getElementById("supportRequest").checked;

  let isValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //validación de los campos
  if (firstName === "") {
    showError("requiredFirstName");
    inputError("firstN");
    isValid = false;
  }

  if (lastName === "") {
    showError("requiredLastName");
    inputError("lastN");
    isValid = false;
  }

  if (email === "") {
    showError("requiredEmail");
    inputError("emailA");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    let especialCase = document.getElementById("errorEmail");
    especialCase.style.visibility = "visible";
    especialCase.textContent = "Please enter a valid email address";
    inputError("lastN");
    isValid = false;
  }

  if (message === "") {
    showError("requiredMessage");
    inputError("message");
    isValid = false;
  }
  if (!queryType1 && !queryType2) {
    showError("selectQueryType");
    isValid = false;
  }

  if (!consent) {
    showError("requiredConsent");
    isValid = false;
  }
  return isValid;
}

// FUNCTION FOR SHOW THE ERROR
function showError(elementId) {
  const elementHTML = document.getElementById(elementId);
  elementHTML.style.visibility = "visible";
}
//FUNCTION FOR PAINT THE INPUT
function inputError(inputID) {
  document.getElementById(inputID).style.borderColor = "hsl(0, 66%, 54%)";
}
function resetError() {
  const errorMessages = document.querySelectorAll("errorMessage");
  errorMessages.forEach((message) => {
    alert("Entro acaaaa");
    message.style.visibility = "hidden";
  });
}

function divColorGreen(element, otherElement) {
  const existingSvg = otherElement.querySelector("svg");
  const existingSvg2 = element.querySelector("svg");

  //primero poner todos los valores de los nulos en cero
  otherElement.style.backgroundColor = "white";
  otherElement.style.borderColor = "hsl(186, 15%, 59%)";

  if (existingSvg || existingSvg2) {
    existingSvg?.remove();
    existingSvg2?.remove();
  }

  //Añadir al contenedor el icono
  element.style.backgroundColor = "hsl(148, 38%, 91%)";
  element.style.borderColor = "hsl(169, 82%, 27%)";
}
