import type {Schema} from './schema';

/**
 * Defines a TypedArray.
 */
export type TypedArrayView = {
  _type: string;
  _bytes: number;
};

/**
 * Specify the TypedArray and the number of digits to truncate.
 */
export type TypedArrayDefinition = {
  type: TypedArrayView;
  digits?: number;
  length?: number;
};

/**
 * A TypedArray, TypedArrayDefinition, or Schema.
 */
export type TypedArrayOrSchema = TypedArrayView | TypedArrayDefinition | [Schema];

/**
 * Defines a BufferSchema.
 */
export type BufferSchemaDefinition = Record<string, TypedArrayOrSchema>;


export type AllowableSchemaObject<T> = {

}
