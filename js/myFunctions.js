/*
Name:  Yunha Jang
Assignment:  Assignment2 (Pizza Order System)
Due Date: Feb,23,2015

Page Description: This contains the constants and functions needed for
this application, including data validation functions.
It also contains some contants that are used on all pages of the app
such as the pizza price, topping price and HST rate.

Files: index.hthml - Main page
       css/main.css - the main style for this app
       js/myFunction.js - Javascript functions & constants specific to this app
       images/head.jpg - image used in this app
*/

// Constants
var SMALL_COST = 8.99;
var MEDIUM_COST = 10.99;
var LARGE_COST = 12.99;
var EXLARGE_COST = 14.99;
var TOPPING_SMALL = 0.85;
var TOPPING_MEDIUM = 0.95;
var TOPPING_LARGE = 1.00;
var TOPPING_EXLARGE = 1.10;
var HST_RATE = 0.13;

// Srrays containing constants
var mySizePrice = [SMALL_COST, MEDIUM_COST, LARGE_COST, EXLARGE_COST];
var myToppingPrice = [TOPPING_SMALL, TOPPING_MEDIUM, TOPPING_LARGE, TOPPING_EXLARGE];

// Global variables
var selectedSizeIndex = 0;
var toppingCount = 0;
var subTotal = 0;

// Global boolean variables
var isValidText = false;
var isValidPostalCode = false;
var isValidPhoneNumber = false;
var isSizeSelected = false;

// Method 1: to validate customer's whole input
function validate() {
    // validate each parts and set results in each variables
    isValidText = validateText();
    isValidPostalCode = validatePostalCode();
    isValidPhoneNumber = validatePhoneNumber();
    isSizeSelected = validateSize();
    // if all of them are valid, display the invoice
    if(isValidText && isValidPostalCode && isValidPhoneNumber && isSizeSelected) {
        displayInvoice();
    }// else, the invoice will not be displayed
}

// Method 1.1: to validate text boxes are empty or not
function validateText() {
    
    // a variable to count the number of invalid(empty) text boxes
    var invalidCount = 0;
    
    // check each text box is empty. If it is, show the message
    for(var i = 0 ; i < 6 ; i++) {
        // text box nodes
        var x = document.forms['order'].elements[i];
        // trick: remove space from name to make id
        var id = x.name.replace(/ /, "");
        // error nodes
        var error = document.getElementById(id+'ErrorMsg');
        // if it is empty, display the message
        if(x.value.length === 0) {
            error.innerHTML = "<b>"+x.name+"</b>should be filled";
            // increment the number of invalid(empty) text boxes
            invalidCount++;
        // if it is not empty, no error message will be displayed
        } else {
            error.innerHTML = "";
        }
    } // if there is no invalid(empty) text box, return true, else return false
    if(invalidCount === 0) {
        return true;
    } else {
        return false;
    }
}

// Method 1.2: to validate the postal code, using the RegEx pattern
function validatePostalCode() {
    
    // node for the text of postal code
    var postalCode = document.forms['order']["Postal Code"];
    // if it is empty, no more validate and return false
    if(postalCode.value === "") {
        return false;
    }
    // make an RegEx pattern for the Canada Postal code
    // which is for A1B2C3 (or A1B 2C3)
    var regex = /^[a-z]\d[a-z]\s?\d[a-z]\d$/i;
    // set the result of validation in the isVaid variable
    var isValid = regex.test(postalCode.value);
    // if it is not valid, display the error message
    if(!isValid) {
        document.getElementById("PostalCodeErrorMsg").innerHTML =
                "<b>Postal Code</b> is not valid";
    // else, no error message will be displayed
    } else {
        document.getElementById("PostalCodeErrorMsg").innerHTML = "";
    }
    // return the result of validation
    return isValid;

}

// Method 1.3: to validate the phone number, using the RegEx pattern
function validatePhoneNumber() {
    
    // node for the text of the phone number
    var phoneNumber = document.forms['order']["Phone"];
    // if it is empty, no more validation and return false
    if(phoneNumber.value === "") {
        return false;
    }
    // make an RegEx pattern for the phone number
    // which is for 999-999-9999(or 9999999999) pattern
    var regex = /^\d{3}-?\d{3}-?\d{4}$/;
    // set the result of validation in the isVaid variable
    var isValid = regex.test(phoneNumber.value);
    // if it is not valid, display the error message
    if(!isValid) {
        document.getElementById("PhoneErrorMsg").innerHTML =
                "<b>Phone Number</b> is not valid";
    // else, no error message will be displayed
    } else {
        document.getElementById("PhoneErrorMsg").innerHTML = "";
    }
    // return the result of validation
    return isValid;
}

// Method 1.4: to check the size
function validateSize(){

    // boolean variable to check the size is selected or not
    var isSelected = false;
    for(var i = 0 ; i < 4 ; i++) {
        // nodes(radio buttons) for size
        var x = document.forms['order']["size"][i];
        // if it is checked, size is selected and grab the index of nodes
        if(x.checked) {
            isSelected = true;
            selectedSizeIndex = i;
        }
    }
    // node for the warning message
    var warning = document.getElementById("warning");
    // if size is selected, no message will be displayed and return true
    if(isSelected) {
        warning.innerHTML = "";
        return true;
    // else, show the warning message and return false
    } else {
        warning.innerHTML = "Please select <b>size</b>";
        return false;
    }
}

// Method 2: to hide the order page and display the invoice
function displayInvoice() {

    // hide the order page
    document.getElementById("container").style.display = "none";
    // display the invoice container
    document.getElementById("invoice").style.display = "inline";
    // display the cumtomer's information, pizza size, toppings and prices
    displayCustomInfo();
    displaySize();
    displayToppings();
    displayHST();
    displayTotalPrice();
}

// Method 2.1: to display customer's information
function displayCustomInfo() {
    
    // grab user's input and set them into invoice information
    // 1) name
    document.getElementById("Name").innerHTML = document.forms['order'].elements[0].value;
    // 2) address(Street, City, Province)
    document.getElementById("Address").innerHTML = 
            document.forms['order'].elements[1].value +'<br>'+
            document.forms['order'].elements[2].value +', '+
            document.forms['order'].elements[3].value;
    // 3) Phone number
    document.getElementById("Phone").innerHTML = "<b>Phone: </b> " +
            document.forms['order'].elements[5].value;
    // 4) Postal Code
    document.getElementById("PostalCode").innerHTML = document.forms['order'].elements[4].value;
}

// Method 2.2: to display pizza size and price for the selected pizza size
function displaySize() {

    // get the index of size from Method 1.4 validateSize()
    var i = selectedSizeIndex;
    // node of selected pizza size
    var x = document.forms['order']["size"][i];
    // display the pizza size
    var size = document.getElementById("selectedSize");
    size.innerHTML = "<b>Size:</b> " + x.value;
    // display the price for the selected pizza size
    var price = document.getElementById("sizePrice");
    price.innerHTML = "$" + mySizePrice[i];
}

// Method 2.3: to display selected toppings and price for selected toppings
// on the basis of pizza size
function displayToppings() {
    
    // node for display topping list
    var x = document.getElementById("selectedToppings");
    var result = x.innerHTML;
    result = "<b>Toppings:</b><br>";
    
    // check which topping is selected 
    for(var i = 0 ; i < 9 ; i++) {
        var topping = document.forms['order'].elements[i+12];
        // If it is selected, add it to the topping list
        if(topping.checked){
            result += topping.value +", ";
            // and increment the number of selected toppings
            toppingCount++;
        }
    }
    // trick: remove the "," in the end of the list
    x.innerHTML = result.substring(0, result.length-2);
    // calculate the price for toppings on the basis of pizza size
    // from Method 1.4 validateSize()
    var price  = toppingCount * myToppingPrice[selectedSizeIndex];
    // display the price in 2 decimal form
    var x = document.getElementById("toppingsPrice");
    x.innerHTML = "$" + price.toFixed(2);
}

// Method 2.4: to display the HST from subtotal
function displayHST() {
    
    // grab pizza size index from Method 1.4 validateSize()
    var i = selectedSizeIndex;
    // calculate subtotal using arrays containing Constants for price
    subTotal = mySizePrice[i] + myToppingPrice[i] * toppingCount;
    // calculate the HST
    myHST = subTotal * HST_RATE;
    // display the HST in 2 decimal form
    document.getElementById("HST").innerHTML = "$" + myHST.toFixed(2);
}

// Method 2.5: to display the total price
function displayTotalPrice() {
    
    // calculate the total price and display it in 2 decimal form
    var total = subTotal * (1 + HST_RATE);
    document.getElementById("totalPrice").innerHTML = "$" + total.toFixed(2);
}
