let uniqueID = 0;
let superHeroes = [];
let url = `superHeroes.json`;
fetch(url)// takes the url
    .then(response => response.json()) // creates json object with it
    .then(jsonData => {     // grabs the datauoe
        jsonData.map(hero => {
            let superHeroe = {
                "uniqueID": uniqueID,
                "align": hero.align,
                "alive": hero.alive,
                "appearances": hero.appearances,
                "eye": hero.eye,
                "firstAppearance": hero["first appearance"],
                "gsm": hero.gsm,
                "hair": hero.hair,
                "id": hero.id,
                "name": hero.name,
                "page_id": hero.page_id,
                "sex": hero.sex,
                "urlslug": hero.urlslug,
                "year": hero.year
            }
            uniqueID++
            superHeroes.push(superHeroe)
        })
    })


let searchValue = "";



function displayHero(heroArray) {
    let htmlString = `<table> <thead>
    <tr>
        <th>Align</th>
        <th>Alive 
            <select name="" id="alive_sort" onchange="displayAlive()">
                <option value="none" >  ---- Select ----</option>
                <option value="living">living characters</option>
                <option value="deceased" >deceased charactesr</option>
            </select>
        </th>
        <th class="responsive" onclick ="sortAccordingToAppearance()" >Appearances <span id="appearance"></span></th>
        <th>Eye
            <select name="" id="eye_sort" onchange="displayEye()">
                <option value="none" >  ---- Select ----</option>
                <option value="blue">blue</option>
                <option value="brown">brown</option>
                <option value="green">green</option>
                <option value="purple">purple</option>
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="white">white</option>
                <option value="red">red</option>
            </select>
    </th>
        <th class="responsive">First Appearance</th>
        <th>Hair
            <select name="hair" id="hair_sort" onchange="displayHair()">
                <option value="none" >  ---- Select ----</option>
                <option value="black">black</option>
                <option value="white">white</option>
                <option value="brown">brown</option>
                <option value="blond">blond</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="white">white</option>
                <option value="red">red</option>
            </select>
        </th>
        <th>Id
            <select name="" id="identity_sort" onchange="displayIdentity()">
                <option value="none" >  ---- Select ----</option>
                <option value="public">Public</option>
                <option value="secret" >Secret</option>
            </select>
        </th>
        <th onclick="sortAccordingToName()"> Name <span id="name"></span></th>
        <th class="responsive" onclick="sortAccordingToPageId()">Page_id <span id="page_id"></span></th>
        <th>Sex
            <select name="sex" id="sex_sort" onchange="displaySex()">
                <option value="none" >  ---- Select ----</option>
                <option value="male">Male</option>
                <option value="female" >Female</option>
            </select>
    </th>
        <th class="responsive responsive2">URLslug</th>
        <th class="responsive" onclick="sortAccordingToYear()">Year <span id="year"></span></th>`

    if (userAdministrator) {
        htmlString += `<th id="delte_modify"> Edit</th>`;
    }
    htmlString += ` </tr></thead><tbody>`;



    heroArray.forEach(hero => {
        htmlString += `<tr>
    <td>${hero.align}</td>
    <td>${hero.alive}</td>
    <td class="responsive">${hero.appearances}</td>
    <td>${hero.eye}</td>
    <td class="responsive">${hero.firstAppearance}</td>
    <td>${hero.hair}</td>
    <td>${hero.id}</td>
    <td>${hero.name}</td> 
    <td class="responsive">${hero.page_id}</td>
    <td>${hero.sex}</td>
    <td class="responsive responsive2"><a href="https://dc.fandom.com/${hero.urlslug}" target="_blank">${hero.urlslug}</a></td>
    <td class="responsive">${hero.year}</td>`

        if (userAdministrator) {
            htmlString += `
        <td id="buttonEdit"><button class="modify" onclick="modifyDialog(${hero.uniqueID})">Modify</button>
        <button class="delete" onclick="deleteHero(${hero.uniqueID})">Delete</button></td>
        </tr>`
        } else {
            htmlString += `</tr>`
        }

    })

    htmlString += `</tbody></table><br>
    ${heroArray.length} items found.`;

    let dataString = document.getElementById("data");
    dataString.innerHTML = htmlString;
}




// filtering data using select boxes
function displayAlive() {
    let aliveData = document.getElementById("alive_sort").value;
    let aliveArray = superHeroes.filter(hero => hero.alive.includes(aliveData))
    displayHero(aliveArray);
}

function displaySex() {
    let sexData = document.getElementById("sex_sort").value;
    let sexArray = [];
    if (sexData === "male") {
        sexArray = superHeroes.filter(hero => hero.sex === "male characters")
    } else {
        sexArray = superHeroes.filter(hero => hero.sex === "female characters")
    }

    displayHero(sexArray);
}

function displayHair() {
    let hairData = document.getElementById("hair_sort").value;
    let hairArray = superHeroes.filter(hero => hero.hair === (hairData + " hair"))
    displayHero(hairArray);
}

function displayEye() {
    let eyeData = document.getElementById("eye_sort").value;
    let eyeArray = superHeroes.filter(hero => hero.eye === (eyeData + " eyes"));
    displayHero(eyeArray);
}

function displayIdentity() {
    let identityData = document.getElementById("identity_sort").value;
    let identityArray = superHeroes.filter(hero => hero.id.includes(identityData))
    displayHero(identityArray);
}
// select box end

// filtering data using search box
function displayWithSearch(value) {
    searchValue = value;
    dataWithSpecifiedArray = superHeroes.filter(hero =>
        hero.name.toLowerCase().includes(value.toLowerCase())
        || hero.urlslug.toLowerCase().includes(value.toLowerCase())
    )
    displayHero(dataWithSpecifiedArray)
}



// sorting data onclicking the headers
let countName = 0;
let ascendingName = 0;
function sortAccordingToName() {
    let nameSortedArray = [...superHeroes];
    if (ascendingName % 2 === 0) {
        nameSortedArray.sort((a, b) => a.name < b.name ? -1 : 1);
        displayHero(nameSortedArray);
        // ask why not inner html changing when clicking
        ascendingName++;
    } else {
        nameSortedArray.sort((a, b) => a.name < b.name ? 1 : -1);
        displayHero(nameSortedArray);
        ascendingName++;
    }
    if (countName % 2 === 0) {
        document.getElementById("name").innerHTML = "&darr;"
        countName++;
    } else {
        document.getElementById("name").innerHTML = "&uarr;"
        countName++;
    }

}

let countYear = 0;
let ascendingYear = false;
function sortAccordingToYear() {
    let yearSortedArray = [...superHeroes];

    if (!ascendingYear) {
        yearSortedArray.sort((a, b) => a.year < b.year ? -1 : 1)
        ascendingYear = true;
    } else {
        yearSortedArray.sort((a, b) => a.year < b.year ? 1 : -1)
        ascendingYear = false;
    }
    displayHero(yearSortedArray);
    if (countYear % 2 === 0) {
        document.getElementById("year").innerHTML = "&darr;"
        countYear++;
    } else {
        document.getElementById("year").innerHTML = "&uarr;"
        countYear++;
    }
}


let countPageId = 0;
let ascendingPageId = false;
function sortAccordingToPageId() {
    let pageIdSortedArray = [...superHeroes];
    if (!ascendingPageId) {
        pageIdSortedArray.sort((a, b) => a < b ? -1 : 1)
        ascendingPageId = true;
    } else {
        pageIdSortedArray.sort((a, b) => a < b ? 1 : -1)
        ascendingPageId = false;
    }
    displayHero(pageIdSortedArray);
    if (countPageId % 2 === 0) {
        document.getElementById("page_id").innerHTML = "&darr;"
        countPageId++;
    } else {
        document.getElementById("page_id").innerHTML = "&uarr;"
        countPageId++;
    }
}

let ascendingAppearance = false;
let countAppearance = 0;
function sortAccordingToAppearance() {

    let appearanceSortedArray = [...superHeroes];
    if (!ascendingAppearance) {
        appearanceSortedArray.sort((a, b) => a < b ? -1 : 1)
        ascendingAppearance = true;
    } else {
        appearanceSortedArray.sort((a, b) => a < b ? 1 : -1)
        ascendingAppearance = false;
    }
    displayHero(appearanceSortedArray);
    // ask why innerhtml work outside the if statements but not inside
    if (countAppearance % 2 === 0) {
        document.getElementById("appearance").innerHTML = "&darr;"
        countAppearance++;
    } else {
        document.getElementById("appearance").innerHTML = "&uarr;"
        countAppearance++;
    }
}

// sorting with respect to keys we have
let dataAscending = false;
let lastSortedKey = "align";
function sort(key) {
    let sortedArray = [...superHeroes]
    if (dataAscending) {
        sortedArray.sort((a, b) => a[key] < b[key] ? 1 : -1)
        dataAscending = false;
    }
    else {
        sortedArray.sort((a, b) => a[key] < b[key] ? -1 : 1)
        dataAscending = true;
    }
    displayHero(sortedArray);
}
// sorting done

const formModal = document.getElementById("addHeroFormModal");
const showModal = document.getElementById("openModal");

openModal.addEventListener("click", () => {
    formModal.showModal();
    formModal.style.animation = "transitionIn 1s"
})

uniqueID = superHeroes.length;
function addHero(align, alive, appearance, eye, firstAppearance, hair, ID, name, page_id, sex, url, year) {

    let newHero = {
        uniqueID: uniqueID,
        align: align, alive: alive, appearances: appearance, eye: eye, firstAppearance: firstAppearance,
        hair: hair, id: ID, name: name, page_id: page_id, sex: sex, urlslug: url, year: year
    }
    superHeroes.push(newHero);
    uniqueID++;
    displayHero(superHeroes);
    formModal.close();
    return false;
}


const modifyHeroFormModal = document.getElementById("modifyHeroFormModal");
// have a global variable to store the page_id of the button user  clicked so then to modify it later
let modifyUserUniqueID;
function modifyDialog(uniqueID) {
    modifyUserUniqueID = uniqueID;
    // console.log(modifyUserPage_ID)
    modifyHeroFormModal.showModal()
    modifyHeroFormModal.style.animation = "transitionIn 1s"


    superHeroes.map(hero => {
        if (hero.uniqueID === modifyUserUniqueID) {
            document.getElementById('modifyAlign').value = hero.align
            document.getElementById('modifyAlive').value = hero.alive
            document.getElementById('modifyAppearances').value = hero.appearances
            document.getElementById('modifyEye').value = hero.eye
            document.getElementById('modifyFirstAppearances').value = hero.firstAppearance
            document.getElementById('modifyHair').value = hero.hair
            document.getElementById('modifyID').value = hero.id
            document.getElementById('modifyName').value = hero.name
            document.getElementById('modifyPageID').value = hero.page_id
            document.getElementById('modifySex').value = hero.sex
            document.getElementById('modifyURL').value = hero.urlslug
            document.getElementById('modifyYear').value = hero.year
        }
    })
    displayHero(superHeroes);
}
// check if page id matches that global variable 
function modifyHero(align, alive, appearance, eye, firstAppearance, hair, ID, name, page_id, sex, url, year) {


    superHeroes.map(hero => {
        if (hero.uniqueID === modifyUserUniqueID) {
            hero.align = align
            hero.alive = alive
            hero.appearances = appearance;
            hero.eye = eye;
            hero.firstAppearance = firstAppearance;
            hero.hair = hair
            hero.id = ID;
            hero.name = name;
            hero.page_id = page_id;
            hero.sex = sex
            hero.urlslug = url;
            hero.year = year;
        }
    })
    displayHero(superHeroes);
    modifyHeroFormModal.close();
    return false;
}

function deleteHero(uniqueID) {
    let selectedIndex = -1;


    superHeroes.forEach((hero, index) => {
        if (hero.uniqueID === (uniqueID)) {
            selectedIndex = index;
            alert(`Are you sure want to delete ${hero.name}`)
        }

    })
    if (selectedIndex >= 0) {
        superHeroes.splice(selectedIndex, 1);
    }

    displayHero(superHeroes);
}

let allUser = document.getElementById("viewUserData");

function displayUsers(usersArray) {
    let userString = `<table> <thead>
     <th>Name</th>
     <th>Email</th>
     <th>Password</th>
     <th>isAdmin</th>
     <th><button id= "addUser" onclick= "addUserViewModal()">Add user</button></th>
     </thead>`


    usersData.map(user => {
        userString += `<tr> 
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.isAdministrator}</td>
        <td><button id= "deleteUser" onclick= "deleteUser(${user.userID})">Remove</button></td>
        </tr>
        `
    })
    userString += `</table><br> ${usersArray.length} users found.`;

    allUser.innerHTML = userString;
    allUser.style.animation = "transitionIn 1s";
}

function deleteUser(userID) {
    let selectedIndexUser = -1;


    usersData.forEach((user, index) => {
        if (user.userID === (userID)) {
            selectedIndexUser = index;
            alert(`Are you sure want to delete ${user.name}`)
        }

    })
    if (selectedIndexUser >= 0) {
        usersData.splice(selectedIndexUser, 1);
    }
    displayUsers(usersData);
}

const addUserModal = document.getElementById("addUserModal");
function addUserViewModal() {

    // console.log(modifyUserPage_ID)
    addUserModal.showModal()
    addUserModal.style.animation = "transitionIn 1s";
}

userID = usersData.length;
function addTheUser(name, email, password, adminity) {
    let newUser = {
        userID: userID,
        name: name,
        email: email,
        password: password,
        isAdministrator: adminity
    }

    usersData.push(newUser);
    userID++;
    displayUsers(usersData);
    addUserModal.close();
}
/*let newHero = {
        uniqueID: uniqueID,
        align: align, alive: alive, appearances: appearance, eye: eye, firstAppearance: firstAppearance,
        hair: hair, id: ID, name: name, page_id: page_id, sex: sex, urlslug: url, year: year
    }
    superHeroes.push(newHero);
    uniqueID++;
    displayHero(superHeroes);
    formModal.close();
    return false;*/