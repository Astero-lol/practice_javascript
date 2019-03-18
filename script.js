window.onload = () => {
	const Name = document.querySelector('.personName');
	const Icon = document.querySelector('.icon');
	class Person {
		constructor(name) {
			this.name = name;
			this.happiness = 0;
		}
		hasCat() {
			return this.happiness++;
		}
		hasRest() {
			return this.happiness++;
		}
		hasMoney() {
			return this.happiness++;
		}
		isSunny() {
			const APIKey = '099715979800997fed902c8c415868c1';
			const city = 'Москва';
			const url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIKey;

			let xhr = new XMLHttpRequest();

			xhr.open('GET', url, false);

			xhr.send();

			if(xhr.status != 200) {
				console.log(xhr.status + ' '+ xhr.statusText);
			} else {
				let DATA = JSON.parse(xhr.responseText);
				if(DATA.main.temp - 273 > 15) {
					this.happiness++;
				}
				return this.happiness;
			}
		}
	}

	const form = document.forms[0];
	form.onsubmit = (e) => {
		e.preventDefault();
		const name = form.elements.name.value;
		const cat = form.elements.cat.value;
		const rest = form.elements.rest.value;
		const money = form.elements.money.value;
		const Man = new Person(name);
		if(cat === 'yes') {
			Man.hasCat();
		}
		if(rest === 'yes') {
			Man.hasRest();
		}
		if(money === 'yes') {
			Man.hasMoney();
		}
		Man.isSunny();
		Name.innerHTML = name;
		if(Man.happiness == 4) {
			Icon.innerHTML = '😆';
		} else if(Man.happiness == 3 || Man.happiness == 2) {
			Icon.innerHTML = '😐';
		} else {
			Icon.innerHTML = '☹️';
		}
	}
}