/**
 * Make it possible to asynchronly load an array
 * @see https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 * @param {Array} array
 * @param {function} callback
 */
export default async function (array: any[], callback: (item, index, array) => any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
