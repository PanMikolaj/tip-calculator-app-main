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

for(let i = 0; i<button_prct.length;i++){
    button_prct[i].addEventListener("click", () =>{
        let prct = parseFloat(button_prct[i].textContent)/100
        if(checkIfValid()){
            let bill = bill_input.value
            let nOfPeople = nOfPeople_input.value
            calculateTotal(bill, nOfPeople, prct)
            if(last != -1){
                button_prct[last].classList.remove('precent-clicked')
            }
            button_prct[i].classList.add('precent-clicked')
            last = i
        }
    })
}

reset_button.addEventListener('click', reset)


// ***********************************************

// Checking if inputs with numbers are not empty 
// or if the numbers are not negative

// ***********************************************

function checkIfValid(){
    let bill = bill_input.value
    let nOfPeople = nOfPeople_input.value
    let valid = true
    if(bill == '' || bill == null || bill<=0){
        valid = false
    }
    if(nOfPeople == '' || nOfPeople == null || nOfPeople<=0){
        valid = false
    }

    if(valid){
        console.log(valid)
        return true
    }
    else{
        return false
    }
}

// NIE TO LICZYSZ JEŁOPIE INNY TOTAL MIAŁ BYĆXDDDDD

function calculateTotal(bill, nOfPeople, precent){
    let perPerson = (bill*precent/nOfPeople).toFixed(2)
    let total = (bill*precent).toFixed(2)
    console.log(perPerson)
    console.log(total)
    setPrices(perPerson, total)
}

function setPrices(perPerson, total){
    let tipPp = document.getElementById('TipPp')
    tipPp.innerHTML = "$" + perPerson
    let tipT = document.getElementById('TipT')
    tipT.innerHTML = "$" + total
}

function reset(){
    let tipPp = document.getElementById('TipPp')
    tipPp.innerHTML = "$0.00"
    let tipT = document.getElementById('TipT')
    tipT.innerHTML = "$0.00"
    bill_input.value = null
    nOfPeople_input.value = null
    if(last!=-1){
        button_prct[last].classList.remove('precent-clicked')
        last = -1
    }
    
}