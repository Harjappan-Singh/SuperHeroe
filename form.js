let uniqueIDUser = 0;
let usersData = [];
window.onload = () => {
    // set up the connection to the external .json file
    let url = `usersLoginData.json`;
    fetch(url)
        .then(response => response.json()) // gets the json data from the file
        .then(jsonData => {
            jsonData.map(user => {
                let webUser = {
                    "userID": uniqueIDUser,
                    "name": user.name,
                    "email": user.email,
                    "password": user.password,
                    "isAdministrator": user.isAdministrator
                }
                uniqueIDUser++;
                usersData.push(webUser);
            })// copying the data from the file to the users data
        })
}




let dataCont = document.getElementById("dataContainer");
let formCont = document.getElementById("formBodyContainer")
dataCont.style.display = "none";
formCont.style.display = "flex";
let userAdministrator = false;
let invalidMsg = document.getElementById("invalidData")


function validateData() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;

    let resultAdmin = usersData.some(user => (user.email === email && user.password === password && user.isAdministrator === "true"));

    if (resultAdmin) {
        formCont.style.display = "none";
        userAdministrator = true;
        // added slight transition
        document.body.style.animation = "transitionIn 0.2s"
        displayHero(superHeroes);
        dataCont.style.display = "block";
    } else if (usersData.some(user => (user.email === email && user.password === password && user.isAdministrator === "false"))) {
        formCont.style.display = "none";
        userAdministrator = false;
        document.body.style.animation = "transitionIn 0.2s"
        displayHero(superHeroes);
        dataCont.style.display = "block";
        document.getElementById("addHeroButton").style.display = "none";
        document.getElementById("viewUsersButton").style.display = "none";
    }
    else {
        invalidMsg.style.display = "block";
    }
    return false;
}



