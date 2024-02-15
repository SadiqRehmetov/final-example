let nav = document.querySelector("header")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let questionCart = document.querySelector(".questionCart")
let shopCount = document.querySelector(".shopCount")
let listCategoryList = document.querySelectorAll(".list-category")
let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
let userBasketCount = currentUser.basket.length
console.log(userBasketCount);
console.log(userBasketCount);
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

showFaqData()
function showFaqData() {
    fetch(`http://localhost:3000/faqs`)
        .then(res => res.json())
        .then(respons => {
            listCategoryList.forEach(category => {
                category.addEventListener("click", () => {
                    listCategoryList.forEach(item => {
                        if (item !== category) {
                            item.style.color="black"
                        }else{
                            item.style.color="#27B889"
                        }
                    });

                    category.style.color = '#27B889';

                    questionCart.innerHTML = "";
                    respons.forEach(element => {
                        if (element.category === category.textContent) {
                            const questionDiv = document.createElement('div');
                            questionDiv.classList.add('question');
                            questionDiv.innerHTML = `
                                <h4>${element.question}<i class="bi bi-chevron-compact-down"></i></h4>
                                <div class="answer">
                                    <p>${element.answer}</p>
                                </div>
                            `;
                            const questionHeader = questionDiv.querySelector('h4');
                            const answerDiv = questionDiv.querySelector('.answer');

                            questionHeader.addEventListener('click', () => {
                                const openedQuestion = document.querySelector('.question.opened');
                                if (openedQuestion && openedQuestion !== questionDiv) {
                                    openedQuestion.querySelector('.answer').style.maxHeight = null;
                                    openedQuestion.classList.remove('opened');
                                    openedQuestion.querySelector('h4').style.color = 'black';
                                }
                                
                                if (!questionDiv.classList.contains('opened')) {
                                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                                    questionDiv.classList.add('opened');
                                    if (!questionHeader.clicked) {
                                        questionHeader.style.color = '#27B889';
                                        questionHeader.clicked = true;
                                    }
                                } else {
                                    answerDiv.style.maxHeight = null;
                                    questionDiv.classList.remove('opened');
                                    questionHeader.style.color = 'black';
                                    questionHeader.clicked = false;
                                }
                            });

                            questionCart.appendChild(questionDiv);
                        }
                    });

                    const firstQuestion = questionCart.querySelector('.question h4');
                    if (firstQuestion) {
                        firstQuestion.click();
                    }
                });

                if (category.textContent === "General") {
                    category.click();
                }
            });
        });
}

