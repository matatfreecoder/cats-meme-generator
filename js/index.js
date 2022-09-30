import { catsData } from './data.js';

const emotionRadios = document.querySelector('#emotion-radios');

emotionRadios.addEventListener('change', highlightCheckedOption);

function highlightCheckedOption(event) {
	document.getElementById(event.target.id).parentElement.classList.add('highlight');
	console.log(event.target.id);
}

function getEmotionsArray(cats) {
	const emotionsArray = [];

	for (let cat of cats) {
		for (let emotion of cat.emotionTags) {
			if (emotionsArray.includes(emotion) != true) {
				emotionsArray.push(emotion);
			}
		}
	}
	return emotionsArray;
}

function renderEmotionsRadios(cats) {
	let radioItem = '';
	const emotions = getEmotionsArray(cats);
	for (let emotion of emotions) {
		radioItem += `<div class='radio'>
		<label for='${emotion}'>${emotion}</label>
		<input type='radio' id='${emotion}' value='${emotion}' name='emotions'>
	
		</div>`;
	}
	emotionRadios.innerHTML = radioItem;
}

renderEmotionsRadios(catsData);

/*
 document.getElementById(e.target.id).parentElement.style.backgroundColor
  document.getElementById(e.target.id).parentElement.classList.add('read')
    document.getElementById(e.target.id).parentElement.classList.remove('unread')
 */
