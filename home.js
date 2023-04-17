let searchBtn=document.querySelector("#search-btn");
let searchform=document.querySelector(".search-form");
let like=document.querySelector("#heart");
let loginform=document.querySelector(".login_form");
let menu=document.querySelector("#menu");
let times=document.querySelector("#times");
let nav_bar=document.querySelector(".navbar");
let contact=document.querySelector("#contact");
let contacto=document.querySelector(".contact");
let  carticon=document.querySelector(".cart-icon");
let  cart=document.querySelector(".cart");
let  closecartt=document.querySelector("#close-cart");
let count=0;

function createCustomAlert(content) 
{
    let customAlert = document.getElementById("custom-alert");
    let customAlertMessage = document.getElementById("custom-alert-message");
    let customAlertClose = document.getElementById("custom-alert-close");
    customAlertMessage.innerHTML = content;
    customAlert.style.display = "flex";
    customAlertClose.addEventListener("click", function() 
    {
      customAlert.style.display = "none";
    });
}
function showbar()
{
    searchBtn.className="fa fa-times";
    searchform.style.display="flex";
    searchBtn.setAttribute("onclick","hiddenbar()");
    
}
function hiddenbar()
{
    searchBtn.className="fa fa-search";
    searchform.style.display="none";
    searchBtn.setAttribute("onclick","showbar()");  
}
function heart()
{
    like.classList.toggle("fa-solid");
    console.log(like.className)  
    if(like.className=="far fa-heart fa-solid"){
        like.style.color="red";
    }
    else{
        like.style.color='black'
    }
}
 
 function show_form()
{
    loginform.classList.add("active");
}
 function hideform()
{
    loginform.classList.remove("active"); 
}
 function showmenu()
{
     nav_bar.classList.toggle("active");  
}
 function show_contact()
{
    contacto.style.display="flex";
}
function hidecontact()
{
    contacto.style.display="none";
}
function showcart()
{
    cart.classList.add("active");
    let container=document.getElementsByClassName("shop-container");
    for(i=0;i<container.length;i++)
    {
      container[i].style.width="70%";
    }
}
function closecart()
{
    cart.classList.remove("active");
    let container=document.getElementsByClassName("shop-container");
    for(i=0;i<container.length;i++)
    {
    container[i].style.width="95%";
    }
}


//cart info

 window.onload=function()
 {//window.onload is an event 
  //that occurs in a web browser when
  // a webpage finishes loading.
    removecartButtons=document.getElementsByClassName("remove-cart");
    for(let i=0;i<removecartButtons.length;i++)
    {
        removecartButtons[i].addEventListener("click",removeCartItem);
    }
    let addcart=document.querySelectorAll("#add-cart");
    for(let i=0;i<addcart.length;i++)
    {
    let button=addcart[i];
    button.addEventListener("click",addcartclicked);
    }
    if(document.getElementsByClassName("buy").length!=0)
    {
       document.getElementsByClassName("buy")[0].addEventListener("click",bybuttonclick);
       document.getElementsByClassName("delete")[0].addEventListener("click",deleteall);
    }
    let staricons=document.getElementsByClassName("star");
    for(i=0;i<staricons.length;i++)
    {
      for(j=1;j<=5;j++)
      {
           let staricon= staricons[i].querySelector(".star-icon"+j);
           if (staricon) 
           {
              staricon.addEventListener("click", function() {
              toggleStar(this,j);
              });
           }
           else
           {
            console.log("errorrr")
           }
     }
    }
 }
function toggleStar(starIcon, rating) 
{
    let star=starIcon;
    for (let i = 1; i <= 5; i++)
    {
       if(i<=rating)
        {
            starClass='fa-star'
        }
       else
        {
            starClass='fa-star-o'
        }
        
     if(starIcon)
        {
           starIcon.classList.remove('fa-star','fa-star-o');
           starIcon.classList.add(starClass);
           starIcon = starIcon.previousElementSibling;
        }
    }
    while(star)
    {  
       star= star.nextElementSibling;
       if(star)
       {
        star.classList.remove('fa-star','fa-star-o');
        star.classList.add('fa-star-o');
       }
    }
 }



function bybuttonclick()
{
    updatetotal();
    if( document.getElementsByClassName('total-price')[0].innerHTML=="$0")
    {
        createCustomAlert("empty");
        return;
    }
    createCustomAlert('you are not logged in');
}
function deleteall(event)
{
    updatetotal();
    if( document.getElementsByClassName('total-price')[0].innerHTML=="$0")
    {
        createCustomAlert(" your cart is already empty");
        return;
    }
    var cartcontent=document.getElementsByClassName("cart-content")[0];
    while(cartcontent.hasChildNodes())
    {
        cartcontent.removeChild(cartcontent.firstChild)
    }
    updatetotal();
}
function quantitychange(event,available)
{
    let input=event.target;
    if(isNaN(input.value) || input.value<=0)
    {
        input.value=1;
    }
    if(input.value>parseInt(available))
    {
        createCustomAlert("available:"+available)
        input.value=parseInt(available);
    }
    updatetotal();
}
function removeCartItem(event)
{
    var buttonclicked=event.target;
    buttonclicked.parentElement.remove();
    updatetotal()
}

//update total
function updatetotal()
{
    let cartcontent=document.getElementsByClassName('cart-content')[0];
    let cartboxes=cartcontent.querySelectorAll("#cart-box");
    let total=0;
    
    
    for(let i=0;i<cartboxes.length;i++)
    {
       var cartbox=cartboxes[i];
       let priceelement=cartbox.getElementsByClassName("cart-price")[0];
       let quantityElement=cartbox.getElementsByClassName("cart-quantity")[0];
       let price=parseFloat(priceelement.innerText.replace("$",""));
       let quantity=quantityElement.value;
       total+=price*quantity;
    }
    total=Math.round(total*100)/100;
       document.getElementsByClassName('total-price')[0].innerHTML="$"+total;
}
function addcartclicked(event)
{  /*addcartclicked is likely the name of a function 
  in a JavaScript program that is triggered when a user 
  clicks on an "Add to Cart" button on a web page.*/

    let button=event.target;
    /*event.target
Get the element where the event occurred:*/ 
    let shopproducts=button.parentElement;
    let title=shopproducts.querySelectorAll(".products-title")[0].innerHTML;
    let price=shopproducts.querySelectorAll(".price")[0].innerText;
    let productImg=shopproducts.querySelectorAll(".product-img")[0].src;
    let available=shopproducts.querySelectorAll(".availablenum")[0].innerHTML;
    addproducttocart(title,price,productImg);
    let quantityinputs=document.querySelectorAll('#cart-quantity');
    for(let i=0;i<quantityinputs.length;i++)
    {
      var input=quantityinputs[i];
      input.addEventListener("change", function(event) 
      {
      quantitychange(event, available);
      });
    }
    updatetotal()
}
function addproducttocart(title,price,productImg)
{
    let cartshopbox=document.createElement('div');
    cartshopbox.id="cart-box";
    let cartitems=document.querySelectorAll(".cart-content");
    let cartitemsnames=cartitems[0].getElementsByClassName("cart-product-title");
    for(let i=0;i<cartitemsnames.length;i++)
    {
         if(cartitemsnames[i].innerHTML==title)
         {
            createCustomAlert("you have already add this item to cart");
            return;
         }
    }
    let shopnotification=setInterval(()=>{carticon.classList.add('active')},1000)
    setTimeout(()=>{clearInterval(shopnotification) ; carticon.classList.remove('active')},1990);
    let  cartBoxcontent='<img class="cart-img" src="'
                         + productImg +
                         '"><div class="detail-box"><div class="cart-product-title">'
                         + title + 
                         '</div><div class="cart-price">'
                         + price + 
                         '</div>  <input type="number" value="1" class="cart-quantity" id="cart-quantity"></div><i class="fa fa-trash-o remove-cart" id="remove-cart" ></i>';

    cartshopbox.innerHTML=cartBoxcontent;
    cartitems[0].appendChild(cartshopbox);
    let removeCartItemBtn = cartshopbox.getElementsByClassName('remove-cart')[0];
    if (removeCartItemBtn) 
    {
    removeCartItemBtn.addEventListener('click', removeCartItem);
    }
} 

