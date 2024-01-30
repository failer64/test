// Добавление loaded для HTML после полной загрузки страницы
window.addEventListener("load", function () {

	document.documentElement.classList.add('loaded');
	const cards = document.querySelectorAll('.item-main');
	if (cards.length > 0) {
		cards.forEach(card => {
			card.classList.add('active');
		})
	}

	const currencyBlocks = document.querySelectorAll('.block__curency');
	const timeBlocks = document.querySelectorAll('.block__time');
	const priceBlocks = document.querySelectorAll('.block__price');

	const arrCurrency = ['$', '₽', '€'];
	const arrTime = ['Month', 'Day'];

	const priceValues = [];
	priceBlocks.forEach((price) => {
		priceValues.push(price.innerHTML)
	})

	let count = 0;
	let count2 = 0;

	if (currencyBlocks.length > 0) {
		currencyBlocks.forEach(currency => {
			currency.addEventListener('click', onChangeCurrency);
		})
	}

	if (timeBlocks.length > 0) {
		timeBlocks.forEach(time => {
			time.addEventListener('click', onChangeTime);
		})
	}

	function onChangeCurrency() {
		changeCurrency();
		changePrice();
	}

	function onChangeTime() {
		changeTime();
		changePrice();
	}

	function changeTime() {
		count2++;
		timeBlocks.forEach(time => {
			if (count2 > arrTime.length - 1) {
				count2 = 0;
			}
			time.innerHTML = arrTime[count2];
		})
	}

	function changeCurrency() {
		++count;
		currencyBlocks.forEach(currency => {
			if (count > arrCurrency.length - 1) {
				count = 0;
			}
			currency.innerHTML = arrCurrency[count];
		})
	}

	function changePrice() {
		const time = document.querySelector('.block__price').nextElementSibling.innerHTML;
		let quantity = 1;
		if (time == 'Day') {
			quantity = 30;
		}
		priceBlocks.forEach((price, i) => {
			if (count === 0) {
				price.innerHTML = Math.round(priceValues[i] / quantity);
				return;
			}
			if (count === 1) {
				price.innerHTML = Math.round(priceValues[i] * 90 / quantity);
				return;
			}
			if (count === 2) {
				price.innerHTML = Math.round(priceValues[i] * 0.92 / quantity);
				return;
			}
		});
	}

});


