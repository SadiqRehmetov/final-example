let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let courseId = new URLSearchParams(window.location.search).get("id")
console.log(courseId);
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.position = "fixed";
        nav.style.top="0"
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

let responsiveAcount = document.querySelector(".my-acount-res")
if(window.innerWidth < 768){
    acount.style.display="none"
    if(user){
        acount.style.display="none"
        responsiveAcount.innerHTML = user
        responsiveAcount.style.display = 'block'
        responsiveAcount.style.padding="10px"
        responsiveAcount.style.backgroundColor="#27B889"
        responsiveAcount.style.color="white"
        responsiveAcount.style.borderRadius="10px"
        loginAndRegister.style.display="none";
    }else{
        setTimeout(()=>{window.location = './login.html'}, 2000)
    }
}else{
    if(user){
        acount.innerHTML = user
        acount.style.display = 'block'
        acount.style.padding="10px"
        acount.style.backgroundColor="#27B889"
        acount.style.color="white"
        acount.style.borderRadius="10px"
        responsiveAcount.innerHTML = user
        responsiveAcount.style.display = 'block'
        responsiveAcount.style.padding="10px"
        responsiveAcount.style.backgroundColor="#27B889"
        responsiveAcount.style.color="white"
        responsiveAcount.style.borderRadius="10px"
        loginAndRegister.style.display="none";
    }else{
        setTimeout(()=>{window.location = './login.html'}, 2000)
    }
}

let overview =document.querySelector(".overview")
let review =document.querySelector(".review")
let curriculum =document.querySelector(".curriculum")
let innstructor =document.querySelector(".instructor")
let stronng =document.querySelectorAll(".strong")
stronng.forEach(e=>{
    e.addEventListener("click",()=>{
        stronng.forEach(element=>{
            element.style.color=""
        })
        e.style.color="#27B889"
        if(e.textContent==="Overwiev"){
            overview.style.display="flex"
            review.style.display="none"
            innstructor.style.display="none"
            curriculum.style.display="none"
        }else if(e.textContent==="Curriculum"){
            curriculum.style.display="flex"
            overview.style.display="none"
            review.style.display="none"
            innstructor.style.display="none"
        }else if(e.textContent==="Instructor"){
            innstructor.style.display="flex"
            curriculum.style.display="none"
            overview.style.display="none"
            review.style.display="none"
        }else{
            review.style.display="flex"
            innstructor.style.display="none"
            curriculum.style.display="none"
            overview.style.display="none"
        }
    })
})
let startedSection = document.querySelector(".in-started")
fetch(`http://localhost:3000/course/${courseId}`)
.then(res=>res.json())
.then(respons=>{
    startedSection.innerHTML+=`<h2>${respons.name}</h2>
    <p><a href="./index.html">Home</a> > Course > ${respons.name}</p>`
})
