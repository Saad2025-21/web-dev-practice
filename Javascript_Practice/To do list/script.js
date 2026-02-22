const inputbox = document.getElementById("task");
const list = document.getElementById("list");

function Addtask() {
    if (inputbox.value === '') {
        alert('you have to wite');
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
       li.appendChild(span);
    }
    inputbox.value = "";
    savedata();
}

list.addEventListener("click",function(e){
if( e.target.tagName ==="LI"){
    e.target.classList.toggle("checked");
    savedata();

}
else if(e.target.tagName === "SPAN")
{
    e.target.parentElement.remove();
    savedata();
}

},false);
function savedata(){
    localStorage.setItem("data",list.innerHTML);
}
function showData(){
    list.innerHTML=localStorage.getItem("data")
}
showData()