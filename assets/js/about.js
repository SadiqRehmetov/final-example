let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let instructorsCarts = document.querySelector(".instructors-carts")
let shopCount = document.querySelector(".shopCount")
let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
let userBasketCount = currentUser.basket.length
shopCount.innerHTML=`${userBasketCount}`
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.position = "fixed";
        nav.style.transition = "position 0.3s ease"; 
    } else {
        nav.style.position = "static"; 
        nav.style.transition = "position 0.3s ease";
    }
});
menuİcon.addEventListener("click",()=>{
    responsMenu.style.transform = "translateX(0)";
})
closeMenu.addEventListener("click", ()=>{
    responsMenu.style.transform = "translateX(-500%)";
})
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;
let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")

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
showInstructorsData()
function showInstructorsData(){
    fetch(`http://localhost:3000/instructors`)
    .then(res=>res.json())
    .then(respons=>{
        respons.map((element)=>{
            instructorsCarts.innerHTML+=`
            <div class="cart">
            <div class="image">
                <a href="#"><img src="${element.image}" alt="picture"></a>
            </div>
            <div class="info">
                <h3>${element.name}</h3>
                <p>${element.job}</p>
                <p>${element.description}</p>
            </div>
            </div>
            `
        })
    })
}