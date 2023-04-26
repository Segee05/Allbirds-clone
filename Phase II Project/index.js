$(document).ready(function() {

  $("#sidemenu").click(function() {
    $("#sidebar").toggle();
  });

    // POST TO API 

  $("#button").on("click", function (e) {
    e.preventDefault();
    let myForm = $(".form")[0];
    let myData = new FormData(myForm);

    $.ajax({
      type: "POST",
      url: "http://159.65.21.42:9000/create/product",
      processData: false,
      contentType: false,
      data: myData,
      success: function (resp) {
        console.log(resp);
      },
      error: function (err) {
        console.log(err);
      },
    });
  
      let nameInput = $('#name'); 
      let categoryInput = $('#category'); 
      let priceInput = $('#price'); 
      let quantityInput = $('#quantity'); 
      let imageInput = $('#image'); 
      let descriptionInput = $('#description'); 

     
      if (nameInput.val().trim() === '') {
        alert('Please enter a name.'); 
        return; 
      }

     
      if (categoryInput.val() === '') {
        alert('Please select a category.'); 
        return; 
      }

      
      if (priceInput.val().trim() === '' || isNaN(priceInput.val())) {
        alert('Please enter a valid price.'); 
        return; 
      }

      if (quantityInput.val().trim() === '' || isNaN(quantityInput.val())) {
        alert('Please enter a valid quantity.'); 
        return;
      }

      
      if (imageInput.val().trim() === '') {
        alert('Please select an image.'); 
        return; 
      }

      if (descriptionInput.val().trim() === '') {
        alert('Please enter a description.'); 
        return; 
      }

      $('.form')[0].submit(); 
      alert("Product Creation successfully");
    });


  // TO GET FROM API

  $.ajax({
    type: "GET",
    url: "http://159.65.21.42:9000/products",
    success: function (resp) {
      let arr = [];
      $(resp).each(function (i, data) {
        if (data.category == "Dam'sKicks") {
          arr.push(data);
          console.log([data].length);
          let result = `
                <div class="shop_prodt">
                <a href='product.html?id=${data._id}'}>
                    <img src='http://159.65.21.42:9000${data.image}' alt="Image" />
                    <h3>${data.name}</h3>
                    <p>${data.description}</p>
                    <h3>$${data.price}</h3>
                    <button>Edit</button>
                    <button>Delete</button>
                </a>
                </div>
                `;
          $("#productsContainer").append(result);
        }
      });
      $("#totalProducts").html(" " + arr.length);
    },
    error: function (err) {
      console.log(err);
    },
  });

  // TO GET A SINGLE PRODUCT

    // let url = window.location.search;
    // let urlParams = new URLSearchParams(url);
    // let id = urlParams.get("id");
    // $.ajax({
    //   type: "GET",
    //   url: `http://159.65.21.42:9000/product/${id}`,
    //   success: function (resp) {
    //     let result = `
    //           <div class="details">
    //               <img src="http://159.65.21.42:9000${resp.image}" alt="product"/>
    //               <div>
    //                   <h2>${resp.name}</h2>
    //                   <p>${resp.description}</p>
    //                   <h3>$${resp.price}</h3>
    //                   <button>Add to Cart</button>
    //               </div>
    //           </div>
    //       `;
    //     $("#view").append(result);
    //   },
    // });

    let url = window.location.search;
let urlParams = new URLSearchParams(url);
let id = urlParams.get("id");
$.ajax({
  type: "GET",
  url: `http://159.65.21.42:9000/product/${id}`,
  success: function (resp) {
    let result = `
      <div class="details">
        <img src="http://159.65.21.42:9000${resp.image}" alt="product"/>
        <div>
          <h2>${resp.name}</h2>
          <p>${resp.description}</p>
          <h3>$${resp.price}</h3>
          <button id="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;
    $("#view").append(result);
   $("#add-to-cart").click(function () {
    $("#cartcontainer").append(cartItems);
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      
      let existingItemIndex = cartItems.findIndex(item => item.id === id);
      if (existingItemIndex >= 0) {

        cartItems[existingItemIndex].quantity++;
      } else {
       
        cartItems.push({ id: id, name: resp.name, price: resp.price, quantity: 1 });
      }
      
      
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      
      
      window.location.href = "http://127.0.0.1:5500/CartPage.html";
     
    });
  },
});


    // CREATE USERS

    $("#User").on("click", function (e) {
      e.preventDefault();
      let users = $(".form_a")[0];
      let myUsers = new FormData(users);
  
      $.ajax({
        type: "POST",
        url: "http://159.65.21.42:9000/register",
        processData: false,
        contentType: false,
        data: myUsers,
        success: function (resp) {
          alert("User Created");
          console.log(resp);
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
    
    // Dashboard

    $.ajax({
      type: "GET",
      url: "http://159.65.21.42:9000/products",
      success: function (resp) {
        let arr = [];
        $(resp).each(function (i, data) {
          if (data.category == "Dam'sKicks") {
            arr.push(data);
            // console.log([data].length);
            let tableCon = `
            <tr>
            <td>${data._id}</td>
            <td>${data.name}</td>
            <td>${data.category}</td>
            <td>${data.price}</td>
            <td>${data.quantity}</td>
            <td>${data.description}</td>
            <button><td><img src="./images/pencil-square.svg" alt=""></td></button>
            <td id= "deleteProducts-"><img src="./images/trash-fill.svg" alt=""></td>
          </tr>
          `;
            $("#table_body").append(tableCon);
          }
        });
      },
    });

// delete product

$(`#deleteProducts-${data._id}`).click(function () {
  alert('working');
  // Alert something when delete icon is clicked
  alert("Delete icon / button clicked for product with ID:", data._id);

  $.ajax({
      type: "DELETE",
      url: `http://159.65.21.42:9000/product/${data._id}`,
      success: function (response) {
          // remove the HTML element for the deleted product
          $(this).closest(".tableCon").remove();
          alert(`Product with ID ${data._id} deleted successfully.`);
      },
      error: function (error) {
          console.log(error);
      },
  });

});

   
  
});
    

  


  

 
  





