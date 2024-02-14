
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

let shopArr_1=[]
let shopArr_2=[]
let userArr_1=[]
let userArr_2=[]
let courseArr_1=[]
let courseArr_2=[]
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
let search = document.querySelector("#search")


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
    shopArr_2=respons;
    tableShop.innerHTML="";
    shopArr_1 = shopArr_1.length || search.value ? shopArr_1 : respons
      shopArr_1.map(element => {
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

search.addEventListener("input",(e)=>{
    shopArr_1=shopArr_2
    shopArr_1=shopArr_1.filter((element)=>{
        return element.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    });
    if(shopArr_1.length==0){
      tableShop.innerHTML=`not data`
    }else{
      shopData()
    }
})

let sort = document.querySelector("#sort");

sort.addEventListener("change", (e)=> {
    if(e.target.value == "asc"){
        shopArr_1 = shopArr_1.sort((a,b)=> a.price - b.price);
    }
    else if(e.target.value == "dsc"){
        shopArr_1 = shopArr_1.sort((a,b)=> b.price - a.price);
    }
    else{
        shopArr_1 = []
    };
    shopData();
})


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
        courseArr_2=respons;
        tablecourse.innerHTML="";
        courseArr_1 = courseArr_1.length || search.value ? courseArr_1 : respons;
        courseArr_1.map(element=>{
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

sort.addEventListener("change", (e)=> {
    if(e.target.value == "asc"){
        courseArr_1 = courseArr_1.sort((a,b)=> a.price - b.price);
    }
    else if(e.target.value == "dsc"){
        courseArr_1 = courseArr_1.sort((a,b)=> b.price - a.price);
    }
    else{
        courseArr_1 = []
    };
    courseData();
})


search.addEventListener("input",(e)=>{
    courseArr_1=courseArr_2
    courseArr_1=courseArr_1.filter((element)=>{
        return element.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    });
    if(courseArr_1.length==0){
      tablecourse.innerHTML=`not data`
    }else{
      courseData()
    }
})



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
        userArr_2=respons;
        tableUser.innerHTML="";
        userArr_1= userArr_1.length || search.value ? userArr_1 : respons;
        userArr_1.map(element=>{
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

search.addEventListener("input",(e)=>{
    userArr_1=userArr_2
    userArr_1=userArr_1.filter((element)=>{
        return element.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    });
    if(userArr_1.length==0){
      tableuser.innerHTML=`not data`
    }else{
      userData()
    }
})

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

tableShop.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        let row = event.target.closest('tr');
        let itemId = row.querySelector('td:first-child').textContent;
        let itemName = row.querySelector('td:nth-child(2)').textContent;
        let itemPrice = row.querySelector('td:nth-child(3)').textContent;

        let nameInput = document.createElement('input');
        nameInput.value = itemName;
        let priceInput = document.createElement('input');
        priceInput.value = itemPrice;

        row.querySelector('td:nth-child(2)').textContent = '';
        row.querySelector('td:nth-child(2)').appendChild(nameInput);
        row.querySelector('td:nth-child(3)').textContent = '';
        row.querySelector('td:nth-child(3)').appendChild(priceInput);
        
        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-check-line confirm-edit"></i><i class="ri-close-line cancel-edit"></i></span>';
    } 
    else if (event.target.classList.contains('delete')) {
        let itemId = event.target.closest('tr').querySelector('td:first-child').textContent;
        if (confirm(`Əminsinizmi ki, ID-si ${itemId} olan məhsulu silmək istəyirsiniz?`)) {
            console.log('Məhsulu sil:', itemId);
            axios.delete(`http://localhost:3000/shop/${itemId}`)
                .then(response => {
                    event.target.closest('tr').remove();
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                });
        }
    }
    else if (event.target.classList.contains('confirm-edit')) {
        let row = event.target.closest('tr');
        let itemId = row.querySelector('td:first-child').textContent;
        let newName = row.querySelector('td:nth-child(2) input').value;
        let newPrice = row.querySelector('td:nth-child(3) input').value;

        row.querySelector('td:nth-child(2)').textContent = newName;
        row.querySelector('td:nth-child(3)').textContent = newPrice;

        axios.patch(`http://localhost:3000/shop/${itemId}`, {
            name: newName,
            price: newPrice
        })
        .then(response => {
            console.log('Məlumat uğurla yeniləndi:', response.data);
        })
        .catch(error => {
            console.error('Xəta baş verdi:', error);
        });

        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>';
    }
    else if (event.target.classList.contains('cancel-edit')) {
        let row = event.target.closest('tr');
        let itemNameInput = row.querySelector('td:nth-child(2) input');
        let itemPriceInput = row.querySelector('td:nth-child(3) input');
        let itemName = itemNameInput.value; 
        let itemPrice = itemPriceInput.value; 
        row.querySelector('td:nth-child(2)').textContent = itemName;
        row.querySelector('td:nth-child(3)').textContent = itemPrice;
        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>';
    }
});

