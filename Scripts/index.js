let bagitems=[];
function onload()
{
  bagitems = JSON.parse(localStorage.getItem("bagitems")) || [];
  console.log(bagitems);
displayitems();
displaybagIcon();
}
onload();
function addToBag(id) { 
    bagitems.push(id);
    localStorage.setItem('bagitems',JSON.stringify(bagitems));
    displaybagIcon();
}
function displaybagIcon()
{
    let bagitemcount = document.querySelector(".bag-item-count");

    console.log(bagitems.length);
    if (bagitems.length > 0)
    {
        bagitemcount.style.display = "inline";
    bagitemcount.innerText = bagitems.length;
    }
    else {
        bagitemcount.style.display = 'none';
    }
}

function displayitems() {
  let container = document.querySelector(".items-container");
  if (container != null) {
    let innerdata = "";
    items.forEach((item) => {
      innerdata += `<div class="item-container">
            <img src="${item.item_image}" alt="">
            <div class="rating">
              ${item.rating.stars} ⭐| ${item.rating.noOfReviews}
            </div>
            <div class="company-name">
              ${item.company_name}
            </div>
            <div class="item_name">
              ${item.item_name}
            </div>
            <div class="price">
              <span class="current-price">${item.current_price}</span>
              <span class="original_price">${item.original_price}</span>
              <span class="discount">(${item.discount}% OFF)</span>
            </div>
            <button onclick="addToBag(${item.id})" class="btn-add-bag">Add to Bag</button>
          </div>`;
    });
    container.innerHTML = innerdata;
  }
}
