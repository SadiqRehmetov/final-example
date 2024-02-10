
let nav = document.querySelector("header")

let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")


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


let arr_1 = [];
let arr_2 = [];
let searchIcon = document.querySelector("#search");
let searchInput = document.querySelector("#searchinput");
let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
let shopCarts = document.querySelector(".shop-carts")
shopData();
function shopData() {
    fetch(`http://localhost:3000/shop`)
    .then(res => res.json())
    .then(respons => {
        arr_2 = respons;
        shopCarts.innerHTML = "";
        arr_1 = arr_1.length || searchInput.value ? arr_1 : respons;
        arr_1.map(element => {
            shopCarts.innerHTML += `
            <div class="cart">
                <div class="image">
                    <img src="${element.image}" alt="picture">
                    <button onclick="addToFavorites(${element.id})">Add basket</button>
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
            `;
        });
    });
}
function addToFavorites(id) {
    axios.get(`http://localhost:3000/shop/${id}`)
    .then(response => {
        let favoriteItem = response.data;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(favoriteItem);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (currentUser) {
            axios.post(`http://localhost:3000/user/fav`, favoriteItem)
            .then(() => {
                alert('Item added to favorites!');
            })
            .catch(error => {
                console.error('Error adding to user favorites:', error);
            });
        } else {
            alert('Please log in to add favorites!');
        }
    })
    .catch(error => {
        console.error('Error adding to favorites:', error);
    });
}





searchInput.addEventListener("input",(e)=>{
    arr_1=arr_2
    arr_1=arr_1.filter((element)=>{
        return element.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    });
    shopData()
})
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
let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;

if(user){
    acount.innerHTML = user
    acount.style.display = 'block'
    loginAndRegister.style.display="none";
}else{
    setTimeout(()=>{window.location = './login.html'}, 2000)
}