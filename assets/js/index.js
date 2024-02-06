let iframeDiv = document.querySelector(".iframe")
let closeIframe = document.querySelector(".iframe-close")
let playIframe = document.querySelector(".play-iframe")
let nav = document.querySelector("header")
let searchIcon = document.querySelector("#search")
let searchInput = document.querySelector("#searchinput")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let courseCarts = document.querySelector(".course-carts")
let page = 1;
let instructorsCarts = document.querySelector(".instructors-carts")
playIframe.addEventListener("click", ()=>{
    iframeDiv.style.display="flex";
})
closeIframe.addEventListener("click",()=>{
    iframeDiv.style.display="none";
    window.location.reload();
})
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

showData()
function showData(){
    fetch(`http://localhost:3000/course?_page=${page}&_limit=4`)
    .then(res=>res.json())
    .then(respons=>{
        respons.map((element)=>{
            courseCarts.innerHTML+=`
            <div class="cart">
                        <div class="hiddenDiv">
                            <div class="heartDiv">
                                <i class="bi bi-heart"></i>
                            </div>
                            <span class="title-span">${element.category}</span>
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
                            <p class="cart-info">
                                ${element.description}
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
                            <span class="title-span">${element.category}</span>
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
            </div>
            </div>
            `
        })
    })
}