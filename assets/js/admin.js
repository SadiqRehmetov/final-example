const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = '../index.html'; 
}


let menu = document.querySelector('.menu')
let sidebar = document.querySelector('.sidebar')
let mainContent = document.querySelector('.main--content')

menu.onclick = function() {
    sidebar.classList.toggle('active')
    mainContent.classList.toggle('active')
}

let arr_1=[]
let arr_2=[]
let tableShop = document.querySelector(".tbodyShop")
let tablecourse = document.querySelector(".tbodyCourse")
let courseTable=document.querySelector(".courseTable")
let shopTable=document.querySelector(".shopTable")
let header=document.querySelector(".section--title")
let mainContainer=document.querySelector(".table")
let user = document.querySelector(".user")
let userTable = document.querySelector(".userTable")
let tableUser = document.querySelector(".tbodyUser")
let all = document.querySelector(".all")
let menuItems = document.querySelectorAll('.sidebar ul.sidebar--items li a');



menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(item => {
            item.style.backgroundColor = '';
            item.style.color ='black'
            user.style.backgroundColor='white'
        });
        
        this.style.backgroundColor = '#70d7a5';
        this.style.color = 'white'
    });
});



function shopData() {
  fetch(`http://localhost:3000/shop`)
  .then(res => res.json())
  .then(respons => {
    
    tableShop.innerHTML=""
      respons.map(element => {
          tableShop.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>$${element.price}</td>
                <td><span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span></td>
            </tr>
          `;
      });
  });
}

let shop = document.querySelector(".shop");
window.onload=all.click(userData(),shopData(),courseData(),header.textContent="All")
shop.addEventListener("click",(e)=>{
    e.preventDefault()
    courseTable.style.display="none"
    userTable.style.display="none"
    shopTable.style.display=""
    header.innerHTML=e.target.textContent
    shopData()
})


function courseData(){
    fetch(`http://localhost:3000/course`)
    .then(res=>res.json())
    .then(respons=>{
        tablecourse.innerHTML="";
        respons.map(element=>{
            tablecourse.innerHTML+=`
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.category}</td>
                    <td>${element.price}</td>
                    <td>${element.instructorName}</td>
                    <td>${element.instructorsJob}</td>
                    <td><span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span></td>
                 </tr>
            `
        })
    })
}
let course=document.querySelector(".coursse")
course.addEventListener("click",(e)=>{
    e.preventDefault()
    header.innerHTML=e.target.textContent
    shopTable.style.display="none"
    userTable.style.display="none"
    courseTable.style.display=""
    courseData()
})


function userData(){
    fetch(`http://localhost:3000/user`)
    .then(res=>res.json())
    .then(respons=>{
        tableUser.innerHTML="";
        respons.map(element=>{
            tableUser.innerHTML+=`
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.surname}</td>
                    <td>${element.email}</td>
                    <td>${element.job}</td>
                    <td>${element.phone}</td>
                    <td><span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span></td>
                 </tr>
            `
        })
    })
}

user.addEventListener("click",(e)=>{
    e.preventDefault()
    header.innerHTML=e.target.textContent
    shopTable.style.display="none"
    courseTable.style.display="none"
    userTable.style.display=''
    userData()
})



all.addEventListener("click",(e)=>{
    shopTable.style.display=''
    courseTable.style.display=''
    userTable.style.display=''
    header.innerHTML=e.target.textContent
    userData()
    shopData()
    courseData()
})