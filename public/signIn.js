signinForm = function (event) {
	event.preventDefault(); 

    var existingData = JSON.parse(localStorage.getItem("formData")) || [];
    var userIdInput = document.getElementById("userId");
    var passwordInput = document.getElementById("password");

    var userId = parseInt(userIdInput.value.trim());
    var password = passwordInput.value.trim();

    existingData.forEach(user => {
        console.log("user.uid", typeof(user.uid));
        console.log("userId", typeof(userId));
        if(user.uid === userId && user.password === password){
            alert("Sign in Successful ");
            var currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = '/registered';
        }
    });
}