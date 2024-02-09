let nav = document.querySelector("header")
let searchIcon = document.querySelector("#search")
let searchInput = document.querySelector("#searchinput")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let shopCarts = document.querySelector(".shop-carts")
let arr_1=[];
let arr_2=[]
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
    if(window.innerWidth < 1200){
        if(menuİcon.style.display=="none"){
            menuİcon.style.display="flex";
        }
        else{
            menuİcon.style.display="none";
        }
    }
});
menuİcon.addEventListener("click",()=>{
    responsMenu.style.transform = "translateX(0)";
})
closeMenu.addEventListener("click", ()=>{
    responsMenu.style.transform = "translateX(-500%)";
})


shopData()
function shopData(){
    fetch(`http://localhost:3000/shop`)
    .then(res=>res.json())
    .then(respons=>{
        arr_2=respons;
        shopCarts.innerHTML="";
        arr_1=arr_1.length || searchInput.value ? arr_1 : respons;
        arr_1.map(element=>{
            shopCarts.innerHTML+=`
            <div class="cart">
                        <div class="image">
                            <img src="${element.image}" alt="">
                            <button>Add basket</button>
                        </div>
                        <div class="info">
                            <h3>${element.name}</h3>
                            <div class="icon">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <span style="opacity:.7;">(4.00)</span>
                            </div>
                            <p>$${element.price}</p>
                        </div>
                    </div>
            `
        })
    })
}
searchInput.addEventListener("input",(e)=>{
    arr_1=arr_2
    arr_1=arr_1.filter((element)=>{
        return element.name.toLowerCase().startsWith(e.target.value.trim().toLowerCase())
    });
    shopData()
})