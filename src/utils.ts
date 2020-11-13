/**
 * Implementation of `lodash.set`.
 * @param obj
 * @param path
 * @param value
 */
export function set(
  obj: Record<any, any>,
  path: (string | number)[] | string,
  value: any
): Record<any, any> {
  if (Object(obj) !== obj) {
    return obj; // When obj is not an object
  }
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }

  let curObj = obj; // Hold reference to the current nested object
  for (let i = 0; i < path.length - 1; i++) {
    const curPath = path[i];
    // Does the key exist and is its value an object?
    if (Object(curObj[curPath]) !== curObj[curPath]) {
      // No: create the key. Is the next key a potential array-index?
      curObj[curPath] =
        Math.abs(path[i + 1] as number) >> 0 === +path[i + 1]
          ? [] // Yes: assign a new array object
          : {}; // No: assign a new plain object
    }
    curObj = curObj[curPath];
  }
  curObj[path[path.length - 1]] = value; // Finally assign the value to the last key

  return obj; // Return the top-level object to allow chaining
}

/**
 * Convert a string to a hash.
 * See: https://stackoverflow.com/a/7616484/12656855
 * @param s
 */
export function stringToHash(s: string): string {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  hash *= 254785; // times a random number
  return Math.abs(hash).toString(32).slice(2, 6);
}
