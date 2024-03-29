/*
* File: app.js
* Author: Németh Angéla
* Copyright: 2023, Németh Angéla
* Group: Szoft 1-2 E
* Date: 2023-03-23
* Github: https://github.com/NemethAngela/
* Licenc: GNU GPL
*/

var gyumolcsok = [];
const host = 'http://localhost:3000/';

const tbody = document.querySelector("#tbody");
const saveButton = document.querySelector("#saveButton");
const nameInput = document.querySelector("#name");
const quantityInput = document.querySelector("#quantity");
const priceInput = document.querySelector("#price");

const editidInput = document.querySelector("#editid");
const editnameInput = document.querySelector("#editname");
const editquantityInput = document.querySelector("#editquantity");
const editpriceInput = document.querySelector("#editprice");

const saveEditButton = document.querySelector("#saveEditButton"); // kötés a html másik, szerkesztés gomb elemhez

function getFruits() {
    let endpoint = "fruits";
    let url = host + endpoint;

    fetch(url)
    .then(response => response.json())
    .then(result => { 
        console.log(result)
        gyumolcsok = result;
        generateTbody();
    });
}

getFruits();

function generateTbody() {
    gyumolcsok.forEach((gyumolcs) => {      //itt vannak a gyümölcsök tulajdonságai
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');

        tdName.textContent = gyumolcs.name;     //ezek tulajdonságok textContet-ben
        tdQuantity.textContent = gyumolcs.quantity;
        tdPrice.textContent = gyumolcs.price;

        tbody.append(tr);
        tr.append(tdName);
        tr.append(tdQuantity);
        tr.append(tdPrice);
        tr.append(generateTdDelete(gyumolcs.id));   //csak az id-at akarom kiszedni, hívjuk
        tr.append(generateTdEdit(gyumolcs));  //hívjuk
    });
}

generateTbody();    //fgv. hívása

function generateTdDelete(id) {                             //törlés lesz,    
    let td = document.createElement('td');                  //generálás
    let button = document.createElement('button');
    button.textContent = "Törlés";                          // tartalmat adunk neki
    button.classList = "btn btn-warning"                    //bootsrtapp-el törtlés gomb állítása
    button.addEventListener('click', () => {
        console.log(id);
        deleteFruit(id);
        // let index = 0;
        // let count = 0;
        // gyumolcsok.forEach((gy) => {
        //     if (gy.id == id) {
        //         index = count;
        //     }
        //     count++;
        // });
        // console.log(index);
        // gyumolcsok.splice(index, 1);
        // tbody.textContent = ""
        // generateTbody();    //újragenerálja a táblát, a tbodyt
    });
    td.append(button);
    return td;
}  

function generateTdEdit(fruit) {                                 
    let td = document.createElement('td');                  
    let button = document.createElement('button');
    button.textContent = "Szerkesztés";                          // tartalmat adunk neki
    button.classList = "btn btn-secondary";                   //bootsrtapp-el törlés gomb állítása
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#editModal");
    button.addEventListener('click', () => {
        console.log("működik");
        console.log(fruit.name);   
        editidInput.value = fruit.id;    
        editnameInput.value = fruit.name;
        editquantityInput.value = fruit.quantity;
        editpriceInput.value = fruit.price;
    });
    td.append(button);
    return td;
}  

function createFruit(fruit) {   //meg kell hívni a függvényt
    let endpoint = "fruits";
    let url = host + endpoint;

    fetch(url, {        //fetchnek meg kell mondani, hogy mi a metódus, a fetch visszaad egy promise-t
        method: "post", 
        body: JSON.stringify(fruit),     //Stringesíti a json.stringify
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    }); 
}

function deleteFruit(id) {  //törlés
    let endpoint = "fruits";
    let url = host + endpoint + "/" + id;
    fetch (url, {
        method: "Delete"
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        tbody.textContent = "";
        generateTbody();
    });
}

saveButton.addEventListener('click', () => {
    console.log('működik');
    let name = nameInput.value;
    let quantity = quantityInput.value;
    let price = priceInput.value;
    let gyumolcs = {
        name: name, 
        quantity: quantity,
        price: price
    };
    createFruit(gyumolcs),
    console.log(gyumolcs);
    // gyumolcsok.push(gyumolcs);        //itt nem kell, mert Rest Apiból veszi
    tbody.textContent = "";
    getFruits();
    //generateTbody();
    clearFieldOnAddModel();
});


function clearFieldOnAddModel() {       //így töröljük az add modal tartalmát
    nameInput.value = "";
    quantityInput.value = "";
    priceInput.value = "";
}

saveEditButton.addEventListener('click', () => {

    let id = editidInput.value;  //olvasható formára hozzuk
    let name = editnameInput.value;
    let quantity = editquantityInput.value;
    let price = editpriceInput.value;

    let fruit = {       //létrehozás
        id: id,     //itt meg kell egyezni az adatbázisban lévő kulcsokkal
        name: name,
        quantity: quantity,
        price: price
    }
    updateFruit(fruit);

    gyumolcsok.forEach(gyumolcs => {    //fv. bejárása
        if (gyumolcs.id == id) {
            gyumolcs.name = name;
            gyumolcs.quantity = quantity;
            gyumolcs.price = price;
        }
    });

    tbody.textContent = "";
    generateTbody();
});

function updateFruit(fruit) {
    let endpoint = "fruits";
    let url = host + endpoint + "/" + fruit.id; //update-nél szükség van id-e
    let headers = {
        "Content-Type": "application/json"
    }
    fetch(url, {
        method: "put",
        body: JSON.stringify(fruit),  //javaScript-ben nem stringesítünk aposztroffal, hanem így
        headers: headers
    })

    .then(res => res.json())        //result lerövidítése
    .then(res => {
        console.log(res)
    });
}