// >> Config
let traitsRarity = {
	Background: {
		1: 20,
		2: 20,
		3: 20,
		4: 20,
		5: 20,
	},

	Body: {
		Brown: 20,
		Gold: 20,
		test1: 20,
		test2: 20,
		test3: 20,
	},

	Clothes: {
		Adidas: 50,
		Argentina: 50,
	},

	Eyes: {
		Blink: 50,
		Closed: 50,
	},

	Head: {
		Adidas: 50,
		'Brown Tail': 50,
	},

	Mouth: {
		Grass: 20,
		Happy: 20,
		Normal: 20,
		Tongue: 20,
		Toothpick: 20,
	},
};

let jedenJeden = {
	Zetciak: {
		Background: 'Dark gray',
		Body: 'Thicc',
		Clothes: 'Gray shirt',
		Eyes: 'Sexy eyes',
		Head: 'Curly hair',
		Mouth: 'Shut up',
	},
};

let traitOrder = {
	1: 'Background',
	2: 'Body',
	3: 'Clothes',
	4: 'Eyes',
	5: 'Head',
	6: 'Mouth',
};

let numTraits = 6;
let width = 1500;
let height = 1500;
let supply = 30;
let newGenerationAdd = 0;
let collectionName = 'COLLECTION NAME';
let collectionDescription = 'COLLECTION DESC';
let jsonExt = '';

// >> Modules
const fs = require('fs');
const express = require('express');
const colors = require('colors');
const { createCanvas, loadImage } = require('canvas');
var rimraf = require('rimraf');

// >> Variables
const app = express();
colors.setTheme({
	mainTitle: ['yellow'],
	generalTitle: ['brightYellow'],
	h1: ['yellow'],
	h2: ['white'],
	error: ['red'],
});

let traitsSupplyLeft = [];
let freeNumbers = [];
let generatedMetadata = [];
let generatedMetadataOneOOnes = [];
let oneoneinfo = [];
let generatedMetadataCorrect = [];
let errorTimes = [];

// >> Script
// Starting
app.listen(8000, () => {
	process.title = 'NFT Generator by https://t.me/zetciak';
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
	console.log('by @Zetciak'.mainTitle);
	newLines(2);
	console.log('General info:'.generalTitle);
	console.log(`Supply: `.h1 + `${supply}`.h2);
	console.log(`Size: `.h1 + `${width}x${height}px`.h2);
	loadTraits();
});

// Load traits
function loadTraits() {
	newLines(2);
	console.log('Loading traits...'.generalTitle);
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
				console.log(
					`${attributeName}/${traitName}`.h1 + `: ${traitSupply}`.h2
				);
			} else {
				errorTraits = errorTraits + 1;
				errorTraitsString = `${errorTraitsString}${countTraits} - ./attributes/${attributeName}/${traitName}.png loading error, rarity not found!\n`;
			}
		}
	}
	newLines(2);
	console.log('Traits info:'.generalTitle);
	console.log(`Traits count: `.h1 + `${countTraits}`.h2);
	console.log(`Success: `.h1 + `${countTraits - errorTraits}`.h2);
	console.log(`Error: `.h1 + `${errorTraits}`.h2);
	if (errorTraits > 0) {
		newLines(1);
		console.log('Errored traits:'.generalTitle);
		console.log(errorTraitsString.error);
	}
	generateMetadata();
}

// Load traits
function generateMetadata() {
	newLines(2);
	console.log('restarting files...'.generalTitle);

	if (fs.existsSync(`./generation`)) {
		rimraf.sync('./generation');
	}

	if (fs.existsSync(`./generation`)) {
	} else {
		fs.mkdirSync('./generation/metadata', { recursive: true });
	}

	newLines(2);
	console.log("generating 1o1's...".generalTitle);

	let oneOnesLength = 0;
	for (const [i, v] of Object.entries(jedenJeden)) {
		oneOnesLength = oneOnesLength + 1;
	}

	for (let i = 0; i <= oneOnesLength; i++) {
		let randNumber = Math.floor(Math.random() * supply);
		let localCount = 0;

		for (const [ijj, vjj] of Object.entries(jedenJeden)) {
			localCount = localCount + 1;
			if (localCount === i) {
				oneoneinfo[ijj] = randNumber;
				generatedMetadataOneOOnes[randNumber] = vjj;
				generateOneOneMeta(randNumber);
				fs.copyFile(
					`./1o1s/${ijj}.png`,
					`./generation/${randNumber}.png`,
					(err) => {}
				);
			}
		}
	}

	newLines(2);
	console.log('Generating metadata...'.generalTitle);

	// Firstly add all numbers into free numbers array
	for (let i = 1; i <= supply; i++) {
		freeNumbers.push(i);
	}

	// Generate #1
	let randomNumber = freeNumbers[0];
	let getIndex = freeNumbers.indexOf(randomNumber);
	freeNumbers.splice(getIndex, 1);
	generateOneMetadata(randomNumber);
}

function generateOneMetadata(randomNumber) {
	let generatedNftTraits = [];
	for (const [i, v] of Object.entries(traitOrder)) {
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
	let added = true;
	if (randomNumber === 1) {
		generatedMetadata[randomNumber] = generatedNftTraits;
	} else {
		for (const [i, v] of Object.entries(generatedMetadata)) {
			let same = true;
			for (const [traitNumber, traitNameAttribute] of Object.entries(
				traitOrder
			)) {
				if (
					v[traitNameAttribute] !==
					generatedNftTraits[traitNameAttribute]
				) {
					same = false;
				}
			}

			if (same === true) {
				added = false;
			}
		}
	}

	if (added === false) {
		if (errorTimes[randomNumber]) {
			errorTimes[randomNumber] = errorTimes[randomNumber] + 1;
		} else {
			errorTimes[randomNumber] = 1;
		}
		if (errorTimes[randomNumber] <= 5) {
			for (const [is, vs] of Object.entries(generatedNftTraits)) {
				traitsSupplyLeft[is][vs] = traitsSupplyLeft[is][vs] + 1;
			}
			console.log(`ERROR ERROR ${randomNumber}`.h2 + ` ERROR ERROR`.h1);
			generateOneMetadata(randomNumber);
		} else {
			for (const [is, vs] of Object.entries(generatedNftTraits)) {
				traitsSupplyLeft[is][vs] = traitsSupplyLeft[is][vs] + 1;
			}
			console.log(`BIG ERROR ${randomNumber}`.h2 + ` BIG ERROR`.h1);
			addEachRandomTraits();
			generateOneMetadata(randomNumber);
		}
	} else {
		generatedMetadata[randomNumber] = generatedNftTraits;
		console.log(`${randomNumber}`.h2 + ` traits generated`.h1);

		// Generate next metadata
		let newRandomNumber =
			freeNumbers[Math.floor(Math.random() * freeNumbers.length)];
		if (newRandomNumber) {
			let getIndex = freeNumbers.indexOf(newRandomNumber);
			freeNumbers.splice(getIndex, 1);
			generateOneMetadata(newRandomNumber);
		} else {
			generatePictures();
		}
	}
}

async function addEachRandomTraits() {
	for (const [i, v] of Object.entries(traitOrder)) {
		let maxCountInThatTrait = Object.keys(traitsRarity[v]).length;
		let randomNumber = Math.floor(Math.random() * maxCountInThatTrait);
		let count = 0;

		//add trait to free supply
		for (const [traitI, traitV] of Object.entries(traitsRarity[v])) {
			count = count + 1;
			if (count === randomNumber) {
				traitsSupplyLeft[v][traitI] = traitsSupplyLeft[v][traitI] + 1;
			}
		}
	}
}

function generatePictures() {
	newLines(2);
	console.log('Generating arts:'.generalTitle);

	freeNumbers = [];

	// Firstly add all numbers into free numbers array
	for (let i = 1; i <= supply; i++) {
		freeNumbers.push(i);
	}

	// Delete add without 6 traits
	for (const [i, v] of Object.entries(generatedMetadata)) {
		let count = 0;
		for (const [ii, vv] of Object.entries(v)) {
			count = count + 1;
		}
		if (count === numTraits) {
			generatedMetadataCorrect[i] = generatedMetadata[i];
		} else {
			console.log(`${i} error, generating neeeew lol`);
			let localdata = generatedMetadata[i];
			generatedMetadata[i] = [];
			for (const [traitNumber, traitNameAttribute] of Object.entries(
				traitOrder
			)) {
				if (localdata[traitNameAttribute]) {
				} else {
					let maxCountInThatTrait = Object.keys(
						traitsRarity[traitNameAttribute]
					).length;

					let randomNumber = Math.floor(
						Math.random() * maxCountInThatTrait
					);
					let count = 0;

					//add trait to free supply
					for (const [traitI, traitV] of Object.entries(
						traitsRarity[traitNameAttribute]
					)) {
						count = count + 1;
						if (count === randomNumber) {
							localdata[traitNameAttribute] = traitI;

							for (const [
								traitNumber,
								traitNameAttribute,
							] of Object.entries(traitOrder)) {
								generatedMetadata[i][traitNameAttribute] =
									localdata[traitNameAttribute];
							}

							generatedMetadataCorrect[i] = generatedMetadata[i];
						}
					}
				}
			}
		}
	}

	// Generate #1
	let randomNumber = freeNumbers[0];
	let getIndex = freeNumbers.indexOf(randomNumber);
	freeNumbers.splice(getIndex, 1);
	generateOnePicture(randomNumber);
}

function generateOnePicture(randomNumber) {
	if (generatedMetadataCorrect[randomNumber]) {
		if (fs.existsSync(`./generation/${randomNumber}.png`)) {
			// Generate new
			console.log(`!! ${randomNumber}`.h2 + ` IS 1O1 !!`.h1);
			let newRandomNumber =
				freeNumbers[Math.floor(Math.random() * freeNumbers.length)];
			if (newRandomNumber) {
				let getIndex = freeNumbers.indexOf(newRandomNumber);
				freeNumbers.splice(getIndex, 1);
				generateOnePicture(newRandomNumber);
			} else {
				generationEnded();
			}
		} else {
			let metadata = '{\n  "attributes": [\n';
			let canvas = createCanvas(width, height);
			let context = canvas.getContext('2d');
			let count = 0;
			let skin = '';

			for (const [i, v] of Object.entries(
				generatedMetadataCorrect[randomNumber]
			)) {
				count = count + 1;
				if (count === numTraits) {
					metadata = `${metadata}    {\n      "trait_type": "${i}",\n      "value": "${v}"\n    }\n`;
					metadata = `${metadata}  ],\n  "description": "${collectionDescription}",\n`;
					metadata = `${metadata}  "external_url": "https://example.com/?token_id=${
						Number(randomNumber) + Number(newGenerationAdd)
					}",\n`;
					metadata = `${metadata}  "image": "ipfs://bafybeihgcghtl2b6ffv3sy7zfppj7goiphifxmoek4opgh3o4lbamk4lvm/images/${
						Number(randomNumber) + Number(newGenerationAdd)
					}.png",\n`;
					metadata = `${metadata}  "name": "${collectionName} #${
						Number(randomNumber) + Number(newGenerationAdd)
					}"\n}`;
					loadImage(`./attributes/${i}/${v}.png`).then((image) => {
						context.drawImage(image, 0, 0, width, height);
						const buffer = canvas.toBuffer('image/png');

						//image
						fs.writeFileSync(
							`./generation/${
								Number(randomNumber) + Number(newGenerationAdd)
							}.png`,
							buffer
						);

						//metadata
						fs.writeFileSync(
							`./generation/metadata/${
								Number(randomNumber) + Number(newGenerationAdd)
							}${jsonExt}`,
							metadata
						);
						console.log(
							`${Number(randomNumber) + Number(newGenerationAdd)}`
								.h2 + ` image & metadata generated`.h1
						);

						// Generate new
						let newRandomNumber =
							freeNumbers[
								Math.floor(Math.random() * freeNumbers.length)
							];
						if (newRandomNumber) {
							let getIndex = freeNumbers.indexOf(newRandomNumber);
							freeNumbers.splice(getIndex, 1);
							generateOnePicture(newRandomNumber);
						} else {
							generationEnded();
						}
					});
				} else {
					metadata = `${metadata}    {\n      "trait_type": "${i}",\n      "value": "${v}"\n    },\n`;
					loadImage(`./attributes/${i}/${v}.png`).then((image) => {
						context.drawImage(image, 0, 0, width, height);
					});
				}
			}
		}
	} else {
		// Generate new
		console.log(`!! ${randomNumber}`.h2 + ` image generation error !!`.h1);
		let newRandomNumber =
			freeNumbers[Math.floor(Math.random() * freeNumbers.length)];
		if (newRandomNumber) {
			let getIndex = freeNumbers.indexOf(newRandomNumber);
			freeNumbers.splice(getIndex, 1);
			generateOnePicture(newRandomNumber);
		} else {
			generationEnded();
		}
	}
}

function generateOneOneMeta(randomNumber) {
	let metadata = '{\n  "attributes": [\n';
	let count = 0;

	for (const [i, v] of Object.entries(
		generatedMetadataOneOOnes[randomNumber]
	)) {
		count = count + 1;
		if (count === numTraits) {
			metadata = `${metadata}    {\n      "trait_type": "${i}",\n      "value": "${v}"\n    }\n`;
			metadata = `${metadata}  ],\n  "description": "${collectionDescription}",\n`;
			metadata = `${metadata}  "external_url": "https://example.com/?token_id=${
				Number(randomNumber) + Number(newGenerationAdd)
			}",\n`;
			metadata = `${metadata}  "image": "ipfs://bafybeihgcghtl2b6ffv3sy7zfppj7goiphifxmoek4opgh3o4lbamk4lvm/images/${
				Number(randomNumber) + Number(newGenerationAdd)
			}.png",\n`;
			metadata = `${metadata}  "name": "${collectionName} #${
				Number(randomNumber) + Number(newGenerationAdd)
			}"\n}`;

			//metadata
			fs.writeFileSync(
				`./generation/metadata/${
					Number(randomNumber) + Number(newGenerationAdd)
				}${jsonExt}`,
				metadata
			);
			console.log(
				`${Number(randomNumber) + Number(newGenerationAdd)}`.h2 +
					` image & metadata generated`.h1
			);
		} else if (count === 3) {
			metadata = `${metadata}    {\n      "trait_type": "${i}",\n      "value": "${v}"\n    },\n`;
		} else if (count === 1) {
			metadata = `${metadata}    {\n      "trait_type": "${i}",\n      "value": "${v}"\n    },\n`;
		} else {
			metadata = `${metadata}    {\n      "trait_type": "${i}",\n      "value": "${v}"\n    },\n`;
		}
	}
}

function generationEnded() {
	newLines(2);
	console.log('Generating ended!'.generalTitle);

	for (const [i, v] of Object.entries(oneoneinfo)) {
		console.log(`${i}: ${v}`);
	}
}

// New lines writing
const newLines = (number) => {
	for (let i = 0; i < number; i++) console.log(' ');
};
