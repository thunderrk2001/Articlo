document.getElementById("login-btn").addEventListener("click", () => {
    window.location = "/signIn"
})
document.getElementById("signUp").addEventListener("click", () => {
    var userName = document.getElementById("floatingInput").value
    var pass = document.getElementById("floatingPassword").value
    var confirm_pass = document.getElementById("floatingConfirmPassword").value
    if (userName.length > 2 && pass.length > 2 && confirm_pass.length > 2 && pass == confirm_pass) {
        register(userName, pass)
    }


})
async function register(userName, password) {
    try {
        const rawResponse = await fetch("/signUp", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            })
        })
        if (rawResponse.ok) {
            const nextPage = getCookie("nextPage")
            if (nextPage == undefined || nextPage == null || nextPage == "") {
                //go to home page
                window.location = "/"
            } else {
                window.location.reload(false)
                window.location = nextPage
            }
        } else {
            var json_res = await rawResponse.json()
            console.log(json_res)
            document.getElementById("message").innerText = json_res.message

        }
    } catch (e) {
        document.getElementById("message").innerText = e.message
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}