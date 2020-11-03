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
        if(!checkNull(inputBox.value)){
            alert("Please enter the correct URL!")
        }else{
            if(outputFrame.style.display == "none"){
                outputFrame.style.display = "block";
                fetchData();
            }else{
                outputFrame.style.display = "none";
                window.location.reload();
            }            
        }
    });

function fetchData(){
    //var slug ='';

    window.fetch("https://dsc-dut.herokuapp.com/url", {
    method:'POST',
    body: JSON.stringify({"url": inputBox.value}),
    headers:{
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    //.then(response => slug = response.slug)
    .then(response =>outputBox.value = window.location.href + response.slug)
    .catch(error => console.error('Error:', error))
}

function checkNull(str){
    str = str.trim();
    if(str.indexOf(" ")!==-1 || str.length==0) return false;
    else return true;
}

function redirect(){
    var ID = window.location.pathname;
    if (ID.length > 1) {
        window.location.href = "https://dsc-dut.herokuapp.com" + ID;
    }
}

function copy(){
    outputBox.select();
    outputBox.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}
