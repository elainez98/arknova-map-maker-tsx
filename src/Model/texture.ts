export enum Texture {
    Land,
    Water,
    Mountain,
}

export const TextureMap: Map<Texture, string> =
    new Map([
        [Texture.Land, "beige"],
        [Texture.Water, "aqua"],
        [Texture.Mountain, "grey"],
    ])