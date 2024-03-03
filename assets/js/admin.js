
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
let sort = document.querySelector("#sort");
let shop = document.querySelector(".shop");
let course=document.querySelector(".coursse")


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
  fetch(`https://north-petalite-relative.glitch.me/shop`)
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



sort.addEventListener("change", (e) => {
    if (e.target.value == "asc") {
        shopArr_1 = shopArr_1.sort((a, b) => a.price - b.price);
        courseArr_1 = courseArr_1.sort((a, b) => a.price - b.price);
    } else if (e.target.value == "dsc") {
        shopArr_1 = shopArr_1.sort((a, b) => b.price - a.price);
        courseArr_1 = courseArr_1.sort((a, b) => b.price - a.price);
    } else {
        shopArr_1 = shopArr_2;
        courseArr_1 = courseArr_2;
    }
    shopData();
    courseData();
});




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
    fetch(`https://north-petalite-relative.glitch.me/course`)
    .then(res=>res.json())
    .then(respons=>{
        courseArr_2=respons;
        tablecourse.innerHTML="";
        courseArr_1 = courseArr_1.length || search.value ? courseArr_1 : respons;
        courseArr_1.map(element=>{
            tablecourse.innerHTML+=`
                <tr>
                    <td>${element.id}</td>
                    <td><img class="adminimg" src="${element.image}"></td>
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




course.addEventListener("click",(e)=>{
    e.preventDefault()
    header.innerHTML=e.target.textContent
    shopTable.style.display="none"
    userTable.style.display="none"
    courseTable.style.display=""
    courseData()
})


function userData(){
    fetch(`https://north-petalite-relative.glitch.me/user`)
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




tablecourse.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        let row = event.target.closest('tr'); 
        let itemId = row.querySelector('td:nth-child(1)').textContent; 
        let image = row.querySelector('td:nth-child(2) img').src; 
        let name = row.querySelector('td:nth-child(3)').textContent; 
        let category = row.querySelector('td:nth-child(4)').textContent; 
        let price = row.querySelector('td:nth-child(5)').textContent; 
        let instructorName = row.querySelector('td:nth-child(6)').textContent; 
        let instructorsJob = row.querySelector('td:nth-child(7)').textContent; 

        let imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*'; 
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    row.querySelector('td:nth-child(2) img').src = e.target.result;
                }
                reader.readAsDataURL(this.files[0]);
            }
        });

        let nameInput = document.createElement('input');
        nameInput.value = name;
        let categoryInput = document.createElement('input');
        categoryInput.value = category;
        let priceInput = document.createElement('input');
        priceInput.value = price;
        let instructorNameInput = document.createElement('input');
        instructorNameInput.value = instructorName;
        let instructorsJobInput = document.createElement('input');
        instructorsJobInput.value = instructorsJob;

        row.querySelector('td:nth-child(2)').textContent = '';
        row.querySelector('td:nth-child(2)').appendChild(imageInput);
        row.querySelector('td:nth-child(3)').textContent = '';
        row.querySelector('td:nth-child(3)').appendChild(nameInput);
        row.querySelector('td:nth-child(4)').textContent = '';
        row.querySelector('td:nth-child(4)').appendChild(categoryInput);
        row.querySelector('td:nth-child(5)').textContent = '';
        row.querySelector('td:nth-child(5)').appendChild(priceInput);
        row.querySelector('td:nth-child(6)').textContent = '';
        row.querySelector('td:nth-child(6)').appendChild(instructorNameInput);
        row.querySelector('td:nth-child(7)').textContent = '';
        row.querySelector('td:nth-child(7)').appendChild(instructorsJobInput);
        
        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-check-line confirm-edit"></i><i class="ri-close-line cancel-edit"></i></span>';
    } 
    else if (event.target.classList.contains('delete')) {
        let row = event.target.closest('tr'); 
        let itemId = row.querySelector('td:nth-child(1)').textContent; 
        if (confirm(`Are you sure you want to delete the item with ID ${itemId}?`)) { 
            console.log('Delete item:', itemId);
            axios.delete(`https://north-petalite-relative.glitch.me/course/${itemId}`)
                .then(response => {
                    event.target.closest('tr').remove();
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                });
            row.remove();
        }
    }
    else if (event.target.classList.contains('confirm-edit')) {
        let row = event.target.closest('tr'); 
        let itemId = row.querySelector('td:nth-child(1)').textContent; 
        let newImage = row.querySelector('td:nth-child(2) input').files[0];
        let newName = row.querySelector('td:nth-child(3) input').value; 
        let newCategory = row.querySelector('td:nth-child(4) input').value;
        let newPrice = row.querySelector('td:nth-child(5) input').value; 
        let newInstructorName = row.querySelector('td:nth-child(6) input').value; 
        let newInstructorsJob = row.querySelector('td:nth-child(7) input').value; 

        let reader = new FileReader();
        reader.onload = function() {
            let imageDataUrl = reader.result;
            axios.patch(`https://north-petalite-relative.glitch.me/course/${itemId}`, {
                image: imageDataUrl,
                name: newName,
                category: newCategory,
                price: newPrice,
                instructorName: newInstructorName,
                instructorsJob: newInstructorsJob
            })
            .then(response => {
                console.log('Data successfully updated:', response.data);
                row.querySelector('td:nth-child(2) img').src = imageDataUrl;
                row.querySelector('td:nth-child(3)').textContent = newName;
                row.querySelector('td:nth-child(4)').textContent = newCategory;
                row.querySelector('td:nth-child(5)').textContent = newPrice;
                row.querySelector('td:nth-child(6)').textContent = newInstructorName;
                row.querySelector('td:nth-child(7)').textContent = newInstructorsJob;
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
        };
        reader.readAsDataURL(newImage);

        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>';
    }
    else if (event.target.classList.contains('cancel-edit')) {
        let row = event.target.closest('tr'); 
        let nameInput = row.querySelector('td:nth-child(3) input');
        let categoryInput = row.querySelector('td:nth-child(4) input');
        let priceInput = row.querySelector('td:nth-child(5) input');
        let instructorNameInput = row.querySelector('td:nth-child(6) input');
        let instructorsJobInput = row.querySelector('td:nth-child(7) input');
        let newName = nameInput.value; 
        let newCategory = categoryInput.value;
        let newPrice = priceInput.value; 
        let newInstructorName = instructorNameInput.value; 
        let newInstructorsJob = instructorsJobInput.value; 
        row.querySelector('td:nth-child(3)').textContent = newName;
        row.querySelector('td:nth-child(4)').textContent = newCategory;
        row.querySelector('td:nth-child(5)').textContent = newPrice;
        row.querySelector('td:nth-child(6)').textContent = newInstructorName;
        row.querySelector('td:nth-child(7)').textContent = newInstructorsJob;
        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>';
    }
});



tableUser.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        let row = event.target.closest('tr');
        let itemId = row.querySelector('td:first-child').textContent;
        let name = row.querySelector('td:nth-child(2)').textContent;
        let surname = row.querySelector('td:nth-child(3)').textContent;
        let email = row.querySelector('td:nth-child(4)').textContent;
        let job = row.querySelector('td:nth-child(5)').textContent;
        let phone = row.querySelector('td:nth-child(6)').textContent;

        let nameInput = document.createElement('input');
        nameInput.value = name;
        let surnameInput = document.createElement('input');
        surnameInput.value = surname;
        let emailInput = document.createElement('input');
        emailInput.value = email;
        let jobInput = document.createElement('input');
        jobInput.value = job;
        let phoneInput = document.createElement('input');
        phoneInput.value = phone;

        row.querySelector('td:nth-child(2)').textContent = '';
        row.querySelector('td:nth-child(2)').appendChild(nameInput);
        row.querySelector('td:nth-child(3)').textContent = '';
        row.querySelector('td:nth-child(3)').appendChild(surnameInput);
        row.querySelector('td:nth-child(4)').textContent = '';
        row.querySelector('td:nth-child(4)').appendChild(emailInput);
        row.querySelector('td:nth-child(5)').textContent = '';
        row.querySelector('td:nth-child(5)').appendChild(jobInput);
        row.querySelector('td:nth-child(6)').textContent = '';
        row.querySelector('td:nth-child(6)').appendChild(phoneInput);

        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-check-line confirm-edit"></i><i class="ri-close-line cancel-edit"></i></span>';
    } 
    else if (event.target.classList.contains('delete')) {
        let itemId = event.target.closest('tr').querySelector('td:first-child').textContent;
        if (confirm(`Are you sure you want to delete the item with ID ${itemId}?`)) {
            console.log('Delete item:', itemId);
            axios.delete(`https://north-petalite-relative.glitch.me/user/${itemId}`)
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
        let newSurname = row.querySelector('td:nth-child(3) input').value;
        let newEmail = row.querySelector('td:nth-child(4) input').value;
        let newJob = row.querySelector('td:nth-child(5) input').value;
        let newPhone = row.querySelector('td:nth-child(6) input').value;

        row.querySelector('td:nth-child(2)').textContent = newName;
        row.querySelector('td:nth-child(3)').textContent = newSurname;
        row.querySelector('td:nth-child(4)').textContent = newEmail;
        row.querySelector('td:nth-child(5)').textContent = newJob;
        row.querySelector('td:nth-child(6)').textContent = newPhone;

        axios.patch(`https://north-petalite-relative.glitch.me/user/${itemId}`, {
            name: newName,
            surname: newSurname,
            email: newEmail,
            job: newJob,
            phone: newPhone
        })
        .then(response => {
            console.log('Data successfully updated:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });

        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>';
    }
    else if (event.target.classList.contains('cancel-edit')) {
        let row = event.target.closest('tr');
        let nameInput = row.querySelector('td:nth-child(2) input');
        let surnameInput = row.querySelector('td:nth-child(3) input');
        let emailInput = row.querySelector('td:nth-child(4) input');
        let jobInput = row.querySelector('td:nth-child(5) input');
        let phoneInput = row.querySelector('td:nth-child(6) input');
        let newName = nameInput.value;
        let newSurname = surnameInput.value;
        let newEmail = emailInput.value;
        let newJob = jobInput.value;
        let newPhone = phoneInput.value;

        row.querySelector('td:nth-child(2)').textContent = newName;
        row.querySelector('td:nth-child(3)').textContent = newSurname;
        row.querySelector('td:nth-child(4)').textContent = newEmail;
        row.querySelector('td:nth-child(5)').textContent = newJob;
        row.querySelector('td:nth-child(6)').textContent = newPhone;

        row.querySelector('td:last-child').innerHTML = '<span><i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>';
    }
});