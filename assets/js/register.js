let form = document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let nameInput = document.querySelector("#nameInput")
    let lastNameInput = document.querySelector("#lastNameInput")
    let emailInput = document.querySelector("#emailInput")
    let number = document.querySelector("#number")
    let passwordInput = document.querySelector("#passwordInput")
    let confirmpassword =document.querySelector("#confirmpassword")
    let selectJob = document.querySelector("#job")
    if(nameInput.value && lastNameInput.value && emailInput.value && number.value && passwordInput.value&& confirmpassword.value){
        if(passwordInput.value===confirmpassword.value){
            axios.post(`http://localhost:3000/user`,{
            name:nameInput.value,
            surname:lastNameInput.value,
            email:emailInput.value,
            job:selectJob.value,
            phone:number.value,
            password:confirmpassword.value,
            fav:[]
        })
        .then(res=>{
            window.location="../../login.html"
        })
        }else{
            document.querySelector(".wrongConfirm").style.display="flex";
        }
    }
    else{
        alert("Wrong information")
    }
})

