let acount = document.querySelector(".my-acount")
let loginAndRegister = document.querySelector("#login-register")
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;
let userBasket = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).basket : null;
let tbody = document.querySelector("tbody");
let responsiveBasketCart = document.querySelector(".basket-responsiv");
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
function getUserSession() {
    return JSON.parse(localStorage.getItem('currentUser')) || { id: null, basket: [] };
}
userBasket.forEach(elementId => {
    fetch(`http://localhost:3000/shop/${elementId}`)
        .then(res => res.json())
        .then(respons => {
            const productHTML = `
                <tr class="product">
                    <td class="img">
                        <div class="image">
                            <img src="${respons.image}" alt="picture">
                        </div>
                    </td>
                    <td>${respons.name}</td>
                    <td class="price">${respons.price}</td>
                    <td>
                        <input type="number" min="0" value="0" class="count" onchange="updateTotal()">
                    </td>
                    <td class="subTotal">${respons.price}</td>
                    <td>
                        <i class="bi bi-x-circle" onclick="deleteFromBasket(${respons.id})"></i>
                    </td>
                </tr>
            `;
            tbody.innerHTML += productHTML;

            const responsiveProductHTML = `
                <div class="responsiv-cart">
                    <div class="image">
                        <img src="${respons.image}" alt="">
                    </div>
                    <h4>${respons.name}</h4>
                    <p>${respons.price}</p>
                    <p><input type="number" min="0" value="0" onchange="updateTotal()"></p>
                    <p class="subtotal">${respons.price}</p>
                    <p class="delet-icon"><i class="bi bi-x-circle" onclick="deleteFromBasket(${respons.id})"></i></p>
                </div>
            `;
            responsiveBasketCart.innerHTML += responsiveProductHTML;
        })
        .catch(error => {
            console.error('Error fetching shop data:', error);
        });
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.product').forEach(row => {
        const price = parseFloat(row.querySelector('.price').textContent);
        const quantity = parseInt(row.querySelector('.count').value);
        const subtotal = price * quantity;
        row.querySelector('.subTotal').textContent = `$${subtotal.toFixed(2)}`;
        total += subtotal;
    });
    document.querySelectorAll('.responsiv-cart').forEach(cartItem => {
        const price = parseFloat(cartItem.querySelector('p:nth-child(3)').textContent);
        const quantity = parseInt(cartItem.querySelector('input').value);
        const subtotal = price * quantity;
        cartItem.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        total += subtotal;
    });
    document.querySelector('.total p').textContent = `$${total.toFixed(2)}`;
}
async function deleteFromBasket(elementId) {
    const userData = getUserSession();
    const index = userData.basket.indexOf(elementId);
    if (index !== -1) {
        userData.basket.splice(index, 1);
        updateBasketSession(userData); 
        try {
            await axios.patch(`http://localhost:3000/user/${userData.id}`, { basket: userData.basket });
            console.log('Basket listesi güncellendi:', userData.basket);
        } catch (error) {
            console.error('Basket listesi güncellenirken bir hata oluştu:', error);
        }
        tbody.innerHTML = '';
        updateTotal();
    } else {
        console.error('Element ID not found in basket:', elementId);
    }
}
function updateBasketSession(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
}