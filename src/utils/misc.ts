export type AnyKey = keyof any;

export function mirrorObject<K extends AnyKey, V extends AnyKey>(
	object: Record<K, V>,
) {
	const ret: Partial<Record<V, K>> = {};

	for (const key in object) {
		ret[object[key]] = key;
	}

	return ret as Record<V, K>;
}

export function findClosest(needle: number, haystack: number[]) {
	return haystack.reduce((prev, curr) => {
		return Math.abs(curr - needle) < Math.abs(prev - needle) ? curr : prev;
	}, haystack[0]);
}
