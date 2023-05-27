const modalCloseButton = document.getElementById("closeModal");
function logout(){
	localStorage.setItem("currentUser", JSON.stringify([]));
	document.getElementById("logout").style.display = "none";
}
var currentPage = 1;
let showList;
document.addEventListener("DOMContentLoaded", () => {
	var userListElement = document.getElementById("userList");
	var paginationElement = document.getElementById("pagination");
	var searchButton = document.getElementById("searchForm");
	searchForm;
	var itemsPerPage = 1;

	var buttonsToShow = 3;

	showList = function () {
		var users = JSON.parse(localStorage.getItem("formData")) || [];
		userListElement.innerHTML = "";
		var totalItem = users.length;
		var startIndex = (currentPage - 1) * itemsPerPage;
		//console.log("start Index =>", startIndex);
		//console.log("Current page =>", currentPage);
		var endIndex = startIndex + itemsPerPage;
		var paginatedData = users.slice(startIndex, endIndex);

		var searchedUser = searchEntries(searchItem);
		if (searchedUser != 0) {
			paginatedData = searchedUser.slice(startIndex, endIndex);
			totalItem = searchedUser.length;
		}

		paginatedData.forEach(function (entry, index) {
			// existing code to create table rows
			var row = document.createElement("tr");
			var nameCell = document.createElement("td");
			var fname = entry.firstName;
			var lname = entry.lastName;

			var name = fname.concat(" " + lname);

			nameCell.textContent = name;
			var emailCell = document.createElement("td");
			emailCell.textContent = entry.email;
			var phoneCell = document.createElement("td");
			phoneCell.textContent = entry.phone;
			var dobCell = document.createElement("td");
			dobCell.textContent = entry.dateOfBrith;
			var genderCell = document.createElement("td");
			genderCell.textContent = entry.gender;

			var actionsCell = document.createElement("td");
			var editButton = document.createElement("button");
			editButton.textContent = "Edit";
			editButton.classList.add("btn", "btn-primary", "mr-2");
			editButton.setAttribute("data-toggle", "modal");
			editButton.setAttribute("data-target", "#editModal");
			editButton.addEventListener("click", function () {
				openEditModal(index);
			});

			var deleteButton = document.createElement("button");
			deleteButton.textContent = "Delete";
			deleteButton.classList.add("btn", "btn-danger");
			deleteButton.addEventListener("click", function () {
				deleteEntry(index);
			});

			actionsCell.appendChild(editButton);
			actionsCell.appendChild(deleteButton);

			row.appendChild(nameCell);
			row.appendChild(emailCell);
			row.appendChild(phoneCell);
			row.appendChild(dobCell);
			row.appendChild(genderCell);
			row.appendChild(actionsCell);
			userList.appendChild(row);
		});
		renderPagination(totalItem, currentPage, itemsPerPage);
	};
	var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
	//console.log("cU => ", currentUser.uid);
	if (currentUser.uid > 0) {
		document.getElementById("logout").style.display = "block";
		showList();
	} else {
		document.getElementById("empList").style.display = "none";
		document.getElementById("notFound").style.display = "block";
	}

	function renderPagination(totalItem, currentPage, itemsPerPage) {
		paginationElement.innerHTML = "";
		// var totalItem = users.length;
		var totalPages = Math.ceil(totalItem / itemsPerPage);
		var startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
		var endPage = Math.min(startPage + buttonsToShow - 1, totalPages);
		
		var prevButton = document.createElement("a");
		prevButton.href = "#";
		prevButton.textContent = "<";
		prevButton.classList.add("pagination-button");
		paginationElement.appendChild(prevButton);
		if (startPage < endPage && currentPage > 1) {
			prevButton.addEventListener("click", function (event) {
				event.preventDefault();
				window.currentPage = window.currentPage - 1;
				showList();
				renderPagination(totalItem, window.currentPage, itemsPerPage);
			});
		}


		if (startPage > 1) {
			var firstButton = document.createElement("a");
			firstButton.href = "#";
			firstButton.textContent = "1";
			firstButton.classList.add("pagination-button");
			firstButton.addEventListener("click", function (event) {
				event.preventDefault();
				window.currentPage = 1;
				showList();
				renderPagination(totalItem, window.currentPage, itemsPerPage);
			});
			
			paginationElement.appendChild(firstButton);
			if(currentPage > 3){
				firstButton.textContent = "1..";
			}
		}

		for (var i = startPage; i <= endPage; i++) {
			var pageLink = document.createElement("a");
			pageLink.href = "#";
			pageLink.textContent = i;
			pageLink.className = "pagination-button";

			if (i === window.currentPage) {
				pageLink.classList.add("active");
			}

			pageLink.addEventListener("click", function (event) {
				event.preventDefault();
				window.currentPage = parseInt(event.target.textContent);
				// //console.log("current Page next", window.currentPage);
				showList();
				renderPagination(totalItem, window.currentPage, itemsPerPage);
			});

			paginationElement.appendChild(pageLink);
		}

		if (endPage < totalPages) {
			var lastButton = document.createElement("a");
			lastButton.href = "#";
			lastButton.textContent = totalPages;
			lastButton.classList.add("pagination-button");
			lastButton.addEventListener("click", function (event) {
				event.preventDefault();
				window.currentPage = totalPages;
				showList();
				renderPagination(totalItem, window.currentPage, itemsPerPage);
			});
			if(!(currentPage+2 >= totalPages)){
				// firstButton.textContent = "1..";
				lastButton.textContent = `..${totalPages}`;
			}
			paginationElement.appendChild(lastButton);

		}

		var nextButton = document.createElement("a");
		nextButton.href = "#";
		nextButton.textContent = ">";
		nextButton.classList.add("pagination-button");
	    paginationElement.appendChild(nextButton);
		if (endPage > currentPage) {
			nextButton.addEventListener("click", function (event) {
				event.preventDefault();
				window.currentPage = window.currentPage + 1;
				showList();
				renderPagination(totalItem, window.currentPage, itemsPerPage);
			});
		}
		
	}

	//Function for detele entry
	function deleteEntry(id) {
		// Retrieve existing data from localStorage
		var existingData = JSON.parse(localStorage.getItem("formData")) || [];

		// Remove the entry at the specified id
		existingData.splice(id, 1);

		// Save updated data to localStorage
		localStorage.setItem("formData", JSON.stringify(existingData));

		// Show the updated list
		showList();
		// renderPagination();
	}
});
// showList();
// renderPagination();
function openEditModal(id) {
	// Retrieve existing data from localStorage
	var existingData = JSON.parse(localStorage.getItem("formData")) || [];

	// Get the entry to edit based on the id
	var entry = existingData[id];

	// Populate the edit form with the entry data
	var editForm = document.getElementById("editForm");
	editForm.elements["editFname"].value = entry.firstName;
	editForm.elements["editLname"].value = entry.lastName;
	editForm.elements["editEmail"].value = entry.email;
	editForm.elements["editPhone"].value = entry.phone;
	editForm.elements["editDate"].value = entry.dateOfBrith;
	// editForm.elements["editComment"].value = entry.comment;
	editForm.elements["editGender"].value = entry.gender;
	// editForm.elements["editPassword"].value = entry.password;
	editForm.elements["id"].value = id;

	// Perform form submission or other actions
	editForm.onsubmit = submitEditForm;

	// Show the edit modal
	// $("#editModal").modal("show");
	$("#editModal").on("hidden.bs.modal", function () {
		// window.alert('hidden event fired!');
	});
}

//Modal form submission
function submitEditForm(event) {
	event.preventDefault(); // Prevent form submission

	// Get form values
	var editFnameInput = document.getElementById("editFname");
	var editLnameInput = document.getElementById("editLname");
	var editEmailInput = document.getElementById("editEmail");
	var editPhoneInput = document.getElementById("editPhone");
	var editDateInput = document.getElementById("editDate");
	// var editCommentInput = document.getElementById('editComment');
	var editGenderInput = document.getElementById("editGender");
	// var editPasswordInput = document.getElementById('editPassword');
	var idInput = document.getElementById("id");

	// Get the index of the entry being edited
	var id = parseInt(idInput.value);

	var fname = editFnameInput.value.trim();
	var lname = editLnameInput.value.trim();
	var email = editEmailInput.value.trim();
	var phone = editPhoneInput.value.trim();

	var checkValid = 1;

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

	if (checkValid != 1) {
		alert("Please fill correctly.");
	} else {
		// Retrieve existing data from localStorage
		var existingData = JSON.parse(localStorage.getItem("formData")) || [];
		existingData[id].firstName = fname;
		existingData[id].lastName = lname;
		existingData[id].email = email;
		existingData[id].phone = phone;
		existingData[id].dateOfBrith = editDateInput.value.trim();
		// existingData[id].comment = editCommentInput.value.trim();
		existingData[id].gender = editGenderInput.value;
		// existingData[id].password = editPasswordInput.value.trim();
		// Save updated data to localStorage
		localStorage.setItem("formData", JSON.stringify(existingData));

		// Hide the modal
		$("#editModal").modal("hide");

		// close modal
		modalCloseButton.click();

		// Refresh the list
		showList();
		// renderPagination();
	}
}

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

var searchItem = [];
function searchForm(event) {
	event.preventDefault(); // Prevent form submission

	// Get form values
	var nameInput = document.getElementById("nameFilter");
	var emailInput = document.getElementById("emailFilter");
	var phoneInput = document.getElementById("mobileFilter");
	var dateInput = document.getElementById("dobFilter");
	var genderInput = document.getElementById("genderFilter");

	var name = nameInput.value.trim();
	var email = emailInput.value.trim();
	var phone = phoneInput.value.trim();
	var date = dateInput.value.trim();
	var gender = genderInput.value.trim();

	name = name.toLowerCase();
	email = email.toLowerCase();
	phone = phone.toLowerCase();
	date = date.toLowerCase();
	gender = gender.toLowerCase();

	searchItem = {
		firstName: name,
		lastName: name,
		email: email,
		phone: phone,
		dateOfBrith: date,
		gender: gender,
	};
	showList();
	// renderPagination();
}
// Function to search entries by multiple fields
function searchEntries(searchInput) {
	var existingData = JSON.parse(localStorage.getItem("formData")) || [];
	var searchResults = [];

	const searchFirstName = searchInput.firstName
		? searchInput.firstName.toLowerCase()
		: null;
	const searchLastName = searchInput.lastName
		? searchInput.lastName.toLowerCase()
		: null;
	const searchEmail = searchInput.email
		? searchInput.email.toLowerCase()
		: null;
	const searchDateOfBrith = searchInput.dateOfBrith
		? searchInput.dateOfBrith.toLowerCase()
		: null;
	const searchPhone = searchInput.phone
		? searchInput.phone.toLowerCase()
		: null;
	const searchGender = searchInput.gender
		? searchInput.gender.toLowerCase()
		: null;

	//console.log("searchGender =>", searchGender);

	const clonedData = [...existingData];
	searchResults = clonedData.filter((person) => {
		//console.log("dateOfBrith =>", person.gender);
		const nameMatch =
			!searchFirstName ||
			!searchLastName ||
			person.firstName
				.toLowerCase()
				.startsWith(searchFirstName.toLowerCase()) ||
			person.lastName.toLowerCase().startsWith(searchLastName.toLowerCase());
		const emailMatch =
			!searchEmail ||
			person.email.toLowerCase().includes(searchEmail.toLowerCase());
		const phoneMatch = !searchPhone || person.phone.startsWith(searchPhone);
		const dateOfBrithMatch =
			!searchDateOfBrith ||
			person.dateOfBrith.toLowerCase() === searchDateOfBrith.toLowerCase();

		const genderhMatch =
			!searchGender ||
			person.gender.toLowerCase() === searchGender.toLowerCase();
		//console.log("genderMatch =>", genderhMatch);

		return (
			nameMatch && emailMatch && phoneMatch && dateOfBrithMatch && genderhMatch
		);
	});
	if (searchResults.length > 0) {
		//console.log("searFound =>", searchResults.length);
		// Reset form fields
		document.getElementById("searchForm").reset();
		return searchResults;
	} else {
		alert("No search Found");
		//console.log("searFound =>", searchResults.length);
		// Reset form fields
		document.getElementById("searchForm").reset();
		return [];
	}
}
