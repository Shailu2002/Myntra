let bagitemsobjects = [];
function onLoad()
{
    loadBagitemsobject();
  displayBagItems();
  displaybagIcon();
}
function displaybagIcon() {
  let bagitemcount = document.querySelector(".bag-item-count");

  console.log(bagitems.length);
  if (bagitems.length > 0) {
    bagitemcount.style.display = "inline";
    bagitemcount.innerText = bagitems.length;
  } else {
    bagitemcount.style.display = "none";
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
onLoad();
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
             <div onclick="removefrombag(${item.id})" class="remove-from-cart">X</div>
            </div>`;
}

function removefrombag(itemid)
{
    bagitems=bagitems.filter((removeid) =>
    {
        if (removeid!= itemid)
        {
            return true;
        }
        else {
            return false;
        }
    });
    localStorage.setItem("bagitems", JSON.stringify(bagitems));
    onLoad();
}
