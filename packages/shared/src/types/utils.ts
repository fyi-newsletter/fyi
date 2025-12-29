// Helper type to count recursion depth
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Main DeepOmit type with recursion depth limit
export type DeepOmit<
	T,
	K extends string | number | symbol,
	D extends number = 10
> = [D] extends [0] // stop recursion at depth 0
	? T
	: T extends any[]
	? DeepOmitArray<T, K, Prev[D]>
	: T extends object
	? { [P in keyof T as P extends K ? never : P]: DeepOmit<T[P], K, Prev[D]> }
	: T;

type DeepOmitArray<T extends any[], K extends string | number | symbol, D extends number> = {
	[P in keyof T]: DeepOmit<T[P], K, D>
};

// Base type to omit common fields
export type OmitBase<T> = Omit<T, 'uuid' | 'createdAt' | 'updatedAt'>;
export type DeepOmitBase<T> = DeepOmit<T, 'uuid' | 'createdAt' | 'updatedAt'>;
