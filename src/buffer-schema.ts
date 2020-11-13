// import {Model} from './model';
// import {Schema} from './schema';
// import type {BufferSchemaDefinition} from './types';
// import {stringToHash} from './utils';

// export class BufferSchema {
//   public static _schemas: Map<string, Schema> = new Map();

//   private static newHash(name: string, _struct: BufferSchemaDefinition) {
//     const hash = stringToHash(JSON.stringify(_struct) + name);
//     if (hash.length !== 4) {
//       throw new Error('Hash has not length of 4');
//     }
//     return `#${hash}`;
//   }

//   public static schema<T extends BufferSchemaDefinition>(name: string, _struct: T): Schema<T> {
//     const id = BufferSchema.newHash(name, _struct);
//     const newSchema = new Schema<T>(id, name, _struct);
//     this._schemas.set(id, newSchema);
//     return newSchema;
//   }

//   public static getIdFromBuffer = (buffer: ArrayBuffer) => {
//     const dataView = new DataView(buffer);
//     let id = '';

//     for (let i = 0; i < 5; i++) {
//       const uInt8 = dataView.getUint8(i);
//       id += String.fromCharCode(uInt8);
//     }

//     return id;
//   };

//   public static getIdFromSchema = <T>(schema: Schema<T>) => schema.id;

//   public static getIdFromModel = <T>(model: Model<T>) => model.schema.id;
// }
