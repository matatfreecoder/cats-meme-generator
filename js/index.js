import { catsData } from './data.js';

const emotionRadios = document.querySelector('#emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

memeModalCloseBtn.addEventListener('click', closeModal);

emotionRadios.addEventListener('change', highlightCheckedOption);

getImageBtn.addEventListener('click', renderCat);

function highlightCheckedOption(event) {
	const radios = document.getElementsByClassName('radio');

	for (let radio of radios) {
		radio.classList.remove('highlight');
	}

	document.getElementById(event.target.id).parentElement.classList.add('highlight');
}

function closeModal() {
	memeModal.style.display = 'none';
}

function renderCat() {
	const catObject = getSingleCatObject();
	memeModalInner.innerHTML = `
<img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
`;
	memeModal.style.display = 'flex';
}

function getSingleCatObject() {
	const catsArray = getMatchingCatsArray();
	if (catsArray.length === 1) {
		return catsArray[0];
	} else {
		const randomNumber = Math.floor(Math.random() * catsArray.length);
		return catsArray[randomNumber];
	}
}

function getMatchingCatsArray() {
	if (document.querySelector('input[type="radio"]:checked')) {
		const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
		const isGif = gifsOnlyOption.checked;

		const matchingCatsArray = catsData.filter(function (cat) {
			if (isGif) {
				return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
			} else {
				return cat.emotionTags.includes(selectedEmotion);
			}
		});
		return matchingCatsArray;
	}
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
