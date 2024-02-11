
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
let userId = currentUser.id
let favArray = currentUser.fav
console.log(favArray);
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
                        <i class="bi favorite-btn ${isFavorite(element.id) ? 'bi-heart-fill' : 'bi-heart'}" data-song-id="${element.id}" onclick="toggleFavorite(${element.id})"></i>
                    </div>
                    <p>$${element.price}</p>
                </div>
            </div>
            `;
        });
    });
}


function isFavorite(elemetId) {
    const { fav } = getUserSession();
    return fav.includes(elemetId);
  
  }
  
  function updateUserSession(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }
  
  async function toggleFavorite(elemetId) {
    const userData = getUserSession();
    const { fav } = userData;
    const index = fav.indexOf(elemetId);
    if (index !== -1) {
      fav.splice(index, 1);
    } else {
      fav.push(elemetId);
    
    }
    console.log(userData);
    console.log(userData.fav);
    updateUserSession(userData); 
    updateFavoriteButton(elemetId);
    
    try {
  
      await axios.patch(`http://localhost:3000/user/${userData.id}`, { fav: userData.fav });
      console.log('Favori listesi güncellendi:', userData.fav);
    } catch (error) {
      console.error('Favori listesi güncellenirken bir hata oluştu:', error);
    }
  }
  
  
  function loadFavoriteSongs() {
    const userData = getUserSession();
    const { fav } = userData;
    const favoriteSongs = songs.filter(element => fav.includes(element.id));
    shopData(favoriteSongs);
  }
  
  function handleFavoriteClick(elemetId) {
    toggleFavorite(elemetId);
  }
  
  function updateFavoriteButton(elemetId) {
    const favoriteButton = document.querySelector(`.favorite-btn[data-song-id="${elemetId}"]`);
    const userData = getUserSession();
    const { fav } = userData;
    const index = fav.indexOf(elemetId);
    if (index !== -1) {
      favoriteButton.classList.remove('bi-heart');
      favoriteButton.classList.add('bi-heart-fill');
    } else {
      favoriteButton.classList.remove('bi-heart-fill');
      favoriteButton.classList.add('bi-heart');
    }
  }
  function getUserSession() {
    return JSON.parse(localStorage.getItem('currentUser')) || { id: null, fav: [] };
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




