const button_prct = document.getElementsByClassName('button-prct')
const bill_input = document.getElementById('billek')
const nOfPeople_input = document.getElementById('nOfPeople-input')
const reset_button = document.getElementById('reset-button')
let bill_error = document.getElementById("bill_span")
let nPeople_error = document.getElementById("nPeople_span")
let last = -1
let custom_span = document.getElementById("custom-span")
let custom_input = document.getElementById("custom-input")
let custom_button = document.getElementById("custom-button")
let sTip_error = document.getElementById("sTip-span")
custom_input.classList.add("custom-hide")




//  **********************************************************

// adding click event to every button with precent to choose
// after clicking other button the first one should get
// removed "clicked" styles. Checking if the last button
// clicked wasn't custom (additional things are needed then)

// **********************************************************

for (let i = 0; i < button_prct.length; i++) {
    button_prct[i].addEventListener("click", () => {
        if (last == 5) {
            custom_button.classList.remove('precent-clicked')
            custom_span.classList.remove("custom-hide")
            custom_input.classList.add("custom-hide")
            custom_input.value = null
        }
        else if (last != -1) {
            button_prct[last].classList.remove('precent-clicked')
        }
        button_prct[i].classList.add('precent-clicked')
        last = i
        checkIfValid()
    })
}
nOfPeople_input.addEventListener("focusout", checkIfValid)
bill_input.addEventListener("focusout", checkIfValid)
custom_input.addEventListener("focusout", checkIfValid)





// ***********************************************

// Adding click event to input in custom button
// hiding "Custom" text and showing input

// ***********************************************

custom_button.addEventListener("click", () => {
    custom_button.classList.add("precent-clicked")
    custom_span.classList.add("custom-hide")
    custom_input.classList.remove("custom-hide")
    if (last != -1 && last != 5) {
        button_prct[last].classList.remove('precent-clicked')
    }
    last = 5
})





reset_button.addEventListener('click', reset)






// ***********************************************

// Checking if inputs with numbers are not empty 
// or if the numbers are not negative

// ***********************************************

function checkIfValid() {
    let bill = bill_input.value
    let nOfPeople = nOfPeople_input.value
    let valid = true
    resetErrors()
    if (bill == '' || bill == null || bill <= 0) {
        valid = false
        bill_input.classList.add("input-error")
        bill_error.classList.add("error-show")
    }
    if (nOfPeople == '' || nOfPeople == null || nOfPeople <= 0) {
        valid = false
        nOfPeople_input.classList.add("input-error")
        nPeople_error.classList.add("error-show")
    }
    if (last == 5 && parseFloat(custom_input.value) < 0) {
        custom_input.classList.add("input-error")
        sTip_error.classList.add("error-show")
    }

    if (valid) {
        calculateTotal()
    }
}






// ***********************************************

//Removing all error styles

// ***********************************************

function resetErrors() {
    bill_input.classList.remove("input-error")
    bill_error.classList.remove("error-show")
    nOfPeople_input.classList.remove("input-error")
    nPeople_error.classList.remove("error-show")
    custom_input.classList.remove("input-error")
    sTip_error.classList.remove("error-show")
}





// ****************************************************

// Choosing from where should get precentage and then
// calculating Tip Amount and Total

// ****************************************************

function calculateTotal() {
    let precent = 0
    if (last == 5) {
        precent = parseFloat(custom_input.value) / 100

    }
    else if (last != -1) {
        precent = parseFloat(button_prct[last].textContent) / 100
    }
    else {
        precent = 0
    }

    let bill = parseFloat(bill_input.value)
    let nOfPeople = parseFloat(nOfPeople_input.value)

    let perPerson = (bill * precent / nOfPeople).toFixed(2)

    let total = ((bill + perPerson * nOfPeople) / nOfPeople).toFixed(2)
    setPrices(perPerson, total)

}






// await new Promise(r => setTimeout(r, 2000));



// *******************************************************

// Getting current Tip amount and Total and corventing
// them to number with 2 digits past dot ($1.23 => 1.23)

// *******************************************************

function setPrices(perPerson, total) {
    let tipPpP = document.getElementById('TipPp')
    let tipToT = document.getElementById('TipT')
    changeCash(tipPpP.textContent, perPerson, tipPpP)
    let cashPp = ""
    let cashTo = ""
    for (let l = 1; l < tipPpP.textContent.length; l++) {
        cashPp += tipPpP.textContent[l]
    }
    for (let l = 1; l < tipToT.textContent.length; l++) {
        cashTo += tipToT.textContent[l]
    }

    changeCash(cashPp, perPerson, tipPpP)
    changeCash(cashTo, total, tipToT)
}





// *************************************************

// Choosing to add or subsctract from the previous 
// Tip amount and Total to get new numbers
// Making this going down/up effect on the screen

// *************************************************

async function changeCash(oldC, newC, element) {
    if (parseFloat(oldC) < parseFloat(newC)) {
        for (let i = parseFloat(oldC); i < parseFloat(newC); i) {
            if (i + 1 < parseFloat(newC)) {
                i = i + 1
            }
            else if (i + 0.1 < parseFloat(newC)) {
                i = i + 0.1
            }
            else {
                i = i + 0.01
            }
            i = parseFloat(i.toFixed(2))
            element.innerHTML = "$" + i.toFixed(2)
            await new Promise(r => setTimeout(r, 35))
        }
        return true
    }
    else {
        for (let i = parseFloat(oldC); i > parseFloat(newC); i) {

            if (i - 1 > parseFloat(newC)) {
                i = i - 1
            }
            else if (i - 0.1 > parseFloat(newC)) {
                i = i - 0.1
            }
            else {
                i = i - 0.01
            }
            i = parseFloat(i.toFixed(2))
            element.innerHTML = "$" + i.toFixed(2)
            await new Promise(r => setTimeout(r, 35))
        }
        return true
    }
}






// *************************************************

// Reseting all styles and input values to default

// *************************************************

function reset() {
    let tipPp = document.getElementById('TipPp')
    tipPp.innerHTML = "$0.00"
    let tipT = document.getElementById('TipT')
    tipT.innerHTML = "$0.00"
    bill_input.value = null
    nOfPeople_input.value = null
    custom_input.value = null

    resetErrors()
    if (last != -1 && last != 5) {
        button_prct[last].classList.remove('precent-clicked')
        last = -1
    }
    else if (last == 5) {
        custom_button.classList.remove('precent-clicked')
        custom_span.classList.remove("custom-hide")
        custom_input.classList.add("custom-hide")
    }
}