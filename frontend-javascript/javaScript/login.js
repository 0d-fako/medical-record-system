document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const errorMessage = document.getElementById("error-message");

    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");


    togglePassword.addEventListener("click", function () {
        const currentType = passwordInput.getAttribute("type");

        if (currentType === "password") {
            passwordInput.setAttribute("type", "text");
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.setAttribute("type", "password");
            togglePassword.textContent = "👁️";
        }
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        errorMessage.textContent = "";

        const email = document.getElementById("email").value;
        const password = passwordInput.value;

        if (email === "" || password === "") {
            errorMessage.textContent = "⚠️ Please fill in all fields!";
            return;
        }

        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8080/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log("Server Response:", result);

            if (!response.ok) {
                errorMessage.textContent = `⚠️ ${result.message || "Login failed!"}`;
                return;
            }

            errorMessage.style.color = "green";
            errorMessage.textContent = "✅ Login successful!";
        } catch (error) {
            console.error("Error:", error);
            errorMessage.textContent = "⚠️ Failed to connect to the server.";
        }
    });
});
