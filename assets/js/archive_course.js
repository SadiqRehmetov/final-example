let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let courseCarts = document.querySelector(".course-carts")
let searcInput = document.querySelector(".search")
let shopCount = document.querySelector(".shopCount")
let userBasket = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).basket : null;
let userBasketCount = userBasket.length
shopCount.innerHTML=`${userBasketCount}`
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
                                <i class="bi favorite-btn ${isFavorite(element.id) ? 'bi-heart-fill' : 'bi-heart'}" data-element-id="${element.id}" onclick="toggleFavorite(${element.id})"></i>
                            </div>
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
                            
                            <a href="../course_details.html?id=${element.id}"><button>Enroll Now <i class="bi bi-arrow-right"></i></button></a>
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
    updateUserSession(userData); 
    if (index === -1) { 
      updateFavoriteButton(elemetId);
    }
    
    try {
      if (index !== -1) {
        await axios.patch(`http://localhost:3000/user/${userData.id}`, { fav: userData.fav });
        console.log('Favori listesi güncellendi:', userData.fav);
      } else {
        console.log('Favori listesi güncellenir:', userData.fav);
      }
    } catch (error) {
      console.error('Favori listesi güncellenirken bir hata oluştu:', error);
    }
}


  
  
  function loadFavoriteSongs() {
    const userData = getUserSession();
    const { fav } = userData;
    const favoriteSongs = songs.filter(element => fav.includes(element.id));
    showCourseData(favoriteSongs);
  }
  
  function handleFavoriteClick(elemetId) {
  }
  
  function updateFavoriteButton(elemetId) {
    const favoriteButton = document.querySelector(`.favorite-btn[data-element-id="${elemetId}"]`);
    const userData = getUserSession();
    const { fav } = userData;
    const index = fav.indexOf(elemetId);
    // if (index !== -1) {
    //   favoriteButton.classList.remove('bi-heart');
    //   favoriteButton.classList.add('bi-heart-fill');
    // } else {
    //   favoriteButton.classList.remove('bi-heart-fill');
    //   favoriteButton.classList.add('bi-heart');
    // }
  }
  function getUserSession() {
    return JSON.parse(localStorage.getItem('currentUser')) || { id: null, fav: [] };
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const userData = getUserSession();
    const { fav } = userData;
    if (fav && fav.length > 0) {
        fav.forEach(elementId => {
            updateFavoriteButton(elementId);
        });
    }
})




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
        arr_1 = arr_2.slice();
    }
    showCourseData();
})
