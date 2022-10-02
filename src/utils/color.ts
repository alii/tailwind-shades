import colorNamer from 'color-namer';
import {colord} from 'colord';
import {findClosest} from './misc';
import {
	defaultTailwindBrightnessLevelIndexesArray,
	defaultTailwindBrightnessLevels,
	defaultTailwindBrightnessLevelsArray,
	mirroredDefaultTailwindBrightnessLevels,
} from './tailwind';

export type Hex = `#${string}`;

export function getColorName(hex: Hex) {
	const {name} = colorNamer(hex.replace('##', '#'), {
		pick: ['ntc'],
	}).ntc[0];

	return name.replace(/['/]/gi, '').replace(/\s+/g, '-').toLowerCase();
}

export function getTheme(color: Hex) {
	const brightness = colord(color).brightness();

	const closestBrightness = findClosest(
		brightness,
		defaultTailwindBrightnessLevelsArray,
	);

	const brightnessLevel =
		mirroredDefaultTailwindBrightnessLevels[closestBrightness];

	const remainingBrightnessLevels =
		defaultTailwindBrightnessLevelIndexesArray.filter(
			key => key !== brightnessLevel,
		);

	const targetColorBrightness = colord(color).brightness();

	const remainingPalette = remainingBrightnessLevels.reduce((all, level) => {
		const isLighter =
			defaultTailwindBrightnessLevels[
				level as keyof typeof defaultTailwindBrightnessLevels
			] > closestBrightness;

		const v =
			defaultTailwindBrightnessLevels[
				level as keyof typeof defaultTailwindBrightnessLevels
			];

		const targetBrightnessDelta = Math.abs(
			isLighter ? targetColorBrightness + v : targetColorBrightness - v,
		);

		return {
			...all,
			[level]: isLighter
				? (colord(color).lighten(targetBrightnessDelta).toHex() as Hex)
				: (colord(color).darken(targetBrightnessDelta).toHex() as Hex),
		};
	}, {} as Record<string, Hex>);

	const palette: Record<string, Hex> = {
		[brightnessLevel]: color,
		...remainingPalette,
	};

	return {
		palette,
		target: brightnessLevel,
		name: getColorName(palette['500']),
	};
}
