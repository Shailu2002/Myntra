let wishlistObjects = [];
function whislistload()
{
    wishlist = JSON.parse(localStorage.getItem("wishlistitems")) || [];
    let wishitemcount = document.querySelector(
        ".wishlist-items-count"
    );
    if (wishlist.length == 0)
    {
        wishitemcount.innerHTML = `Looks like you haven’t added anything yet! <i  class="fa-solid sad-emoji fa-face-frown fa-fade"></i>`;
    }
    else {
        wishitemcount.innerHTML = `My wishlist ${wishlist.length}`;
    }
   
    let wishl = document.querySelector(".wishlist_items");
    innertexthtml = "";
    wishlistObjects = wishlist.map((el) =>
    {
        for (let i = 0; i < items.length; i++)
        {
            if (el == items[i].id)
            {
                return items[i];
            }
        } 
    });
    console.log(wishlistObjects);
    wishlistObjects.forEach((i) => {
        innertexthtml += `<div class="wishlist_item">
        <div class="img-div">
           <img class="img-wishlist" src=${i.item_image} alt="">
        </div>
        <div>
         <p><span class="company-name">${i.company_name}</span>, <span class="item_name">${i.item_name}</span></p>
         <p > <span class="current-price"> Rs. ${i.current_price} </span> <span class="original_price"> Rs. ${i.original_price}</span> <span class="discount">  (${i.discount}% OFF) </span></p>
        </div>
          <button onclick="movefromwishlist(${i.id})"
          class="btn-wishlist">MOVE TO BAG</button>
       </div>`;
    });
    wishl.innerHTML =innertexthtml;
}
whislistload();
function movefromwishlist(itemid)
{
    addToBag(itemid);
    wishlist=wishlist.filter((item) => {
        if (item != itemid)
        {
            return true;
         }
        else {
            return false;
      }
    });
    localStorage.setItem("wishlistitems", JSON.stringify(wishlist));
    whislistload();
}


