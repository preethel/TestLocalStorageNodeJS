let submitEditForm;
function updateCheckbox(checkbox) {
    var checkboxes = document.getElementsByName("gender");

    if (checkbox.checked) {
        checkboxes.forEach(function (cb) {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });
    }
}
// submitEditForm(event);
document.addEventListener('DOMContentLoaded', () => {
    //Registration Form Submission
    submitForm = function (event) {
	event.preventDefault(); // Prevent form submission

	// Get form values
	var fnInput = document.getElementById("fname");
	var lnInput = document.getElementById("lname");
	var emailInput = document.getElementById("email");
	var phoneInput = document.getElementById("number");
	var passInput = document.getElementById("password");
	var dateInput = document.getElementById("date");
	var commentInput = document.getElementById("comment");
	var gender = "";

	var fname = fnInput.value.trim();
	var lname = lnInput.value.trim();
	var email = emailInput.value.trim();
	var phone = phoneInput.value.trim();
	var date = dateInput.value.trim();
	var comment = commentInput.value.trim();
	var password = passInput.value.trim();



	var checkboxes = document.getElementsByName("gender");
	checkboxes.forEach(function (checkbox) {
		if (checkbox.checked) {
			gender = checkbox.value;
		}
	});

	var checkValid = 1;

	// Create new entry object

	if (validateRegularExpression(fname)) {
		//  proceed with form submission or other actions
	} else {
		alert("Please enter a valid First name.");
		checkValid = 0;
	}
	if (validateRegularExpression(lname)) {
		//  proceed with form submission or other actions
	} else {
		alert("Please enter a valid Last name.");
		checkValid = 0;
	}

	if (validateEmail(email)) {
		//  proceed with form submission or other actions
	} else {
		alert("Please enter a valid email.");
		checkValid = 0;
	}

	if (validateMobileNumber(phone)) {
		// proceed with form submission or other actions
	} else {
		alert("Please enter a valid Mobile No. start with 01.");
		checkValid = 0;
	}
	if (validatePassword(password)) {
		// proceed with form submission or other actions
	} else {
		alert("Please enter password Strongly!");
		checkValid = 0;
	}

	if (checkValid != 1) {
		console.log("Validation Error!");
	} else {
		var entry = {
			fristName: fname,
			lastName: lname,
			email: email,
			dateOfBrith: date,
			phone: phone,
			gender: gender,
			comment: comment,
			password: password,
		};
		//Regular Expression validation

		// Retrieve existing data from localStorage or initialize empty array
		var existingData = JSON.parse(localStorage.getItem("formData")) || [];

		// Add new entry to existing data
		existingData.push(entry);

		// Save updated data to localStorage
		localStorage.setItem("formData", JSON.stringify(existingData));

		// Display success message
		alert("Form data submitted successfully!");

		// Reset form fields
		document.getElementById("myForm").reset();
	}
}
});
//Validation functions
function validateRegularExpression(text) {
	// Regular expression pattern for name validation (only allows letters, spaces, and hyphens)
	var pattern = /^[a-zA-Z\s-\s.]+$/;

	return pattern.test(text);
}

//Email Validation
function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9-_]+@[^\s@]+\.[a-zA-Z]{3,}$/;
	return emailRegex.test(email);
}

//Mobile validation
function validateMobileNumber(mobile) {
	const mobileNumberRegex = /^01\d{9}$/;
	return mobileNumberRegex.test(mobile);
	//<!-- pattern="01[0-9]{9}" -->
}

//password validation
function validatePassword(password) {
	const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{4,}$/;
	return passwordRegex.test(password);
}