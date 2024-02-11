let nav = document.querySelector("header")
let searchIcon = document.querySelector("#search")
let searchInput = document.querySelector("#searchinput")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let favLi = document.querySelector(".favorit")
let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")
let profilname = document.querySelector(".profilname")
let profilemail = document.querySelector(".profilemail")
let profilsurname = document.querySelector(".profilsurname")
let profilnumber = document.querySelector(".profilnumber")
let logoutBtn = document.querySelector('#logout');
let toCourse = document.querySelector(".toCourse")
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;
let userName =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null;
let userSurname =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).surname : null;
let userNumber =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).phone : null;
let userJob =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).job : null;
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


if(userJob ==="teacher"){
    toCourse.style.display="flex";
}
else{
    toCourse.style.display="none";
}


if(user){
    profilemail.innerHTML=user
    profilname.innerHTML=userName
    profilsurname.innerHTML=userSurname
    profilnumber.innerHTML=userNumber
    acount.innerHTML = user
    acount.style.display = 'block'
    loginAndRegister.style.display="none";
}else{
    setTimeout(()=>{window.location = './login.html'}, 2000)
}
logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('currentUser')
    window.location = './login.html'
})
let profilImage = document.querySelector(".profil");
let fileInput = document.querySelector(".profileinput");

profilImage.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            profilImage.src = reader.result;
        };
    }
});

let shopCarts = document.querySelector(".shop-carts")
function favoriteShop(){
    let userFav = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).fav : null;
    console.log(userFav);
    if(userFav.length){
        userFav.forEach(element=>{
            fetch(`http://localhost:3000/shop/${element}`)
            .then(res=>res.json())
            .then(respons=>{
                console.log(respons);
                shopCarts.innerHTML += `
                <div class="cart">
                    <div class="image">
                        <img src="${respons.image}" alt="picture">
                        <button>Add basket</button>
                        
                    </div>
                    <div class="info">
                        <h3>${respons.name}</h3>
                        <div class="icon">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <span style="opacity:.7;">(4.00)</span>
                            <i class="bi favorite-btn ${isFavorite(respons.id) ? 'bi-heart-fill' : 'bi-heart'}" data-song-id="${respons.id}" onclick="toggleFavorite(${respons.id})"></i>
                        </div>
                        <p>$${respons.price}</p>
                    </div>
                </div>
                `;
            })
        })
    }else{
        shopCarts.innerHTML="<p>Not favorite</p>"
    }
}
favLi.addEventListener("click",()=>{
    shopCarts.innerHTML=""
    favoriteShop()
})
function isFavorite(responsId) {
    const { fav } = getUserSession();
    return fav.includes(responsId);
  
  }
  function updateUserSession(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }
  async function toggleFavorite(responsId) {
    const userData = getUserSession();
    const { fav } = userData;
    const index = fav.indexOf(responsId);
    if (index !== -1) {
      fav.splice(index, 1);
    } else {
      fav.push(responsId);
    }
    updateUserSession(userData); 
    updateFavoriteButton(responsId); 
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
  
  function handleFavoriteClick(responsId) {
    toggleFavorite(responsId); 
  }
  function updateFavoriteButton(responsId) {
    const favoriteButton = document.querySelector(`.favorite-btn[data-song-id="${responsId}"]`);
    const userData = getUserSession();
    const { fav } = userData;
    const index = fav.indexOf(responsId);
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