const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle('active');
})

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))



window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    navbar.classList.toggle('sticky', window.scrollY > 0);
});




const form = document.querySelector("form");
const fullName = document.getElementById("name")
const email = document.getElementById("email")
// const phone = document.getElementById("phone")
const subject = document.getElementById("subject")
const message = document.getElementById("message")


function sendEmail() {

    const bodyMessage = `Full Name: ${fullName.value} <br> Email: ${email.value}<br> Message: ${message.value}`;
    // const phoneMessage = `Full Name: ${fullName.value} <br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${message.value}`;

    Email.send({
        SecureToken: "564ea366-38be-4a05-931e-117ec28dc37b",
        To: 'crnaudio@gmail.com',
        From: "crnaudio@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
   
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Sent Successfully!",
                    text: "Thank You For Reaching Out",
                    icon: "Success"
                });

            }
        }
    );

}


function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add('error');

        }
        if(items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener('keyup', () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error")
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }

        });
    }
}


function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email")

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != ""){
            errorTxtEmail.innerText = "Enter a valid Email Address"
        } else{
            errorTxtEmail.innerText = "Email Address Can't Be Blank"
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
};




form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && 
    !email.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
       sendEmail();
       form.reset();
       return false;
    }
});

