import {colord} from 'colord';
import tailwindColors from 'tailwindcss/colors';
import {mirrorObject as mirror} from './misc';

export function calculateAverageDefaultTailwindBrightnessLevels() {
	const map = new Map<string, number[]>();

	for (const _value of Object.values(tailwindColors)) {
		const value = _value as typeof tailwindColors[keyof typeof tailwindColors];

		if (typeof value === 'string') {
			continue;
		}

		for (const [level, hex] of Object.entries(value)) {
			const brightness = colord(hex).brightness();
			const existing = map.get(level) ?? [];

			map.set(level, [...existing, brightness]);
		}
	}

	const result = [...map.keys()].reduce((acc, level) => {
		return {
			...acc,
			[level]: 0,
		};
	}, {} as Record<string, number>);

	for (const [level, values] of map) {
		const average =
			values.reduce((acc, value) => acc + value, 0) / values.length;

		result[level] = parseFloat(average.toPrecision(5));
	}

	return result;
}

// Calculated with the function above
// but hardcoded here for performance
export const defaultTailwindBrightnessLevels = {
	'50': 0.97259,
	'100': 0.94148,
	'200': 0.88,
	'300': 0.78889,
	'400': 0.64333,
	'500': 0.50259,
	'600': 0.39,
	'700': 0.30815,
	'800': 0.23778,
	'900': 0.19037,
};

export const mirroredDefaultTailwindBrightnessLevels = mirror(
	defaultTailwindBrightnessLevels,
);

export const defaultTailwindBrightnessLevelsArray = Object.values(
	defaultTailwindBrightnessLevels,
);

export const defaultTailwindBrightnessLevelIndexesArray = Object.keys(
	defaultTailwindBrightnessLevels,
);
