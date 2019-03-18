window.addEventListener('load', () => {
	(() => {
		const CONFIG = {
			apiKey: '099715979800997fed902c8c415868c1',
			city: 'Москва'
		};
		const RESULT_COLLECTION = [
			{
				icon: '🙁',
				happiness: [0, 1]
			},
			{
				icon: '😐',
				happiness: [2, 3]
			},
			{
				icon: '😐',
				happiness: [4]
			}
		];

		const handleChangeRadio = (event) => {
			const { value, name } = event.target;

			radioOptionsResult[name] = Number(value);
		};

		const getTemperature = () => {
			const xhr = new XMLHttpRequest();
			const url = `http://api.openweathermap.org/data/2.5/weather?q=${CONFIG.city}&units=metric&appid=${CONFIG.apiKey}`;

			xhr.open('GET', url, false);
			xhr.send();

			return xhr.status !== 200
				? console.error(`${xhr.status} ${xhr.statusText}`)
				: JSON.parse(xhr.responseText).main.temp
		};

		const $name = document.querySelector('.app__input_name');
		const $resultName = document.querySelector('.app__result-name');
		const $icon = document.querySelector('.app__icon');
		const $form = document.querySelector('.app__form');

		const appRadioButtons = document.querySelectorAll('.app__radio-button');
		const radioOptionsResult = {};

		const temperature = getTemperature();
		const fineTemperature = 15;

		appRadioButtons.forEach(radio => radio.addEventListener('change', handleChangeRadio));

		$form.addEventListener('submit', (e) => {
			e.preventDefault();

			const radioOptionsPoints = Object.keys(radioOptionsResult).reduce((result, key) => (
				result + radioOptionsResult[key]
			), 0);
			const temperaturePoints = temperature > fineTemperature ? 1 : 0;
			const totalPoints = radioOptionsPoints + temperaturePoints;
			const currentIcon = RESULT_COLLECTION.find(item => item.happiness.indexOf(totalPoints) !== -1).icon;

			$resultName.innerHTML = $name.value;
			$icon.innerHTML = currentIcon;
		})
	})()
});
