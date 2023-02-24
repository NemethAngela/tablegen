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
    {id: 1, name: 'szilva', quantity: 35, price: 8},
    {id: 2, name: 'alma', quantity: 45, price: 8.3},
    {id: 3, name: 'körte', quantity: 25, price: 9.5},
    {id: 4, name: 'barack', quantity: 27, price: 12}
];

const tbody = document.querySelector("#tbody");

function generateTbody() {
    gyumolcsok.forEach((gyumolcs) => {      //itt vannak a gyümölcsök tulajdonságai
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');

        tdName.textContent = gyumolcs.name;     //ezek tulajdonságok textContent-ben
        tdQuantity.textContent = gyumolcs.quantity;
        tdPrice.textContent = gyumolcs.price;

        tbody.append(tr);
        tr.append(tdName);
        tr.append(tdQuantity);
        tr.append(tdPrice);
        tr.append(generateTdDelete(gyumolcs.id));   //csak az id-at akarom kiszedni
    });
}

generateTbody();    //fgv. hívása

function generateTdDelete(gyumolcsid) {       //törlés lesz,    
    let td = document.createElement('td');   //generálás
    let button = document.createElement('button');
    button.textContent = "Törlés";      // tartalmat adunk neki
    button.classList = "btn btn-warning";    //bootsrtapp-el törtlés gomb állítása
    button.addEventListener('click', () => {
        console.log(gyumolcsid);
        let index = 0;
        let count = 0;
        gyumolcsok.forEach((gy) => {
            if (gy.id == gyumolcsid) {
                index = count;
            }
            count++;
        });
        console.log(index);
        gyumolcsok.splice(index, 1);
        tbody.textContent = "";
        generateTbody();    //újragenerálja a táblát, a tbodyt
    });
    td.append(button);
    return td;

}     