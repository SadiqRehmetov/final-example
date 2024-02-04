let iframeDiv = document.querySelector(".iframe")
let closeIframe = document.querySelector(".iframe-close")
let playIframe = document.querySelector(".play-iframe")
let nav = document.querySelector("header")
let searchIcon = document.querySelector("#search")
let searchInput = document.querySelector("#searchinput")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
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

