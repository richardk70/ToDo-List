var trashes = Array.from(document.querySelectorAll('.trash'));
var ranks = document.querySelectorAll('.rank');
var items = Array.from(document.querySelectorAll('.item'));

/*
var Item = {
    checked: false,
    description: "",
    createdMonth: 0,
    createdDate: 0,
    createdYear: 1970,
    priority: "green"
}; 
*/

function Item(checked, description, createdMonth, createdDate, createdYear, priority){
    this.checked = checked;
    this.description = description;
    this.createdMonth = createdMonth;
    this.createdDate = createdDate;
    this.createdYear = createdYear;
    this.priority = priority;
}

var first = new Item(true, "test", 4, 10, 2017, "red");
var second = new Item(false, "second one", 3, 17, 2016, "yellow");

console.log(first.description);
console.log(second.description);

document.getElementById('calendar').addEventListener('click', sortDate);
document.getElementById('priority').addEventListener('click', sortPriority);
document.getElementById('alpha').addEventListener('click', sortAlpha);

document.addEventListener("DOMContentLoaded", function(event) { 
 // if (localStorage.length>0){
 //   var fromLocalStorage = JSON.parse(localStorage.getItem("itemlist"));
 //   console.table(fromLocalStorage);
 //   document.getElementById('main').appendChild(fromLocalStorage);
//  }
  scanTrashes();
  scanRanks();
  scanChecks();
});

function scanChecks(){
    // event listeners for all check boxes to save their state
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (checkbox of checkboxes){
        checkbox.addEventListener('click', checkIt);
    }
}

function checkIt(){
    // save the array with the status of the checkbox
    items = Array.from(document.querySelectorAll('.item'));
    for (item of items)
        console.log(item.children[0].checked);
}

function scanTrashes(){
    // event listeners for all trashcans
    trashes = Array.from(document.querySelectorAll('.trash'));
    for (trash of trashes){
        trash.addEventListener('click', removeItem);
    }
}

function scanRanks(){
    // event listeners for all "rank" icons
    const ranks = document.querySelectorAll('.rank');
    for (rank of ranks){
        rank.addEventListener('click', adjustPriority);
    }
}

function adjustPriority(e){
    posX = e.x - this.offsetLeft;
    var width = Math.floor((posX / this.offsetLeft)*100);
    const percent = Math.round(100 * (width-76) / (87-76));
    item.priority = percent;
    if (percent < 40)
        this.style.color = 'green';
    else if (percent < 80)
        this.style.color = 'yellow';
    else
        this.style.color = 'red';
}

function removeItem(){
    // get teh parent element two elements up
    var itemToTrash = this.parentNode;
    parentNode = itemToTrash.parentNode;
    parentNode.removeChild(itemToTrash);
    items.pop();        
    console.log(items);
}

function addItem(e){
    var newItem = document.getElementById('new-item').value;
    if (e.keyCode == 13 && newItem !== "") {
        // 1. create the DIV element of class 'item'
        var newDiv = document.createElement('DIV');
        newDiv.classList.add('item');

        // 2. create the checkbox
        var newCheck = document.createElement('INPUT');
        newCheck.type = "checkbox";
        newDiv.appendChild(newCheck);
        item.checked = false;

        // 3. create a P element with the text from the add field
        var newP = document.createElement('p');
        newP.textContent = newItem;
        newDiv.appendChild(newP);

        // 4. create a SPAN element of class 'created'
        //    get current date and time
        var newStamp = document.createElement('SPAN');
        var d = new Date();
        item.createdMonth = d.getMonth();
        item.createdDate = d.getDate();
        item.createdYear = d.getFullYear();
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"];
        var letterMonth = months[item.createdMonth];
        newStamp.textContent = letterMonth + ' ' + item.createdDate + ', ' + item.createdYear;
        newStamp.className = 'created';
        newDiv.appendChild(newStamp);

        // 5. create a SPAN element of class 'rank'
        var newRank = document.createElement('SPAN');
        newRank.className = 'rank';
        newRank.innerHTML = "<i class='fa fa-signal' aria-hidden='true'></i>";
        newDiv.appendChild(newRank);

        // 6. create a SPAN element of class 'trash' w/ new ID
        var newTrash = document.createElement('SPAN');
        newTrash.className = 'trash';
        newTrash.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";
        newDiv.appendChild(newTrash);

        // 7. insert the whole DIV 'newDiv' BEFORE the 'new item' field
        var beforeMe = document.querySelector('.new-one');
        document.getElementById('main').insertBefore(newDiv, beforeMe);

        // add the new item newDiv to the array of items and save it to LocalStorage
        items.push(newDiv);
        saveItems();

        // wipe out the new item field
        document.getElementById('new-item').value = "";

        // activate the trash can and priority icons
        scanTrashes();
        scanRanks();
    }
}

// save items to LocalStorage
function saveItems(){
    localStorage.removeItem("itemlist");
    var intoLS = localStorage.setItem("itemlist", JSON.stringify(items));
    // this is not working yet
}

function sortDate(){
    var dates = document.querySelectorAll('.created');
    for (var i=0; i< dates.length; i++){
        console.log(dates[i].textContent);
    } 
    // get the date field of each item
    // sort them

}

function sortPriority(){
    console.log(items);
}

function sortAlpha(){
    console.log(items);
}
