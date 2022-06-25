import { generate } from "./game-gen";

export function getGame(seed: number): Array<any> {
  const randSeed = ((s: number) => {
    return function () {
      s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
  });
  let gameSeed = randSeed(seed)();
  const games = generate()

  // return games[randRange(0, games.length - 1, gameSeed)];
  return games
}
function randRange(min: number, max: number, seed: number) {
  return Math.floor(seed * (max - min + 1)) + min;
}
