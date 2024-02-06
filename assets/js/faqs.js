let nav = document.querySelector("header")
let searchIcon = document.querySelector("#search")
let searchInput = document.querySelector("#searchinput")
let menuİcon = document.querySelector(".bi-list")
let responsMenu = document.querySelector(".respons-menu")
let closeMenu = document.querySelector(".closemenu")
let questionCart = document.querySelector(".questionCart")
let listCategoryList = document.querySelectorAll(".list-category")
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
showFaqData()
function showFaqData(){
    fetch(`http://localhost:3000/faqs`)
    .then(res=>res.json())
    .then(respons=>{
        listCategoryList.forEach(el=>{
            el.addEventListener("click",()=>{
                console.log(el);
                    respons.map(element=>{
                        if(element.category=="General"){
                            questionCart.innerHTML+=`
                                <div class="question">
                                    <h4>${element.question}<i class="bi bi-chevron-compact-down"></i></h4>
                                    <div class="answer">
                                        <p>${element.answer}</p>
                                    </div>    
                                </div>
                        `
                        }
                    })
                
            })
        })
    })
}
const accordionItems = document.querySelectorAll('.question');
accordionItems.forEach(item => {
    const header = item.querySelector('h4');
    const answer = item.querySelector('.answer');
    header.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(accItem => {
            if (accItem !== item) {
                accItem.classList.remove('active');
                accItem.querySelector('.answer').style.height = '0';
            }
        });
        item.classList.toggle('active');
        if (isActive) {
            answer.style.height = '0';
        } else {
            answer.style.height = answer.scrollHeight + 'px';
        }
    });
});

