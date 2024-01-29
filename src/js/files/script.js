// Добавление loaded для HTML после полной загрузки страницы
window.addEventListener("load", function () {
	setTimeout(function () {
		document.documentElement.classList.add('loaded');
		const cards = document.querySelectorAll('#card');
		if (cards.length > 0) {
			cards.forEach(card => {
				card.classList.add('active');
			})
		}
	}, 0);
});