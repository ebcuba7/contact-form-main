document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");

    form.addEventListener("submit", (event)=>{
        // EVITAR ENVIOS POR DEFECTO
        event.preventDefault();

        //VALIDAR CAMPOS
        let valid = validateForm();

        //SI LA VALICACION ES CORRECTA, SE ENVIA EL FORMULARIO
        if(valid){
            alert("Message Sent'!'Thanks for completing the form. We'll be in touch soon!");
            form.submit();
        }
    })
});

function validateForm(){
    // accediendo a los elementos del dom
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
    if(firstName === "")
    {
        document.getElementById("requiredFirstName").style.visibility = 'visible';
        document.getElementById("firstN").style.borderColor = 'hsl(0, 66%, 54%)';
        isValid = false;
    }

    if (lastName === "") {
        document.getElementById("requiredLastName").style.visibility = 'visible';
        document.getElementById("lastN").style.borderColor = 'hsl(0, 66%, 54%)';
        isValid = false;
    }
    

    if (email === "") {
        document.getElementById("requiredEmail").style.visibility = 'visible';
        document.getElementById("lastN").style.borderColor = 'hsl(0, 66%, 54%)';
        isValid = false;
       
    } else if (!emailRegex.test(email)) {
        alert(emailRegex.test(email));
        document.getElementById("errorEmail").style.visibility = 'visible';
        document.getElementById("lastN").style.borderColor = 'hsl(0, 66%, 54%)';
        isValid = false;
        }
    if (email === "") {
        document.getElementById("requiredEmail").style.visibility = 'visible';
        document.getElementById("lastN").style.borderColor = 'hsl(0, 66%, 54%)';
        isValid = false;
    }    
    if (message === "") {
        document.getElementById("requiredMessage").style.visibility = 'visible';
        document.getElementById("message").style.borderColor = 'hsl(0, 66%, 54%)';
        isValid = false;
    }
    if (!queryType1 && !queryType2) {

        document.getElementById("selectQueryType").style.visibility = 'visible';
        isValid = false;
    }

    if(!consent){
        document.getElementById("requiredConsent").style.visibility = 'visible';
        isValid = false;
    }
    return isValid;
}