import { adjustHue, parseToHsla } from 'color2k';

export async function pickSpectrum(spectrum, color, colorCount) {
	function tintsArray(clr, count) {
		let i = 0;
		let returnArray = [];
		const hslaArray = parseToHsla(clr);
		const tintStep = (1 - hslaArray[2]) / count;
		while (i < count) {
			returnArray.push(`hsla(${hslaArray[0]}, ${hslaArray[1] * 100}%, ${(hslaArray[2] + tintStep * i) * 100}%, ${hslaArray[3]})`);
			i++;
		}
		return returnArray;
	}
	function shadesArray(clr, count) {
		let i = 0;
		let returnArray = [];
		const hslaArray = parseToHsla(clr);
		const tintStep = hslaArray[2] / count;
		while (i < count) {
			returnArray.push(`hsla(${hslaArray[0]}, ${hslaArray[1] * 100}%, ${(hslaArray[2] - tintStep * i) * 100}%, ${hslaArray[3]})`);
			i++;
		}
		return returnArray;
	}
	function tonesArray(clr, count) {
		let i = 0;
		let returnArray = [];
		const hslaArray = parseToHsla(clr);
		const tintStep = hslaArray[1] / count;
		while (i < count) {
			returnArray.push(`hsla(${hslaArray[0]}, ${(hslaArray[1] - tintStep * i) * 100}%, ${hslaArray[2] * 100}%, ${hslaArray[3]})`);
			i++;
		}
		return returnArray;
	}
	function contrastArray(clr, count) {
		return [clr, '#ffffff', '#000000'];
	}
	function complementaryArray(clr, count) {
		return [clr, adjustHue(clr, 180)];
	}
	function splitComplementaryArray(clr, count) {
		return [clr, adjustHue(clr, 150), adjustHue(clr, 210)];
	}
	function analogousArray(clr, count) {
		return [clr, adjustHue(clr, 330), adjustHue(clr, 30)];
	}
	function triadicArray(clr, count) {
		return [clr, adjustHue(clr, 120), adjustHue(clr, 240)];
	}
	function tetradicArray(clr, count) {
		return [clr, adjustHue(clr, 60), adjustHue(clr, 180), adjustHue(clr, 240)];
	}
	function squareArray(clr, count) {
		return [clr, adjustHue(clr, 90), adjustHue(clr, 180), adjustHue(clr, 270)];
	}

	if(spectrum === 'tints'){
		return tintsArray(color, colorCount)
	}
	if(spectrum === 'shades'){
		return shadesArray(color, colorCount)
	}
	if(spectrum === 'tones'){
		return tonesArray(color, colorCount)
	}
	if(spectrum === 'contrast'){
		return contrastArray(color, colorCount)
	}
	if(spectrum === 'complementary'){
		return complementaryArray(color, colorCount)
	}
	if(spectrum === 'splitComplementary'){
		return splitComplementaryArray(color, colorCount)
	}
	if(spectrum === 'analogous'){
		return analogousArray(color, colorCount)
	}
	if(spectrum === 'triadic'){
		return triadicArray(color, colorCount)
	}
	if(spectrum === 'tetradic'){
		return tetradicArray(color, colorCount)
	}
	if(spectrum === 'square'){
		return squareArray(color, colorCount)
	}
	console.error(`Spectrum of "${spectrum}" is not defined`)
	return []

	// return await eval(`${spectrum}Array('${color}', ${colorCount})`);
}
