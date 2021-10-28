export const initialSkrablLetters = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',
  'b', 'b',
  'c', 'c',
  'd', 'd', 'd', 'd',
  'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
  'f', 'f',
  'g', 'g', 'g',
  'h', 'h',
  'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i',
  'j',
  'k',
  'l', 'l', 'l', 'l',
  'm', 'm',
  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  'p', 'p',
  'q',
  'r', 'r', 'r', 'r', 'r', 'r',
  's', 's', 's', 's',
  't', 't', 't', 't', 't', 't',
  'u', 'u', 'u', 'u',
  'v', 'v',
  'w', 'w',
  'x',
  'y', 'y',
  'z',
  ' ', ' ']; // blanks

/*

1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
2 points: D ×4, G ×3
3 points: B ×2, C ×2, M ×2, P ×2
4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
5 points: K ×1
8 points: J ×1, X ×1
10 points: Q ×1, Z ×1
*/
export const letterValueMap = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
  ' ': '', // blank
};
