/*
* File: app.js
* Author: Németh Angéla
* Copyright: 2023, Németh Angéla
* Group: Szoft 1-2 E
* Date: 2023-02-16
* Github: https://github.com/NemethAngela/
* Licenc: GNU GPL
*/

const gyumolcsok = [    //objektumok meghatározása, kapcsos zárójel közé
    {name: 'szilva', quantity: 35, price: 8},
    {name: 'alma', quantity: 45, price: 8.3},
    {name: 'körte', quantity: 25, price: 9.5},
    {name: 'barack', quantity: 27, price: 12}
];

const tbody = document.querySelector("#tbody");

function generateTbody() {
    gyumolcsok.forEach((gyumolcs) => {
        

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
        tr.append(generateTdDelete());
    });
}

generateTbody();    //fgv. hívása

function generateTdDelete() {       //törlés lesz
    let td = document.createElement('td');   //generálás
    let button = document.createElement('button');
    button.textContent = "Törlés";      // tartalmat adunk neki
    button.classList = "btn btn-warning"    //bootsrtapp-el törtlés gomb állítása
    button.addEventListener('click', () => {});
        console.log("működik");
    td.append(button);
    return td;

}     