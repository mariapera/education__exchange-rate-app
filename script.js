const amountOne = document.querySelector('.amount-one');
const amountTwo = document.querySelector('.amount-two');
const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const rateInfo = document.querySelector('.rate-info');
const swapBtn = document.querySelector('.swap');

const calculate = () => {
    fetch(`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
    .then(result => result.json())
    .then(data => {
        const currencyTwoValue = currencyTwo.value;
        const rate = data.rates[currencyTwoValue];
        amountTwo.value = (amountOne.value * rate).toFixed(2);
        rateInfo.textContent = `1 ${currencyOne.value} = ${rate.toFixed(4)} ${currencyTwo.value}`;    
    })
    .catch(err => console.log(err))
}

const swapCurrency = () => {
    const oldCurrencyOneValue = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = oldCurrencyOneValue;
    calculate();
}

amountOne.addEventListener('input',calculate);
currencyOne.addEventListener('change',calculate);
currencyTwo.addEventListener('change',calculate);
swapBtn.addEventListener('click', swapCurrency);

calculate();
