// ADD NEW ITEM TO END OF LIST
var node = document.createElement("LI");
var textnode = document.createTextNode("Cream");
node.appendChild(textnode);
var list = document.getElementsByTagName("UL");
list[0].appendChild(node);

// ADD NEW ITEM START OF LIST
var node2 = document.createElement("LI");
var textnode2 = document.createTextNode("Kale");
node2.appendChild(textnode2);
list[0].insertBefore(node2, list[0].childNodes[0] || null);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var li = document.getElementsByTagName("LI");
li[0].classList.add("cool");
document.getElementById("one").classList.add("cool");
document.getElementById("two").classList.add("cool");
document.getElementById("three").classList.add("cool");
document.getElementById("four").classList.add("cool");
li[5].classList.add("cool");


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var h2 = document.getElementsByTagName("h2");
h2[0].innerText = "Buy Groceries 6";
