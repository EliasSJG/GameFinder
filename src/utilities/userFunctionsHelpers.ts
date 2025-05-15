//adds the users game/character
//uses T as a type to make sure there is no any and makes sures that there is atleast one numeric property
export function addUsersChoice<T extends { id: number }>(
  //the storage we add the things to
  arr: T[],
  //the item we add
  item: T
): T[] {
  //checks if it already contains an item with the same id, if its false it adds the item
  if (arr.some((el) => el.id === item.id)) {
    return arr;
  } else {
    return [...arr, item];
  }
}

//removes the users game/character if the id matches
export function removeUsersChoice<T extends { id: number }>(
  arr: T[],
  id: number
): T[] {
  return arr.filter((el) => el.id !== id);
}
