$(document).ready(function () {
    $("#contact_form .input").keypress(function () {
      $("#ajaxResponseDiv").html("");
    });
  
    // $('#contact-form .input').on('change',function(){
    //     $(this).removeClass('wrong-entry');
    //     $(this).parent().find('.inputError').html('');
    // });
  
    $(".quantity").on("keyup", function () {
      var id = $(this).data("quantity");
      var value = $("#quantity" + id).val();
      if (value > 0) {
        document.getElementById("quantity" + id).value = value;
      }
      //console.log(value);
      addToQuote(id, value, 0, "increase");
    });
  
    $(".sub-cat").click(function () {
      var cat_id = $("input[name='cat']:checked").val();
      var sub_cat = [];
      $.each($("input[name='sub-cat']:checked"), function () {
        sub_cat.push($(this).val());
      });
      sub_cat.join(", ");
      $.ajax({
        type: "POST",
        data: {
          cat_id: cat_id,
          brands: sub_cat,
        },
        url: BASE_URL + "api/showProductBySubCat",
        success: function (data) {
          //console.log(data);
          //return;
          if ((data.status = true)) {
            $(".sapce-category").html("");
            var search_data_length = data.data.length;
            var search_data = data.data;
            var i;
            for (i = 0; i < search_data_length; i++) {
              var searches = data.data[i];
              var j;
  
              for (j = 0; j < searches.length; j++) {
                var btn =
                  '<button class="atq btn" onclick="addToQuote(' +
                  searches[j].id +
                  ',1);">Add to quote</button>';
                var column =
                  '<div class="col-xl-4 col-md-6 col-grid-box">' +
                  '<a href="' +
                  BASE_URL +
                  "product-details/" +
                  searches[j].id +
                  "/" +
                  searches[j].slug +
                  '">' +
                  '<div class="product-box hover">' +
                  ' <div class="product br-0">' +
                  '<img src="' +
                  BASE_URL +
                  searches[j].image_url +
                  '" alt="product" class="img-fluid blur-up lazyloaded" style="width: 100%; height: 195px; object-fit: cover;">' +
                  '</div><div class="product-info"><p>' +
                  searches[j].description +
                  "</p></div>" +
                  '<input type="hidden" name="product_id" value="' +
                  searches[j].id +
                  '">' +
                  btn +
                  "</div></div></a></div>";
  
                '<div class="p-2 md:w-1/4">' +
                  '<div class="h-full  rounded-lg transform transition-all duration-300  bg-white shadow-lg scale-100 hover:scale-95   ">' +
                  '<div class=" shadow-md">' +
                  '<img src="<?php echo base_url().$design->image ;?>" class="p-2"  alt="">' +
                  '<p class="text-tertiary-900 font-sans  text-sm my-2 tracking-wider text-center" ><?php echo $design->name ;?></p>' +
                  '<input type="hidden" name="product_id" value="<?php echo $design->id;?>">' +
                  '<button id="contact-us-button" type="submit" onclick="addToQuote(<?php echo $design->id;?>,1);"  aria-label="" class="text-center w-full mx-auto uppercase text-sm tracking-widest font-semibold  py-2 px-8  hover:text-black cursor-pointer text-white bg-black border hover:border-tertiary-700 transition duration-300 hover:bg-white hover:border-2 hover:border-black">' +
                  "Add to quote" +
                  "</button>" +
                  "</div>" +
                  "</div>" +
                  "</div>";
  
                $(".sapce-category").append(column);
              }
            }
          } else {
            var column = "There are no product";
            $(".sapce-category").append(column);
          }
        },
        error: function (err) {},
      });
    });
  });
  
  // Restricts input for the given textbox to the given inputFilter.
  function setInputFilter(textbox, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function (event) {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
  
  // name check
  setInputFilter(document.getElementById("quote_name"), function (value) {
    return /^[a-z]*$/i.test(value);
  });
  // location check
  setInputFilter(document.getElementById("quote_city"), function (value) {
    return /^[a-z]*$/i.test(value);
  });
  
  // mobile number
  setInputFilter(document.getElementById("quote_mobile"), function (value) {
    return /^-?\d*$/.test(value);
  });
  
  function isEmail(contact_email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(contact_email);
  }
  function isNumber(t) {
    var e = (t = t || window.event).which ? t.which : t.keyCode;
    return !(e > 31 && (e < 48 || e > 57));
  }
  
  function querryForm() {
    var name = $("#querry_name").val();
    var phone = $("#querry_mobile").val();
    var email = $("#querry_email").val();
    var city = $("#querry_city").val();
    var message = $("#querry_message").val();
  
    if (name == "") {
      $("#querryajaxResponseDiv").html("");
      $("#querryajaxResponseDiv").html("Please enter Name");
    } else if (phone.length < 10) {
      $("#querryajaxResponseDiv").html("");
      $("#querryajaxResponseDiv").html("Please enter mobile number");
    } else if (email == "") {
      $("#querryajaxResponseDiv").html("");
      $("#querryajaxResponseDiv").html("Please enter Email");
    } else if (!isEmail(email)) {
      $("#querryajaxResponseDiv").html("");
      $("#querryajaxResponseDiv").html("Please enter valid email");
    } else if (city == "") {
      $("#querryajaxResponseDiv").html("");
      $("#querryajaxResponseDiv").html("Please enter city");
    } else {
      $("#querry-us-button").attr("disabled", "disabled");
      $("#querry-us-button").text("Sending...");
      var form = $("#querry_form")[0];
      var formData = new FormData(form);
      // console.log(formData);
      // return;
      $.ajax({
        type: "POST",
        url: BASE_URL + "api/send_querry_message",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          var data = response;
          // console.log(data);
          if (data.status) {
            $("#querryajaxResponseDiv").html("");
            $("#querryajaxResponseDiv").css("color", "#4bb543");
            $("#querryajaxResponseDiv").html(
              "Thank you for sharing details with us. We will contact you shortly."
            );
            $("#querry-us-button").attr("disabled", false);
            $("#querry-us-button").text("Send Message");
          }
        },
        error: function () {},
      });
  
      $("#querry_form").each(function () {
        this.reset();
      });
    }
  }
  
  function connectForm() {
    var name = $("#contact_name").val();
    var company_name = $("#contact_company").val();
    var email = $("#contact_email").val();
    var phone = $("#contact_phone").val();
    // var address = $('#contact_address').val();
    var city = $("#contact_city").val();
    var description = $("#contact_description").val();
    // console.log(name, company_name, email, phone, city, description);
    // return;
    if (name == "") {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter Name");
    } else if (phone.length < 10) {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter mobile number");
    } else if (email == "") {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter Email");
    } else if (!isEmail(email)) {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter valid email");
    } else if (company_name == "") {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter company name");
    } else if (city == "") {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter City");
    } else if (description == "") {
      $("#ajaxResponseDiv").html("");
      $("#ajaxResponseDiv").html("Please enter Description");
    } else {
      $("#contact-us-button").attr("disabled", "disabled");
      $("#contact-us-button").text("Sending...");
      // var form = $("#connect_form")[0];
      // var formData = new FormData(form);
  
      // $.ajax({
      //   type: "POST",
      //   url: "https://script.google.com/macros/s/AKfycbzPF9ED3w8r1S4qQcWllWg5cr_FB1fYhgcvABpVMsRvEhtK7z-L_rlwJdvvU-yrolQF/exec",
      //   data: formData,
      //   processData: false,
      //   contentType: false,
      //   success: function (response) {
      //     var data = response;
      //     // console.log(data);
      //     if (data.status) {
      //       $("#ajaxResponseDiv").html("");
      //       $("#ajaxResponseDiv").css("color", "#4bb543");
      //       $("#ajaxResponseDiv").html(
      //         "Thank you for sharing details with us. We will contact you shortly."
      //       );
      //       $("#contact-us-button").attr("disabled", false);
      //       $("#contact-us-button").text("Send Message");
      //     }
      //   },
      //   error: function () {},
      // });
  
      $("#connect_form").each(function () {
        this.reset();
      });
    }
  }
  
  function increaseQuantity(id = "") {
    var value = parseInt(document.getElementById("quantity" + id).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById("quantity" + id).value = value;
    addToQuote(id, value, 0, "increase");
  }
  
  function decreaseQuantity(id = "") {
    var value = parseInt(document.getElementById("quantity" + id).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? (value = 1) : "";
    value--;
    if (value > 0) {
      document.getElementById("quantity" + id).value = value;
    }
    addToQuote(id, value, 0, "decrease");
  }
  
  function addToQuote(productId, value = 0, str) {
    var cpID = $.cookie("cpID");
    var cpIDArr = [];
    if (cpID) {
      cpIDArr = cpID.split(",");
    }
    var quantity = $("#quantity").val();
    if (value != 0) {
      quantity = value;
    }
    if (quantity > 0) {
      var isFound = true;
      var changeQuantity = false;
  
      for (var i = 0; i < cpIDArr.length; i++) {
        cpArr = cpIDArr[i].split(":");
        if (cpArr[0] == productId) {
          isFound = false;
        }
        if (cpArr[1] != quantity) {
          if (productId == cpArr[0]) {
            cpIDArr[i] = cpArr[0] + ":" + quantity;
            //console.log(cpIDArr[i]);
            changeQuantity = true;
          }
        }
      }
      if (isFound) {
        productId += ":" + quantity;
        if (cpID && cpID != "") {
          cpID += "," + productId;
        } else {
          cpID = productId;
        }
        $.cookie("cpID", cpID, { expires: 10, path: "/" });
        $("#response").css("display", "block");
        $("#response").removeClass("alert alert-danger");
        $("#response").addClass("alert alert-success wishlist_success");
        $("#message").text("Product added to cart!");
        setTimeout(function () {
          $("#response").fadeOut("fast");
        }, 2500);
        $("#viewCart").removeClass("disabled");
        var no_of_items = $(".cartAddValue").text();
        no_of_items = parseInt(no_of_items) + 1;
        //console.log(no_of_items);
        if (no_of_items > 0) {
          $(".cartAddValue").text(no_of_items);
        } else {
          var html = '<span class="cartAddValue">1</span>';
          $("#cart_value").html(html);
          $("#cart_value").show();
        }
      } else {
        if (changeQuantity) {
          cpID = "";
          //console.log(cpIDArr)
          for (var i = 0; i < cpIDArr.length; i++) {
            if (cpID == "") {
              cpID += cpIDArr[i];
            } else {
              cpID += "," + cpIDArr[i];
            }
          }
          $.cookie("cpID", cpID, { expires: 10, path: "/" });
  
          // var amonutPerProduct = $('#cart-amount_'+productId).val();
          // var updateAmount = amonutPerProduct * value;
          // $('#cart_'+productId+' #update-amount').text('');
          // $('#cart_'+productId+' #update-amount').text(updateAmount);
          // $('#cart_'+productId+' .icon-rupee').data('amount',updateAmount);
          //window.location.reload();
        } else {
          $("#response").css("display", "block");
          $("#response").removeClass("alert alert-success wishlist_success");
          $("#response").addClass("alert alert-danger");
          $("#message").text("Product already added to cart!");
          setTimeout(function () {
            $("#response").fadeOut("fast");
          }, 2500);
        }
      }
    }
  }
  
  function deleteQuotation(productId) {
    var flag = false;
    var index;
    var cpIDArr = [];
    var cpID = $.cookie("cpID");
    var cpIDArr = cpID.split(",");
    for (var i = 0; i < cpIDArr.length; i++) {
      var indexData = cpIDArr[i].split(":");
      if (indexData[0] == productId) {
        flag = true;
        index = i;
        break;
      }
    }
    if (flag) {
      cpIDArr.splice(index, 1);
      no_of_items = $(".cartAddValue").text();
      if (no_of_items > 0) {
        no_of_items = no_of_items - 1;
      }
      if (no_of_items == 0) {
        window.location.href = BASE_URL + "alldesigns";
      }
      $(".cartAddValue").text(no_of_items);
      $("#cart_" + productId).remove();
    }
    cpID = "";
    for (var i = 0; i < cpIDArr.length; i++) {
      if (cpID == "") {
        cpID += cpIDArr[i];
      } else {
        cpID += "," + cpIDArr[i];
      }
    }
    $.cookie("cpID", cpID, { expires: 10, path: "/" });
  }