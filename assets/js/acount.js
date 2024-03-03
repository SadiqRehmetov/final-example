
let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let favLi = document.querySelector(".favorit")
let blogLi = document.querySelector(".blog")
let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")
let profilImage = document.querySelector(".profilImage")
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
let userImage =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).image : null;
let shopCount = document.querySelector(".shopCount")
let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
let userId = currentUser.id
let userBasketCount = currentUser.basket.length
let shopAdd=document.querySelector("#add-shop")
let shopImage = document.querySelector("#shopImage")
let newShopImage = document.querySelector("#newShopImage")
let shopName = document.querySelector("#shopName")
let shopPrice = document.querySelector("#shopPrice")
let rightAdd =document.querySelector(".rightAdd")
let courseAdd = document.querySelector("#add-course")
let courseImage = document.querySelector("#courseImage")
let newCourseImage = document.querySelector("#newCourseImage")
let courseCategory = document.querySelector("#courseCategory")
let courseName = document.querySelector("#courseName")
let coursePrice = document.querySelector("#coursePrice")
let courseİnstructorName = document.querySelector("#courseİnstructorName")
let courseİnstructorJob = document.querySelector("#courseİnstructorJob")
let courseDescription = document.querySelector("#courseDescription")
let courseCarts = document.querySelector(".course-carts")
let shopheader = document.querySelector(".shopHeader")
shopCount.innerHTML=`${userBasketCount}`

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.position = "fixed";
        nav.style.transition = "position 0.3s ease"; 
    } else {
        nav.style.position = "static"; 
        nav.style.transition = "position 0.3s ease";
    }
});
let fileInput = document.querySelector(".profileinput");
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


menuİcon.addEventListener("click",()=>{
    responsMenu.style.transform = "translateX(0)";
})
closeMenu.addEventListener("click", ()=>{
    responsMenu.style.transform = "translateX(-500%)";
})




let responsiveAcount = document.querySelector(".my-acount-res")
if(window.innerWidth < 768){
    acount.style.display="none";
        
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
        profilemail.value=user
        profilname.value=userName
        profilsurname.value=userSurname
        profilnumber.value=userNumber
        profilImage.src=userImage
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

logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('currentUser')
    window.location = './login.html'
})



profilImage.addEventListener("click", () => {
    fileInput.click();
});

let shopCarts = document.querySelector(".shop-carts")
function favoriteShop(){
    let userFav = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).fav : null;
    console.log(userFav);
    if(userFav.length){
        userFav.forEach(element=>{
            fetch(`https://north-petalite-relative.glitch.me/shop/${element}`)
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
    shopheader.textContent="My Favorites"
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
      await axios.patch(`https://north-petalite-relative.glitch.me/user/${userData.id}`, { fav: userData.fav });
      console.log('Favori listesi güncellendi:', userData.fav);
    } catch (error) {
      console.error('Favori listesi güncellenirken bir hata oluştu:', error);
    }
  }
  
  
  function loadFavoriteSongs() {
    const userData = getUserSession();
    const { fav } = userData;
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





shopImage.addEventListener("input", (e)=>{
    let file=e.target.files[0]
    if(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload=function(){
            newShopImage.src=reader.result
        }
    }
})
shopAdd.addEventListener("submit",(e)=>{
    e.preventDefault();
    const shopData = {
        image: newShopImage.src,
        name: shopName.value,
        price: shopPrice.value
    };
    axios.post(`https://north-petalite-relative.glitch.me/shop`, shopData)
    .then(res => {
        let userrId =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;; 
        axios.get(`https://north-petalite-relative.glitch.me/user/${userrId}`)
        .then(userRes => {
            const userrData = userRes.data;
            userrData.data.push(shopData); 
            return axios.patch(`https://north-petalite-relative.glitch.me/user/${userrId}`, userrData);
        })
        .then(res => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    })
    .catch(error => {
        console.error('Error adding shop:', error);
    });
});

courseImage.addEventListener("input", (e)=>{
    let file=e.target.files[0]
    if(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload=function(){
            newCourseImage.src=reader.result
        }
    }
})
courseAdd.addEventListener("submit",(e)=>{
    e.preventDefault();
    const courseData = {
        image: newCourseImage.src,
        name: courseName.value,
        price: coursePrice.value,
        category: courseCategory.value,
        instructorName: courseİnstructorName.value,
        instructorsJob: courseİnstructorJob.value,
        description: courseDescription.value
    };
    axios.post(`https://north-petalite-relative.glitch.me/course`, courseData)
    .then(res => {
        let userrId =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;; 
        axios.get(`https://north-petalite-relative.glitch.me/user/${userrId}`)
        .then(userRes => {
            const userrData = userRes.data;
            userrData.data.push(courseData); 
            return axios.patch(`https://north-petalite-relative.glitch.me/user/${userrId}`, userrData);
        })
        .then(res => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    })
    .catch(error => {
        console.error('Error adding shop:', error);
    });
});

  let tCourse = document.querySelector(".tcourse")
if(userJob!="teacher"){
    rightAdd.style.display="none"
    tCourse.style.display="none";
}else{
    rightAdd.style.display="flex"
    tCourse.style.display="flex";
}

let saveProfil = document.querySelector(".saveProfil")
saveProfil.addEventListener("click",()=>{
    axios.patch(`https://north-petalite-relative.glitch.me/user/${userId}`,{
        name: profilname.value,
        surname: profilsurname.value,
        image:profilImage.src,
        email: profilemail.value,
        phone: profilnumber.value
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.name = profilname.value;
            currentUser.email = profilemail.value;
            currentUser.image = profilImage.src;
            currentUser.phone =profilnumber.value;
            currentUser.surname=profilsurname.value;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log("Profile updated successfully!");

})
let usersData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).data : null;
let userrId =localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;; 
console.log("klklkl",usersData);
console.log(userId);
function blogShopData(){
    fetch(`https://north-petalite-relative.glitch.me/user`)
    .then(res=>res.json())
    .then(respons=>{
        respons.map(element=>{
            if(userId == element.id){
                let shdata=element.data
                shdata.map(el=>{
                    if(el.category){
                        courseCarts.innerHTML+=`
                        <div class="cart">
                        <div class="hiddenDiv">
                            <div class="heartDiv">
                                <i class="bi favorite-btn ${isFavorite(el.id) ? 'bi-heart-fill' : 'bi-heart'}" data-element-id="${el.id}" onclick="toggleFavorite(${el.id})"></i>
                            </div>
                            <span class="title-span">Beginner</span>
                            <h3>${el.name}</h3>
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
                            
                            <a href="../course_details.html?id=${el.id}"><button>Enroll Now <i class="bi bi-arrow-right"></i></button></a>
                        </div>
                        <div class="image">
                            <img src="${el.image}" alt="picture">
                            <div class="date">
                                <i class="bi bi-clock"></i>
                                <span>15 weeks</span>
                            </div>
                        </div>
                        <div class="info">
                            <span class="title-span">Beginner</span>
                            <h3>${el.name}</h3>
                            <p class="ratings">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <span>(5.0 / 3 Ratings)</span>
                            </p>
                            <span class="price">$${el.price}</span>
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
                    }else{
                        shopCarts.innerHTML+=`
            <div class="cart">
              <div class="image">
                  <img src="${el.image}" alt="picture">

              </div>
              <div class="info">
                  <h3>${el.name}</h3>
                  <div class="icon">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <span style="opacity:.7;">(4.00)</span>
                  </div>
                  <p>$${el.price}</p>
              </div>
          </div>
            `
                    }
                })
            }
        })
    })
}
blogLi.addEventListener("click",()=>{
    courseCarts.innerHTML=""
    shopCarts.innerHTML=""
    blogShopData()
})
let resblog = document.querySelector(".resBlog")
resblog.addEventListener("click",()=>{
    courseCarts.innerHTML=""
    shopCarts.innerHTML=""
    blogShopData()
})