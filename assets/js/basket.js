let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;

if(user){
  acount.innerHTML = user
  acount.style.display = 'block'
  acount.style.padding="10px"
  acount.style.backgroundColor="#27B889"
  acount.style.color="white"
  acount.style.borderRadius="10px"
  loginAndRegister.style.display="none";
}else{
  setTimeout(()=>{window.location = './login.html'}, 2000)
}