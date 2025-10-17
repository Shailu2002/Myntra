let bagitemsobjects = [];
let wishlist = [];
function onLoad()
{
  loadBagitemsobject();
  displayBagItems();
  displaybagIcon();
  displayBagsummary();
  hidecard();
 wishlist = JSON.parse(localStorage.getItem("wishlistitems")) || [];
}
onLoad();
function hidecard()
{
   let cardin = document.querySelector(".card-info");
   cardin.style.display = "none";
}
function displayBagsummary()
{
  let bagsummary = document.querySelector('.bag-summary');
  if (bagitemsobjects.length != 0) {
    let totalMRp = 0;
    let DisMrp = 0;
    let Convenience_Fee = 99;
    bagitemsobjects.forEach((item) => {
      totalMRp += item.original_price;
      DisMrp += item.original_price - item.current_price;
    });
    let tot_amount = totalMRp - DisMrp + Convenience_Fee;
    bagsummary.innerHTML = `
             <div class="bag-details-container">
              <div class="price-header">Price details (${bagitems.length} item)</div>
              <hr/>
              <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value"> ₹ ${totalMRp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"> ₹ ${DisMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value"> ₹ ${Convenience_Fee}</span>
            </div>
               <hr/>
              <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value"> ₹ ${tot_amount}</span>
            </div>
             </div> 
             <!-- bag details ends here -->
            <button class="btn-place-order">
            <div >PLACE ORDER</div>
          </button>
          `;
  }
  else {
    let bagpage = document.querySelector('.bag-page');
    bagpage.innerHTML = `<div class="no-item">
          <img class="img-no-item" src="./images/myntraitem.png" alt="no items!">
          <h3 class="heading-no-item">Hey,it feels so light!</h3>
          <p class="content-no-item">There is nothing in your bag.Let's add some items.</p>
          <button class="btn-wishlist"><a href="./wishlist.html">Add items from wishlist</a></button>
         </div>`;
  }
}
function loadBagitemsobject()
{
    console.log(bagitems);
    bagitemsobjects=bagitems.map((itemid) => {
        for (let i = 0; i < items.length; i++)
        {
            if (items[i].id == itemid)
            {
                return items[i];
              }
        }
 });
    console.log(bagitemsobjects);
}

function displayBagItems()
{
    let bagitemsCon = document.querySelector(".bag-items-container");
    let innerhtmltext = '';
    bagitemsobjects.forEach((element) =>
    {
        innerhtmltext += genrateItemHtml(element);
    });
    bagitemsCon.innerHTML = innerhtmltext;
   
}

function genrateItemHtml(item)
{
   return `
     <div class="bag-item-container">
                  <div class="item-left-part">
              <img class="bag-item-img" src="${item.item_image}">
            </div>
            <div class="item-right-part">
               <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount-percentage">(${item.discount}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
             <div onclick="showCard(${item.id})" class="remove-from-cart">X</div>
            </div>`;
}

function info_itemid(itemid)
{
  for (let i = 0; i < items.length;i++)
  {
    if (items[i].id == itemid)
    {
      return items[i].item_image;
    }
  }
}
function showCard(itemid)
{
  let cardin = document.querySelector(".card-info");
  let info_item = info_itemid(itemid);
  cardin.innerHTML = `<div class="item-info">
           <div> <img class="img-info"  src=${info_item} alt=""></div>
           <div>
            <p style="font-weight: 600;">Move from Bag</p>
            Are you sure you want to move this item from bag?</div>
            <button onclick='hidecard()' class="card-remove">
            x
           </button>
          </div>
          <div class="btn-info">
            <button onclick='removefrombag(${itemid})' class="remove-btn">Remove</button>
            <button onclick='addtowishlist(${itemid})' class="wishlist-btn">Move to wishlist</button>
          </div>`;
  cardin.style.display = "flex";
}
function removefrombag(itemid)
{
  bagitems = bagitems.filter((removeid) => {
    if (removeid != itemid) {
      return true;
    } else {
      return false;
    }
  });
  localStorage.setItem("bagitems", JSON.stringify(bagitems));
  onLoad();
}

function addtowishlist(itemid)
{
  wishlist.push(itemid);
  localStorage.setItem("wishlistitems", JSON.stringify(wishlist));
  removefrombag(itemid);
}
