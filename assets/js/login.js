let form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let passwordInput = document.querySelector("#passwordInput").value
    let emailInput = document.querySelector("#emailInput").value
    fetch(`http://localhost:3000/user`)
    .then(res=>res.json())
    .then(data => {
        let currentUserInfo = data.find((user)=>user.email == emailInput)
        if(currentUserInfo){
            if(currentUserInfo.password == passwordInput){
                // localStorage.setItem('currentUser', JSON.stringify(currentUserInfo));
                window.location = './index.html'
            }else{
                console.log('Wrong password');
            }      
        }else{
            console.log("Wrong email");
        }
      })
})