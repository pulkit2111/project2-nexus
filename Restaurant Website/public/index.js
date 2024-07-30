$(document).ready(function() {
    $(window).on('scroll', function() {
      var scrollPosition = $(this).scrollTop();
  
      // Find the position of each section and apply the bold style to the corresponding nav item
      $('section').each(function() {
        var sectionTop = $(this).offset().top;
        var sectionHeight = $(this).outerHeight();
        var sectionId = $(this).attr('id');
  
        if (scrollPosition >= sectionTop-10 && scrollPosition < (sectionTop + sectionHeight)) {
          $('nav a').removeClass('bold'); // Remove bold from all nav items
          $('nav a[href="#' + sectionId + '"]').addClass('bold'); // Add bold to the corresponding nav item
        }
      });
    });
  });

// Function to add items to the cart
function addToCart(itemName, price) {
    const cartList = document.getElementById('cart-items');
    let totalPrice = document.getElementById('total-price');
    let currentPrice = parseFloat(totalPrice.textContent.slice(1)); // Extract numerical value
    let totalQuantity = document.getElementById('quantity');

    // Check if the item is already in the cart
    let existingItem = Array.from(cartList.children).find(item => item.querySelector('.item-info').textContent.includes(itemName));

    if (existingItem) {
        const plusButton = existingItem.querySelector('.plus');
        let quantity = parseInt(plusButton.previousElementSibling.textContent);
        quantity++;
        plusButton.previousElementSibling.textContent = quantity;
        currentPrice += price;

    } else {
        // Create a new list item for the cart
        const li = document.createElement('li');
        li.classList.add('cart-item');

        let newstr = "";
      let i=0;
      while ( i < itemName.length){
        if ((itemName[i]=="<" && itemName[i+1]=="b" && itemName[i+2]=="r" && itemName[i+3]==">"))
           { 
            i=i+4;
      }
      else{
        newstr += itemName[i];
        i++;
      }
      }


      const reduceditemname = newstr.split(" ").join("");
      const imageName = "/images/" + reduceditemname + ".png";
      
        li.innerHTML = `
        <div class="cart-item-dis">
               <span class="item-info"> ${itemName} </span>
               <span class="item-info ii-price"> ₹${price} </span>
        </div>
            <div class="cart-pic"> 
                <img src="${imageName}">
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus">-</button>
                <span class="quantity">1</span>
                <button class="quantity-btn plus">+</button>
            </div>
            <hr>
        `;

    
    // Update total price
    currentPrice += price;
    // totalPrice.textContent = `₹${currentPrice}`;
    
    cartList.appendChild(li);

    // Event listeners for plus and minus buttons
    const plusButton = li.querySelector('.plus');
    const minusButton = li.querySelector('.minus');
    plusButton.addEventListener('click', () => {
        let plusPrice = parseFloat(totalPrice.textContent.slice(1));
        let quantity = parseInt(plusButton.previousElementSibling.textContent);
        quantity++;
        plusButton.previousElementSibling.textContent = quantity;
        plusPrice += price;
        totalPrice.textContent = `₹${plusPrice}`;

        let currentQuantity = parseFloat(totalQuantity.textContent);
        currentQuantity++;
        totalQuantity.textContent = `${currentQuantity}`;
    });

    minusButton.addEventListener('click', () => {
        let quantity = parseInt(minusButton.nextElementSibling.textContent);
        let minusPrice = parseFloat(totalPrice.textContent.slice(1));
        if (quantity > 1) {
            quantity--;
            minusButton.nextElementSibling.textContent = quantity;
            minusPrice -= price;
            totalPrice.textContent = `₹${minusPrice}`;
        }
        else{
            minusPrice -= price;
            totalPrice.textContent = `₹${minusPrice}`;
            cartList.removeChild(li);
        }

        let currentQuantity = parseFloat(totalQuantity.textContent);
       currentQuantity--;
       totalQuantity.textContent = `${currentQuantity}`;
    });
}

    totalPrice.textContent = `₹${currentPrice}`;

    const orderNowLink = document.getElementById('order-now-link');
    orderNowLink.href = `http://localhost:3003?totalPrice=${currentPrice.toFixed(2)}`;

    let currentQuantity = parseFloat(totalQuantity.textContent);
    currentQuantity++;
    totalQuantity.textContent = `${currentQuantity}`;
}

// Example usage: when 'ADD TO CART' button is clicked
document.querySelectorAll('.adc-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const itemNames = ['DOSA', 'PASTA', 'PAV BHAJI', 'NOODLES', 'SANDWICH', 'BURGER', 'COFFEE', 'PIZZA', 'MOMOS'];
        const itemPrices = [95, 55, 70, 45, 40, 40, 50, 125, 80];
        // const imageName = ['images/dosa.png', 'images/dosa.png', 'images/dosa.png', 'images/dosa.png', 'images/dosa.png', 'images/dosa.png', 'images/dosa.png', 'images/dosa.png', 'images/dosa.png']
        addToCart(itemNames[index], itemPrices[index]);
    });
});

// Function to toggle sidebar


const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('show');
}

function bringSidebar(){
    sidebar.classList.add('show');
}

function closeSidebar(){
    sidebar.classList.remove('show');
};

$(window).on('scroll', closeSidebar);
