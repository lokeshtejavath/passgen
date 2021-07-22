let pass = ""

let smaller = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '[', '}', ']', '|', ';', ':', '.', '?'];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let passarry = smaller.concat(upper, symbols, numbers);
let array = new Uint32Array(20);
let maparr = new Uint32Array(passarry.length);
let dummyarray = new Uint32Array(20);
window.crypto.getRandomValues(array);
window.crypto.getRandomValues(dummyarray);
for (let i = 0; i < array.length; i++){
    let index = array[i] % passarry.length;
    let seed = Math.random() * array.length;
    if (maparr[index] > 2) {
        while (maparr[index] > 2) {
            
            seed = (Math.random()) * dummyarray[(i + index) % array.length];
            index = seed % passarry.length;
        }
    }
    pass += passarry[index];
}
document.getElementById("password").innerHTML = pass
 