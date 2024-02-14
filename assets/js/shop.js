let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let shopCount = document.querySelector(".shopCount")
let arr_1 = [];
let arr_2 = [];
let searchIcon = document.querySelector("#search");
let searchInput = document.querySelector("#searchinput");
let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
let userBasketCount = currentUser.basket.length
let shopCarts = document.querySelector(".shop-carts")
let userId = currentUser.id
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
                  <button data-song-id="${element.id}" onclick="toggleBasket(${element.id})">Add basket</button>

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



function isBasketed(elemetId) {
const { basket } = getUserSession();
return basket.includes(elemetId);
}

async function toggleBasket(elemetId) {
const userData = getUserSession();
const { basket } = userData;
const index = basket.indexOf(elemetId);
if (index !== -1) {
    basket.splice(index, 1);
} else {
    basket.push(elemetId);
}
console.log(userData);
console.log(userData.basket);
updateBasketSession(userData);
updateBasketButton(elemetId);

try {
    await axios.patch(`http://localhost:3000/user/${userData.id}`, { basket: userData.basket });
    console.log('Basket listesi güncellendi:', userData.basket);
} catch (error) {
    console.error('Basket listesi güncellenirken bir hata oluştu:', error);
}
}

function loadBasketelement() {
const userData = getUserSession();
const { basket } = userData;
// const basketedelement = element.filter(element => basket.includes(element.id));
// shopData(basketedelement);
}

document.addEventListener('DOMContentLoaded', function() {
  loadBasketelement();
});



function handleBasketClick(elemetId) {
toggleBasket(elemetId);
}

function updateBasketButton(elemetId) {
const basketButton = document.querySelector(`button[data-song-id="${elemetId}"]`);
if (basketButton) {
    const isBasketedValue = isBasketed(elemetId); 
    if (isBasketedValue) {
        basketButton.innerHTML = "Remove from basket"; 
    } else {
        basketButton.innerHTML = "Add to basket"; 
    }
} else {
    console.error('Basket button not found for element ID:', elemetId);
}
}

function getUserSession() {
return JSON.parse(localStorage.getItem('currentUser')) || { id: null, basket: [] };
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
    console.log('Güncəlləndi:', userData.fav);
  } catch (error) {
    console.error('Xəta:', error);
  }
}
function loadFavoriteelement() {
  const userData = getUserSession();
  const { fav } = userData;
  // const favoriteElement = element.filter(element => fav.includes(element.id));
  // shopData(favoriteElement);
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
function updateBasketSession(userData) {
  localStorage.setItem('currentUser', JSON.stringify(userData));
}

shopCount.innerHTML=`${userBasketCount}`
searchInput.addEventListener("input",(e)=>{
  arr_1=arr_2
  arr_1=arr_1.filter((element)=>{
      return element.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
  });
  if(arr_1.length==0){
    shopCarts.innerHTML=`not data`
  }else{
    shopData()
  }
  
})
let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;

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

