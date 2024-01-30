(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    window.addEventListener("load", (function() {
        document.documentElement.classList.add("loaded");
        const cards = document.querySelectorAll(".item-main");
        if (cards.length > 0) cards.forEach((card => {
            card.classList.add("active");
        }));
        const currencyBlocks = document.querySelectorAll(".block__curency");
        const timeBlocks = document.querySelectorAll(".block__time");
        const priceBlocks = document.querySelectorAll(".block__price");
        const arrCurrency = [ "$", "₽", "€" ];
        const arrTime = [ "Month", "Day" ];
        const priceValues = [];
        priceBlocks.forEach((price => {
            priceValues.push(price.innerHTML);
        }));
        let count = 0;
        let count2 = 0;
        if (currencyBlocks.length > 0) currencyBlocks.forEach((currency => {
            currency.addEventListener("click", onChangeCurrency);
        }));
        if (timeBlocks.length > 0) timeBlocks.forEach((time => {
            time.addEventListener("click", onChangeTime);
        }));
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
            timeBlocks.forEach((time => {
                if (count2 > arrTime.length - 1) count2 = 0;
                time.innerHTML = arrTime[count2];
            }));
        }
        function changeCurrency() {
            ++count;
            currencyBlocks.forEach((currency => {
                if (count > arrCurrency.length - 1) count = 0;
                currency.innerHTML = arrCurrency[count];
            }));
        }
        function changePrice() {
            const time = document.querySelector(".block__price").nextElementSibling.innerHTML;
            let quantity = 1;
            if (time == "Day") quantity = 30;
            priceBlocks.forEach(((price, i) => {
                if (count === 0) {
                    price.innerHTML = Math.round(priceValues[i] / quantity);
                    return;
                }
                if (count === 1) {
                    price.innerHTML = Math.round(priceValues[i] * 90 / quantity);
                    return;
                }
                if (count === 2) {
                    price.innerHTML = Math.round(priceValues[i] * .92 / quantity);
                    return;
                }
            }));
        }
    }));
    isWebp();
    menuInit();
})();