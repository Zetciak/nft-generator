// >> Config
let traitsRarity = {
	Background: {
		Blue: 10,
		Cream: 10,
		Cyan: 10,
		Dusty: 10,
		Gray: 10,
		Lime: 10,
		Mint: 10,
		Pink: 10,
		Purple: 10,
		Yellow: 10,
	},
	Clothes: {
		Clothes1: 10,
		Clothes2: 10,
		Clothes3: 10,
		Clothes4: 10,
		Clothes5: 10,
		Clothes6: 10,
		Clothes7: 10,
		Clothes8: 10,
		Clothes9: 10,
		Clothes10: 10,
	},
	Eyes: {
		Eyes1: 10,
		Eyes2: 10,
		Eyes3: 10,
		Eyes4: 10,
		Eyes5: 10,
		Eyes6: 10,
		Eyes7: 10,
		Eyes8: 10,
		Eyes9: 10,
		Eyes10: 10,
	},
	Genesis: {
		Genesis1: 10,
		Genesis2: 10,
		Genesis3: 10,
		Genesis4: 10,
		Genesis5: 10,
		Genesis6: 10,
		Genesis7: 10,
		Genesis8: 10,
		Genesis9: 10,
		Genesis10: 10,
	},
	Hat: {
		Hat1: 10,
		Hat2: 10,
		Hat3: 10,
		Hat4: 10,
		Hat5: 10,
		Hat6: 10,
		Hat7: 10,
		Hat8: 10,
		Hat9: 10,
		Hat10: 10,
	},
	Mouth: {
		Mouth1: 10,
		Mouth2: 10,
		Mouth3: 10,
		Mouth4: 10,
		Mouth5: 10,
		Mouth6: 10,
		Mouth7: 10,
		Mouth8: 10,
		Mouth9: 10,
		Mouth10: 10,
	},
};
let traitKolejnsc = {
	1: 'Background',
	2: 'Hat',
	3: 'Genesis',
	4: 'Clothes',
	5: 'Eyes',
	6: 'Mouth',
};
let width = 250;
let height = 250;
let supply = 3;

// >> Modules
const fs = require('fs');
const express = require('express');
const mergeImages = require('merge-images');
const { createCanvas, loadImage } = require('canvas');
const { generateKeyPairSync } = require('crypto');
const colors = require('colors');

// >> Imports

// >> Variables
const app = express();
let countGenerating = 0;
let generateStartTime = 0;
let traitsSupplyLeft = [];
let freeNumbers = [];
let generatedNfts = [];
colors.setTheme({
	mainTitle: ['yellow'],
	generalTitle: ['brightYellow'],
	h1: ['yellow'],
	h2: ['white'],
	error: ['red'],
});

// >> Script
// Starting
app.listen(8000, () => {
	process.title = 'NFT Generator by Zetty#0741';
	process.stdout.write('\033c');
	console.clear();
	newLines(2);
	console.log(
		'███    ██ ███████ ████████      ██████  ███████ ███    ██ ███████ ██████   █████  ████████  ██████  ██████  '
			.mainTitle
	);
	console.log(
		'████   ██ ██         ██        ██       ██      ████   ██ ██      ██   ██ ██   ██    ██    ██    ██ ██   ██ '
			.mainTitle
	);
	console.log(
		'██ ██  ██ █████      ██        ██   ███ █████   ██ ██  ██ █████   ██████  ███████    ██    ██    ██ ██████  '
			.mainTitle
	);
	console.log(
		'██  ██ ██ ██         ██        ██    ██ ██      ██  ██ ██ ██      ██   ██ ██   ██    ██    ██    ██ ██   ██ '
			.mainTitle
	);
	console.log(
		'██   ████ ██         ██         ██████  ███████ ██   ████ ███████ ██   ██ ██   ██    ██     ██████  ██   ██ '
			.mainTitle
	);
	console.log('by Zetty#0741'.mainTitle);
	newLines(2);
	console.log('General info:'.generalTitle);
	console.log(`Supply: `.h1 + `${supply}`.h2);
	console.log(`Size: `.h1 + `${width}x${height}px`.h2);
	loadTraits();
});

// Load traits
function loadTraits() {
	let attributes = fs.readdirSync(`./attributes`);
	let countTraits = 0;
	let errorTraits = 0;
	let errorTraitsString = '';
	for (const [i, v] of Object.entries(attributes)) {
		let traits = fs
			.readdirSync(`./attributes/${v}`)
			.filter((file) => file.endsWith('.png'));
		for (const [i2, v2] of Object.entries(traits)) {
			countTraits = countTraits + 1;
			let attributeName = v;
			let traitName = v2.replace('.png', '');
			if (
				traitsRarity[attributeName] &&
				traitsRarity[attributeName][traitName]
			) {
				if (!traitsSupplyLeft[attributeName]) {
					traitsSupplyLeft[attributeName] = [];
				}
				let traitRarity = traitsRarity[attributeName][traitName];
				let traitSupply = Number(
					(supply * (traitRarity / 100)).toFixed(0)
				);
				traitsSupplyLeft[attributeName][traitName] = traitSupply;
			} else {
				errorTraits = errorTraits + 1;
				errorTraitsString = `${errorTraitsString}${countTraits} - ./attributes/${attributeName}/${traitName}.png loading error, rarity not found!\n`;
			}
		}
	}
	console.log(`Traits count: `.h1 + `${countTraits}`.h2);
	console.log(`Success: `.h1 + `${countTraits - errorTraits}`.h2);
	console.log(`Error: `.h1 + `${errorTraits}`.h2);
	if (errorTraits > 0) {
		newLines(1);
		console.log('Errored traits:'.generalTitle);
		console.log(errorTraitsString.error);
	}
	newLines(1);
	console.log(
		`Generating will start in `.h1 +
			`${(generateStartTime / 1000).toFixed(0)} `.h2 +
			`seconds...`.h1
	);
	setTimeout(() => {
		generateNfts();
	}, generateStartTime);
}

// New lines writing
const newLines = (number) => {
	for (let i = 0; i < number; i++) console.log(' ');
};

// New lines writing
function generateNfts() {
	console.log(`${supply} `.h2 + `NFT's generation started...`.h1);

	// Firstly add all numbers into free numbers array
	for (let i = 1; i <= supply; i++) {
		freeNumbers.push(i);
	}

	// Pick random number and generate it
	for (let i = 1; i <= supply; i++) {
		let randomNumber =
			freeNumbers[Math.floor(Math.random() * freeNumbers.length)];
		let getIndex = freeNumbers.indexOf(randomNumber);
		freeNumbers.splice(getIndex, 1);
		generateOneNft(randomNumber);
	}
}

// Generate one nft
function generateOneNft(id) {
	let generatedNftTraits = [];
	for (const [i, v] of Object.entries(traitKolejnsc)) {
		let attributeLength = -1;
		for (const [ai, av] of Object.entries(traitsSupplyLeft[v])) {
			if (av > 0) {
				attributeLength = attributeLength + 1;
			}
		}
		let randNumber = Math.floor(Math.random() * attributeLength);
		let localCount = -1;
		for (const [ai, av] of Object.entries(traitsSupplyLeft[v])) {
			if (av > 0) {
				localCount = localCount + 1;
				if (localCount === randNumber) {
					generatedNftTraits[v] = ai;
					traitsSupplyLeft[v][ai] = traitsSupplyLeft[v][ai] - 1;
				}
			}
		}
	}

	// Check same existing in saving
	if (countGenerating === 0) {
		generatedNfts[id] = generatedNftTraits;
		countGenerating = countGenerating + 1;
	} else {
		let added = false;
		for (const [i, v] of Object.entries(generatedNfts)) {
			if (added === false) {
				if (v === generatedNftTraits) {
					generateOneNft(id);
					console.log(`${id} GEN ERROR, RESTARTING`);
				} else {
					added = true;
					generatedNfts[id] = generatedNftTraits;
					countGenerating = countGenerating + 1;
					console.log(`${id} traits generated`);
				}
			}
		}
	}

	let canvas = createCanvas(width, height);
	let context = canvas.getContext('2d');
	let count = 0;

	for (const [i, v] of Object.entries(generatedNftTraits)) {
		count = count + 1;
		if (count === 6) {
			loadImage(`./attributes/${i}/${v}.png`).then((image) => {
				context.drawImage(image, 0, 0, width, height);
				const buffer = canvas.toBuffer('image/png');
				fs.writeFileSync(`./generated/${id}.png`, buffer);
				console.log(`${id} Generated`);
			});
		} else {
			loadImage(`./attributes/${i}/${v}.png`).then((image) => {
				context.drawImage(image, 0, 0, width, height);
			});
		}
	}

	/*let canvas = createCanvas(width, height);
	let context = canvas.getContext('2d');
	loadImage(`./attributes/Background/Mint.png`).then((image) => {
		context.drawImage(image, 0, 0, width, height);
		const buffer = canvas.toBuffer('image/png');
		fs.writeFileSync(`./generated/${id}_Background_Mint.png`, buffer);
	});*/

	if (countGenerating === supply) {
		generationEnded();
	}
}

// Generation ended, send some info
function generationEnded() {
	newLines(1);
	console.log(`Generation ended!`.h1);
}
