let form = document.querySelector("form")
let userEmail = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;
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
            fetch(`https://north-petalite-relative.glitch.me/user`)
            .then(res=>res.json())
            .then(respons=>{
                respons.map(element=>{
                    if(element.email == emailInput.value){
                        alert("Email artıq mövcuddur.")
                    }else{
                        axios.post(`https://north-petalite-relative.glitch.me/user`,{
            name:nameInput.value,
            surname:lastNameInput.value,
            email:emailInput.value,
            job:selectJob.value,
            phone:number.value,
            password:confirmpassword.value,
            fav:[],
            basket:[],
            data:[]
                    }
                )}
            })
                
            })
        }else{
            document.querySelector(".wrongConfirm").style.display="flex";
        }
    }
    else{
        alert("Wrong information")
    }
})

