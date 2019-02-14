
export default function compareArrays(arr1, arr2) {
  return arr1.every((elem, i) => elem === arr2[i]);
}
