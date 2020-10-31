var inputBox = document.getElementById("inUrl");
var outputBox = document.getElementById("outUrl"); 
var outputFrame = document.getElementById("outputFrame");
var btnIn = document.getElementById("btn-in");

console.log("running...");

inputBox.addEventListener("keyup", function(keypress) {
        if (keypress.keyCode === 13) {
            keypress.preventDefault();
            btnIn.click();
        }
    });

btnIn.addEventListener('click',function(){
        if(checkNull(inputBox.value)){
            outputFrame.style.display = "block";
        }else{
            alert("Please enter the correct URL!")
        }
    })

fetch("https://dsc-dut.herokuapp.com/url", {
    method:'POST',
    body: JSON.stringify({"url": inputBox.value}),
    headers:{
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(response =>outputBox.value = window.location.href + response.slug)
.catch(error => console.error('Error:', error))

function checkNull(str){
    str = str.trim();
    if(str.indexOf(" ")!==-1 || str.length==0) return false;
    else return true;
}

