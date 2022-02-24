const button_prct = document.getElementsByClassName('button-prct')
const bill_input = document.getElementById('billek')
const nOfPeople_input = document.getElementById('nOfPeople-input')
const reset_button = document.getElementById('reset-button')
let last = -1




//  ********************************************************
//
// adding click event to every button with precent to choose
//
// *********************************************************

for (let i = 0; i < button_prct.length; i++) {
    button_prct[i].addEventListener("click", () => {
        // let prct = parseFloat(button_prct[i].textContent)/100
        // if(checkIfValid()){
        //     let bill = bill_input.value
        //     let nOfPeople = nOfPeople_input.value
        //     calculateTotal(bill, nOfPeople, prct)
        //     if(last != -1){
        //         button_prct[last].classList.remove('precent-clicked')
        //     }
        //     button_prct[i].classList.add('precent-clicked')
        //     last = i
        // }
        if (last != -1) {
            button_prct[last].classList.remove('precent-clicked')
        }
        button_prct[i].classList.add('precent-clicked')
        last = i
        checkIfValid()


    })
}

reset_button.addEventListener('click', reset)


// ***********************************************

// Checking if inputs with numbers are not empty 
// or if the numbers are not negative

// ***********************************************

function checkIfValid() {
    let bill = bill_input.value
    let nOfPeople = nOfPeople_input.value
    let valid = true
    if (bill == '' || bill == null || bill <= 0) {
        valid = false
    }
    if (nOfPeople == '' || nOfPeople == null || nOfPeople <= 0) {
        valid = false
    }

    if (valid) {
        console.log(valid)
        calculateTotal()
    }
    else {
        console.log("Nie działa sadge")
    }
}

// NIE TO LICZYSZ JEŁOPIE INNY TOTAL MIAŁ BYĆXDDDDD

function calculateTotal() {
    let precent = 0
    if (last != -1) {
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

function setPrices(perPerson, total) {
    let tipPpP = document.getElementById('TipPp')
    let tipToT = document.getElementById('TipT')
    changeCash(tipPpP.textContent,perPerson,tipPpP)
    let cashPp = ""
    let cashTo = ""
    for(let l = 1;l<tipPpP.textContent.length;l++){
        cashPp += tipPpP.textContent[l]
    }
    for(let l = 1;l<tipToT.textContent.length;l++){
        cashTo += tipToT.textContent[l]
    }
    changeCash(cashPp,perPerson,tipPpP)
    changeCash(cashTo,total,tipToT)
}

async function changeCash(oldC, newC, element){
    if(parseFloat(oldC)<parseFloat(newC)){
        for(let i = parseFloat(oldC); i<parseFloat(newC);i){
            if(i+1<parseFloat(newC)){
                i = i+1
            }
            else if(i+0.1<parseFloat(newC)){
                i = i + 0.1
            }
            else{
                i = i + 0.01
            }
            i = parseFloat(i.toFixed(2))
            element.innerHTML = "$" + i.toFixed(2)
            await new Promise(r => setTimeout(r, 35))
        }
    }
    else{
        for(let i = parseFloat(oldC); i>parseFloat(newC);i){
            
            if(i-1>parseFloat(newC)){
                i = i-1
            }
            else if(i-0.1>parseFloat(newC)){
                i = i - 0.1
            }
            else{
                i = i-0.01
            }
            i = parseFloat(i.toFixed(2))
            element.innerHTML = "$" + i.toFixed(2)
            await new Promise(r => setTimeout(r, 35))
        }
    }
}

function reset() {
    let tipPp = document.getElementById('TipPp')
    tipPp.innerHTML = "$0.00"
    let tipT = document.getElementById('TipT')
    tipT.innerHTML = "$0.00"
    bill_input.value = null
    nOfPeople_input.value = null
    if (last != -1) {
        button_prct[last].classList.remove('precent-clicked')
        last = -1
    }
}