// var property

import {SchemaDefinition} from './types';
import {stringToHash} from './utils';

export class Schema<T = any> {
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
