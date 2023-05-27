signinForm = function (event) {
	event.preventDefault(); 

    var existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
    var userName = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var existingData = JSON.parse(localStorage.getItem("formData")) || [];
    var username = userName.value.trim();
    var password = passwordInput.value.trim();

    existingUsers.forEach(user => {
        if(user.username === username && user.password === password){
            alert("Sign in Successful ");
            const uid = user.uid;
            var currentUser = {
                firstName : existingData[uid].firstName,
                lastName : existingData[uid].lastName,
                email : existingData[uid].email,
                dateOfBirth : existingData[uid].date,
                gender : existingData[uid].gender,
                phone : existingData[uid].phone,
                comment : existingData[uid].comment,
            }
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = '/registered';
        }
    });
}