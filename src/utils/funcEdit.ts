export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function verifiNumber(char: string) {
  const charList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];

  const filtro = charList.filter(item => item === char);

  if (filtro.length !== 0) {
    return char;
  }

  return "";
}