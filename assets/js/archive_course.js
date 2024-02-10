let nav = document.querySelector("header")
let searchIcon = document.querySelector("#search")
let searchInput = document.querySelector("#searchinput")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let courseCarts = document.querySelector(".course-carts")
let searcInput = document.querySelector(".search")
let arr_1=[]
let arr_2=[]
let sort = document.querySelector("#sort")
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.position = "fixed";
        nav.style.transition = "position 0.3s ease"; 
    } else {
        nav.style.position = "static"; 
        nav.style.transition = "position 0.3s ease";
    }
});
searchIcon.addEventListener("click", () => {
    searchInput.classList.toggle("search");
    searchInput.classList.toggle("searchInput");
    if(menuİcon.style.display=="none"){
        menuİcon.style.display="flex";
    }
    else{
        menuİcon.style.display="none";
        
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
    loginAndRegister.style.display="none";
}else{
    setTimeout(()=>{window.location = './login.html'}, 2000)
}

showCourseData()
function showCourseData(){
    fetch(`http://localhost:3000/course`)
    .then(res=>res.json())
    .then(respons=>{
        arr_2=respons;
        courseCarts.innerHTML="";
        arr_1=arr_1.length || searcInput.value ? arr_1: respons;
        arr_1.map((element)=>{
            courseCarts.innerHTML+=`

            <div class="cart">
                        <div class="hiddenDiv">
                            <div class="heartDiv">
                                <i class="bi bi-heart"></i>
                            </div>
                            <span class="title-span">Beginner</span>
                            <h3>Starting SEO as your Home Based Business</h3>
                            <p class="ratings">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <span>(5.0 / 3 Ratings)</span>
                            </p>
                            <span class="price">$30</span>
                            <p class="cart-info">
                                Lorem ipsum dolor sit amet consectur adipiscing elit, sed do eiusmod tempor
                            </p>
                            <div class="icons">
                                <p>
                                    <i class="bi bi-journal-richtext"></i>
                                    <span>11 Lesson</span>
                                </p>
                                <p>
                                    <i class="bi bi-person"></i>
                                    <span>229 Students</span>
                                </p>
                            </div>
                        </div>
                        <div class="image">
                            <img src="${element.image}" alt="picture">
                            <div class="date">
                                <i class="bi bi-clock"></i>
                                <span>15 weeks</span>
                            </div>
                        </div>
                        <div class="info">
                            <span class="title-span">Beginner</span>
                            <h3>${element.name}</h3>
                            <p class="ratings">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <span>(5.0 / 3 Ratings)</span>
                            </p>
                            <span class="price">$${element.price}</span>
                            <div class="icons">
                                <p>
                                    <i class="bi bi-journal-richtext"></i>
                                    <span>11 Lesson</span>
                                </p>
                                <p>
                                    <i class="bi bi-person"></i>
                                    <span>229 Students</span>
                                </p>
                            </div>
                            
                        </div>
                    </div>

            `
        })
    })
}

searcInput.addEventListener("input", (e) => {
    arr_1 = arr_2;
    arr_1 = arr_1.filter((element) => {
      return element.name.toLowerCase().includes(e.target.value.toLowerCase());
      
    });
    showCourseData();
});

sort.addEventListener("change", (e) => {
    if (e.target.value === "exp") {
        arr_1 = arr_1.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "cheap") {
        arr_1 = arr_1.sort((a, b) => b.price - a.price);
    } else {
        arr_1 = arr_2.slice(); // Orijinal array yenidən yüklənir
    }
    showCourseData();
});


