document.addEventListener("DOMContentLoaded", ()=>{
    
    const form = document.querySelector("form");
    form.addEventListener("submit", (event)=>{
        
        event.preventDefault();
        resetError();
        
        let valid = validateForm();

        //SI LA VALICACION ES CORRECTA, SE ENVIA EL FORMULARIO
        if(valid){
            console.log("======== 1 ========")
            
            const sendMessage = document.getElementById("messageSent");
            console.log("======== 2 ========")
            sendMessage.classList.add('active');
            setTimeout(() => {
                console.log("======== 3 ========")
                sendMessage.classList.remove('active');
            }, 3000);
        }
    })
    const divQuery1 = document.getElementById("radioQuery1");
    const divQuery2 = document.getElementById("radioQuery2");
    const radio1 = document.getElementById("generalEnquiry");
    const radio2 = document.getElementById("supportRequest");

    const svgRadio = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21">
            <path fill="#0C7D69" d="M10 .75a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 10 .75Zm0 18a8.25 8.25 0 1 1 8.25-8.25A8.26 8.26 0 0 1 10 18.75Zm5.25-8.25a5.25 5.25 0 1 1-10.499 0 5.25 5.25 0 0 1 10.499 0Z"/>
        </svg>`

    divQuery1.addEventListener('click',() => {
        divColorGreen(divQuery1, divQuery2, svgRadio);
        radio1.checked = true;
        })
        divQuery2.addEventListener('click', ()=>{
        divColorGreen(divQuery2, divQuery1, svgRadio);
        radio2.checked = true;
        })
 
});


// Functionss

function validateForm(){

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
    if(firstName === ""){
        showError("requiredFirstName");
        inputError("firstN");
        isValid = false;
    }

    if (lastName === ""){
        showError("requiredLastName");
        inputError("lastN");
        isValid = false;
    }

    if (email === ""){
        showError("requiredEmail");
        inputError("emailA");
        isValid = false;
       
    } else if (!emailRegex.test(email)){
        let especialCase = document.getElementById("errorEmail");
        especialCase.style.visibility = 'visible';
        especialCase.textContent= "Please enter a valid email address";
        inputError("lastN");
        isValid = false;
        }
       
    if (message === ""){
        showError("requiredMessage");
        inputError("message");
        isValid = false;
    }
    if (!queryType1 && !queryType2){
        showError("selectQueryType");
        isValid = false;
    }

    if(!consent){
        showError("requiredConsent");
        isValid = false;
    }
    return isValid;
}

// FUNCTION FOR SHOW THE ERROR
function showError(elementId){
    const elementHTML = document.getElementById(elementId);
    elementHTML.style.visibility = 'visible';
}
//FUNCTION FOR PAINT THE INPUT
function inputError(inputID){
    document.getElementById(inputID).style.borderColor = 'hsl(0, 66%, 54%)';
}
function resetError(){
    const errorMessages = document.querySelectorAll("errorMessage");
    errorMessages.forEach((message)=>{
        message.style.visibility = 'hidden';
    })
}

function divColorGreen(element , otherElement, svgRadio){
    
    const existingSvg = otherElement.querySelector("svg");
    const existingSvg2 = element.querySelector("svg");

    
    //primero poner todos los valores de los nulos en cero
    otherElement.style.backgroundColor = 'white';
    otherElement.style.borderColor = "hsl(186, 15%, 59%)";
    otherElement.classList.remove("selected");

    if (existingSvg || existingSvg2 ) {
        existingSvg?.remove();
        existingSvg2?.remove();

    }
   
    //Añadir al contenedor el icono
    element.style.backgroundColor = "hsl(148, 38%, 91%)";
    element.style.borderColor = "hsl(169, 82%, 27%)";
    element.classList.add("selected");
}