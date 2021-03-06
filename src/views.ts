import type {TypedArrayView} from './types';

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays

/** -128 to 127 (1 byte) */
export const int8: TypedArrayView = {_type: 'Int8Array', _bytes: 1};
/** 0 to 255 (1 byte) */
export const uint8: TypedArrayView = {_type: 'Uint8Array', _bytes: 1};

/** -32768 to 32767 (2 bytes) */
export const int16: TypedArrayView = {_type: 'Int16Array', _bytes: 2};
/** 0 to 65535 (2 bytes) */
export const uint16: TypedArrayView = {_type: 'Uint16Array', _bytes: 2};

/** -2147483648 to 2147483647 (4 bytes) */
export const int32: TypedArrayView = {_type: 'Int32Array', _bytes: 4};
/** 0 to 4294967295 (4 bytes) */
export const uint32: TypedArrayView = {_type: 'Uint32Array', _bytes: 4};

/** -2^63 to 2^63-1 (8 bytes) */
export const int64: TypedArrayView = {_type: 'BigInt64Array', _bytes: 8};
/** 0 to 2^64-1 (8 bytes) */
export const uint64: TypedArrayView = {_type: 'BigUint64Array', _bytes: 8};

/** 1.2×10-38 to 3.4×1038 (7 significant digits e.g., 1.123456) (4 bytes) */
export const float32: TypedArrayView = {_type: 'Float32Array', _bytes: 4};

/** 5.0×10-324 to 1.8×10308 (16 significant digits e.g., 1.123...15) (8 bytes) */
export const float64: TypedArrayView = {_type: 'Float64Array', _bytes: 8};

/** 1 byte per character */
export const string8: TypedArrayView = {_type: 'String8', _bytes: 1};
/** 2 bytes per character */
export const string16: TypedArrayView = {_type: 'String16', _bytes: 2};
