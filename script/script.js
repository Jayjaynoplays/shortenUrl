var inputBox = document.getElementById("inUrl");
var outputBox = document.getElementById("outUrl"); 
var outputFrame = document.getElementById("outputFrame");
var btnIn = document.getElementById("btn-in");

inputBox.addEventListener("keyup", function(keypress) {
        if (keypress.keyCode === 13) {
            keypress.preventDefault();
            btnIn.click();
        }
    });

btnIn.addEventListener('click',function(){
        if(!checkInput(inputBox.value)){
            alert("Please enter the correct URL!")
        }else{
            outputBox.value="Gimme a sec..."
            if (!httpCheck(inputBox.value)){
                inputBox.value = "https://" + inputBox.value;
            }
            fetchData(inputBox.value);           
        }
    });

//---------------------------------------------------------------//

function fetchData(str){
    window.fetch("https://dsc-dut.herokuapp.com/url", {
        method:'POST',
        body: JSON.stringify({"url": str}),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response =>outputBox.value = window.location.href + response.slug)
    .catch(error => console.error('Error:', error))
}

function checkNull(str){
    str = str.trim();
    if(str.indexOf(" ")!==-1 || str.length==0) return false;
    else return true;
}

function urlCheck(str){
    var expression =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(expression);
    return regex.test(str);
}

function httpCheck(str){
    var regex = new RegExp("^(http|https)://", "i");
    return regex.test(str);
}

function redirect(){
    var ID = window.location.pathname;
    if (ID.length > 1) {
        window.location.href = "https://dsc-dut.herokuapp.com" + ID;
    }
}

function checkInput(str){
    if(checkNull(str)){
        if(urlCheck(str)){
            return true;
        }else{
            str = "https://" + str;
            if(urlCheck(str)) return true;
            else return false;
        }    
    }else return false;
}

function copy(){
    outputBox.select();
    outputBox.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}