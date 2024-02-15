let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let headerInfo =document.querySelector(".header-info")
let courseId = new URLSearchParams(window.location.search).get("id")
console.log(courseId);
fetch(`http://localhost:3000/course/${courseId}`)
.then(res=>res.json())
.then(respons=>{
    console.log(respons);
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

let overview =document.querySelector(".overview")
let review =document.querySelector(".review")
let curriculum =document.querySelector(".curriculum")
let innstructor =document.querySelector(".instructor")
let stronng =document.querySelectorAll(".strong")

let startedSection = document.querySelector(".in-started")
// detailsCourseData
// function detailsCourseData(){
    fetch(`http://localhost:3000/course/${courseId}`)
    .then(res=>res.json())
    .then(respons=>{
        console.log(respons);
        startedSection.innerHTML+=`<h2>${respons.name}</h2>
            <p><a href="./index.html">Home</a> > Course > ${respons.name}</p>`
        overview.innerHTML=`
        <div class="overview">
        <h3>Course Description</h3>
        <p>${respons.description}</p>
        <h3>What You’ll Learn From This Course</h3>
        <ul>
            <li>Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor</li>
            <li>Tristique nulla aliquet enim tortor at auctor urna. Sit amet aliquam id diam maer</li>
            <li>Nam libero justo laoreet sit amet. Lacus sed viverra tellus in hac</li>
            <li>Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis</li>
        </ul>
        <h3>Certification</h3>
        <p>${respons.certification}</p>
        </div>
        `
        curriculum.innerHTML=`
        <div class="curriculum">
        <h3>Introduction</h3>
        <ul>
            <li>It's Not an Income Problem, it's a Thinking Problem</li>
            <li>How Do You See Money?</li>
            <li>How to be Aware of Additional Income Opportunities</li>
            <li>Principles for Financial Security</li>
        </ul>
        </div>
        `
        innstructor.innerHTML=`
        <div class="instructor">
        <div class="image">
            <img src="${respons.instructorImage}" alt="picture">
        </div>
        <div class="infos">
            <h4>${respons.instructorName}</h4>
            <p>${respons.instructorsJob}</p>
            <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim minim veniam quis nostrud exercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate.</p>
        </div>
        </div>

        `
        review.innerHTML=`
        
        <div class="review" >
        <div class="reyt">
            <div class="lef">
                <span style="color: #EE4A62; font-size: 40px;">5</span>
                <p>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </p>
                <p>2 ratings</p>
            </div>
            <div class="righ">
                <div class="reytCount">
                    <p>5</p>
                    <i class="bi bi-star-fill"></i>
                    <div style="background-color: #FFB608;"></div>
                    <p>2</p>
                </div>
                <div class="reytCount">
                    <p>4</p>
                    <i class="bi bi-star-fill"></i>
                    <div></div>
                    <p>0</p>
                </div>
                <div class="reytCount">
                    <p>3</p>
                    <i class="bi bi-star-fill"></i>
                    <div></div>
                    <p>0</p>
                </div>
                <div class="reytCount">
                    <p>2</p>
                    <i class="bi bi-star-fill"></i>
                    <div></div>
                    <p>0</p>
                </div>
                <div class="reytCount">
                    <p>1</p>
                    <i class="bi bi-star-fill"></i>
                    <div></div>
                    <p>0</p>
                </div>
            </div>
        </div>
        <h2>Review</h2>
        <div class="review-info">
            <div class="lefft">
                <img src="./assets/image/team-03.webp" alt="">
            </div>
            <div class="riggh">
                <p>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </p>
                <h3>Hilary Swank</h3>
                <p style="opacity: .9;">Excellent Course</p>
                <p style="padding-top: 10px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div class="review-info">
            <div class="lefft">
                <img src="./assets/image/team-02.webp" alt="">
            </div>
            <div class="riggh">
                <p>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </p>
                <h3>Hilary Swank</h3>
                <p style="opacity: .9;">Excellent Course</p>
                <p style="padding-top: 10px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        </div>

        `
            overview.style.display="none"
            review.style.display="flex"
            innstructor.style.display="none"
            curriculum.style.display="none"
})
// }


stronng.forEach(e=>{
    e.addEventListener("click",()=>{
        stronng.forEach(element=>{
            element.style.color=""
        })
        e.style.color="#27B889"
        if(e.textContent==="Overview"){
            overview.style.display="flex"
            review.style.display="none"
            innstructor.style.display="none"
            curriculum.style.display="none"
        }else if(e.textContent==="Curriculum"){
            curriculum.style.display="flex"
            overview.style.display="none"
            review.style.display="none"
            innstructor.style.display="none"
        }else if(e.textContent==="Instructor"){
            innstructor.style.display="flex"
            curriculum.style.display="none"
            overview.style.display="none"
            review.style.display="none"
        }else{
            review.style.display="flex"
            innstructor.style.display="none"
            curriculum.style.display="none"
            overview.style.display="none"
        }
    })
})



