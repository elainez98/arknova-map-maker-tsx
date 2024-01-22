export enum Terrain {
  NORMAL,
  WATER,
  ROCK,
}

export const TerrainMap: Map<Terrain, string> =
  new Map([
    [Terrain.NORMAL, "beige"],
    [Terrain.WATER, "aqua"],
    [Terrain.ROCK, "grey"],
  ])