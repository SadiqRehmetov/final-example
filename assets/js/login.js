let form = document.querySelector("form")
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let passwordInput = document.querySelector("#passwordInput").value
    let emailInput = document.querySelector("#emailInput").value
    fetch(`https://north-petalite-relative.glitch.me/user`)
    .then(res=>res.json())
    .then(data => {
        let info = data.find((user)=>user.email == emailInput)
        if(info){
            if(info.password == passwordInput){
                localStorage.setItem('currentUser', JSON.stringify(info));
                window.location = './index.html'
            }else{
                alert('Wrong password');
            }      
        }else{
            alert("Wrong email");
        }
    })
})