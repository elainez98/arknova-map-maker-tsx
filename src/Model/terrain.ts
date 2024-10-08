export enum Terrain {
  NORMAL,
  WATER,
  ROCK,
}

export const TerrainMap: Map<Terrain, string> =
  new Map([
    [Terrain.NORMAL, "beige"],
    [Terrain.WATER, "#6996ab"],
    [Terrain.ROCK, "#6a5c5c"],
  ])