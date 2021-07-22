function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typer(pass) {
    document.getElementById("password").innerHTML = "";
    
    
    for (let i = 0; i < pass.length&&document.getElementById("password").innerHTML.length<=pass.length; i++){
        let audio = new Audio("audio/typing.mp3");
        audio.play();
        document.getElementById("password").innerHTML += pass.charAt(i);
        await sleep(100);
        console.log(document.getElementById("password").value);
        audio.pause();
        delete audio;
    }
    
}
function passgen() {
    document.getElementById("clip").style.visibility = "hidden";
    let len = document.getElementById("leng").value;
    if (len > 25) {
        len = 25;
        document.getElementById("leng").value = 25;
    }
    if (len < 8) {
        len = 8;
        document.getElementById("leng").value = 8;
    }
    let pass = "";
    let smaller = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '[', '}', ']', '|', ';', ':', '.', '?'];
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let passarry=[].concat(smaller);
    let up = document.getElementById("uppercase").checked;
    let symbol = document.getElementById("symbols").checked;
    let num = document.getElementById("numbers").checked;
    let start = document.getElementById("start_small").checked;
    let end= document.getElementById("end_small").checked;
    if (up)
        passarry = passarry.concat(upper);
    if (symbol)
        passarry = passarry.concat(symbols);
    if (num)
        passarry = passarry.concat(numbers);
    let array = new Uint32Array(len);
    let maparr = new Uint32Array(passarry.length);
    let dummyarray = new Uint32Array(len);
    window.crypto.getRandomValues(array);
    window.crypto.getRandomValues(dummyarray);
    for (let i = 0; i < array.length; i++) {
        if (i == 0 && start) {
            pass += smaller[array[i] % smaller.length];
            continue;
        }
        if (i == array.length - 1 && end) {
            pass += smaller[array[i] % smaller.length];
            continue;
        }
        let index = array[i] % passarry.length;
        let seed = Math.random() * array.length;
        if (maparr[index] > 2) {
            while (maparr[index] > 2) {
                
                seed = (Math.random()) * dummyarray[(i + index) % array.length];
                index = seed % passarry.length;
                
            }
            console.log(seed);
        }
        pass += passarry[index];

        
    }
    typer(pass);
    

}
function animate() {
    passgen();
    document.getElementById("clip").style.visibility = "visible";
};

function copytoclipboard() {
    let text = document.getElementById("password");
    const cb = navigator.clipboard;
    cb.writeText(text.innerText);
    alert("Password copied to clipboard");
    
}


let but = document.getElementById("generate");
but.addEventListener("click", animate);
