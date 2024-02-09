let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let instructorsCarts = document.querySelector(".instructors-carts")

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