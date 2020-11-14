import {SchemaDefinition} from './types';
import {stringToHash} from './utils';

export class Schema<T = Record<string, any>> {
  private static _schemas: Map<string, Schema> = new Map();
  public startsAt?: number;
  private _bytes: number = 0;
  private _id: string;
  private _name: string;
  private _struct: SchemaDefinition<T>;

  public constructor(name: string, struct: SchemaDefinition<T>) {
    this._name = name;
    this._struct = struct;
    this._id = Schema.newHash(name, struct);
    // Schema.Validation(_struct);
    this.calcBytes();
    Schema._schemas.set(this._id, this);
  }

  public static getInstanceById(id: string): Schema | undefined {
    return this._schemas.get(id);
  }

  // public static Validation(struct: Object) {
  //   // do all the validation here (as static me)
  // }

  private static newHash<T>(name: string, struct: SchemaDefinition<T>) {
    const hash = stringToHash(JSON.stringify(struct) + name);
    if (hash.length !== 4) {
      throw new Error('Hash has not length of 4');
    }
    return `#${hash}`;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get struct(): SchemaDefinition<T> {
    return this._struct;
  }

  public get bytes(): number {
    return this._bytes;
  }

  public deserialize(view: DataView, bytesRef: {bytes: number}): any {
    let data = {};
    let bytes = bytesRef.bytes;

    for (const key in this._struct) {
      if (!Object.prototype.hasOwnProperty.call(this._struct, key)) {
        continue;
      }
      const prop = this._struct[key];
      console.log('prop:', prop);

      // Handle specialTypes (e.g. x: {type: int16, digits: 2})
      let specialTypes;
      if (prop?.type?._type && prop?.type?._bytes) {
        specialTypes = prop;
        prop._type = prop.type._type;
        prop._bytes = prop.type._bytes;
      }

      if (prop?._type && prop?._bytes) {
        const _type = prop._type;
        const _bytes = prop._bytes;
        let value;

        if (_type === 'String8') {
          value = '';
          const length = prop.length || 12;
          for (let i = 0; i < length; i++) {
            const char = String.fromCharCode(view.getUint8(bytes));
            value += char;
            bytes++;
          }
        }
        if (_type === 'String16') {
          value = '';
          const length = prop.length || 12;
          for (let i = 0; i < length; i++) {
            const char = String.fromCharCode(view.getUint16(bytes));
            value += char;
            bytes += 2;
          }
        }
        if (_type === 'Int8Array') {
          value = view.getInt8(bytes);
          bytes += _bytes;
        }
        if (_type === 'Uint8Array') {
          value = view.getUint8(bytes);
          bytes += _bytes;
        }
        if (_type === 'Int16Array') {
          value = view.getInt16(bytes);
          bytes += _bytes;
        }
        if (_type === 'Uint16Array') {
          value = view.getUint16(bytes);
          bytes += _bytes;
        }
        if (_type === 'Int32Array') {
          value = view.getInt32(bytes);
          bytes += _bytes;
        }
        if (_type === 'Uint32Array') {
          value = view.getUint32(bytes);
          bytes += _bytes;
        }
        if (_type === 'BigInt64Array') {
          value = parseInt(view.getBigInt64(bytes).toString());
          bytes += _bytes;
        }
        if (_type === 'BigUint64Array') {
          value = parseInt(view.getBigUint64(bytes).toString());
          bytes += _bytes;
        }
        if (_type === 'Float32Array') {
          value = view.getFloat32(bytes);
          bytes += _bytes;
        }
        if (_type === 'Float64Array') {
          value = view.getFloat64(bytes);
          bytes += _bytes;
        }

        // apply special types options
        if (typeof value === 'number' && specialTypes?.digits) {
          value *= Math.pow(10, -specialTypes.digits);
          value = parseFloat(value.toFixed(specialTypes.digits));
        }

        data = {...data, [key]: value};
      }
    }

    bytesRef.bytes = bytes;

    return data;
  }

  private calcBytes() {
    const iterate = (obj: Record<any, any>) => {
      for (const property in obj) {
        const type = obj?._type || obj?.type?._type;
        const bytes = obj._bytes || obj.type?._bytes;

        if (!type && Object.prototype.hasOwnProperty.call(obj, property)) {
          if (typeof obj[property] === 'object') {
            iterate(obj[property]);
          }
        } else {
          if (property !== '_type' && property !== 'type') {
            return;
          }
          if (!bytes) {
            return;
          }

          // we multiply the bytes by the String8 / String16 length.
          if (type === 'String8' || type === 'String16') {
            const length = obj.length || 12;
            this._bytes += bytes * length;
          } else {
            this._bytes += bytes;
          }
        }
      }
    };
    iterate(this._struct);
  }
}
