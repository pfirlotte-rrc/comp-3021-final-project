const form = document.getElementById("submissionForm");
const emailInput = form.elements["email"];

/* 
Submit button event listener that prevents default submission, clears previous
error messages and verifies that the form is valid prior to submission.
*/ 
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages) {
        el.remove();
    }

    if (validateForm()) {
        form.submit();
    } else {
        console.error("Form has errors");
    }
});

// different input checking for the form
function validateForm() {
    let isFormValid = true;

// Checks that the first name is not empty or numbers
    const userName = document.getElementById("name");

    if (userName.value === "") {
        showInputError(userName, "Please enter a first name. ");
        isFormValid = false;
    }

    else if (!isNaN(userName.value)) {
        showInputError(userName, "Please use letters. ");
        isFormValid = false;
    }
// Validates the email entered

    const emailInputElement = document.getElementById("email");
    const emailInputValue = emailInputElement.value;

    const emailPattern = /.+@.+\..+/;

    if (emailInputElement.value === "") {
        showInputError(emailInputElement, "Please enter an email address. ");
        isFormValid = false;
    }

    else if (!emailPattern.test(emailInputValue)) {
        showInputError(emailInputElement, "Please enter a valid email address.");
        isFormValid = false;
    }

// Validates Radio Buttons
    const radioSelected = document.getElementById("option1"); 
    const radioSelected2 = document.getElementById("option2");

    if (!radioSelected.checked && !radioSelected2.checked) {
        showInputError(radioSelected,"Please select an option.");
        isFormValid = false;
    }

// Validates Dropdown

    const dropdownSelected = document.getElementById("cereal-table");

    if (dropdownSelected.value === "") {
        showInputError(dropdownSelected,"Please select an cereal type.");
        isFormValid = false;
    }
    else if (dropdownSelected.value === "Please Choose an Option.") {
        showInputError(dropdownSelected,"Please select an cereal type.");
        isFormValid = false;
    }

// Checks that the quantity is not empty or letters

    const amountNumber = document.getElementById("quantity");

    if (amountNumber.value === "") {
        showInputError(amountNumber, "Please enter an number. ");
        isFormValid = false;
    }

    // else if (isNaN(amountNumber.value)) {
    //     showInputError(amountNumber, "Please enter a number. ");
    //     isFormValid = false;
    // }

    return isFormValid;
}

// Appends the error messages
function showInputError(inputElement, message) {
    const container = inputElement.closest(".input-container");
    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role", "alert");

    container.appendChild(errorDisplay);
}

form.addEventListener("reset", (event) => {

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages) {
        el.remove();
    }

    form.reset();

});