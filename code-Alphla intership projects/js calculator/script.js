let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let String = "";

let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == "="){
            String = eval(String);
            input.value = String;
        }
        else if(e.target.innerHTML == "AC"){
            String = "";
            input.value = String;
        }
        else if (e.target.innerHTML == "Del"){
            String = String.substring(0,String.length-1);
            input.value = String;
        }
        else{
            String+= e.target.innerHTML;
            input.value = String;
        }
    })
})
