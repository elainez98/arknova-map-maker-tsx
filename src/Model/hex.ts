import { Icon } from "./icon"
import { Terrain } from "./terrain";

export interface BonusData {
  icon: Icon;
  value?: number;
  hideContainer?: boolean;
}

export interface HexData {
  index: number;
  terrain?: Terrain;
  buildUpgrade?: boolean;
  bonus?: BonusData;
}

function isDefault(hex: HexData) {
  return !hex.bonus && !hex.buildUpgrade && hex.terrain === Terrain.NORMAL;
}

/**
 * Stringifies the hex.
 */
export function stringify(hex: HexData) {
  if (isDefault(hex)) {
    return '';
  }
  let array: Uint8Array = hex.bonus ? new Uint8Array([
    hex.index,
    hex.terrain || Terrain.NORMAL,
    hex.buildUpgrade ? 1 : 0,
    hex.bonus.icon,
    hex.bonus.value || 0,
    hex.bonus.hideContainer ? 1 : 0
  ]) : new Uint8Array([
    hex.index,
    hex.terrain || Terrain.NORMAL,
    hex.buildUpgrade ? 1 : 0
  ]);

  const decoder = new TextDecoder('utf8');
  return btoa(decoder.decode(array));
}

/** Decodes a base64 representation of a hex into a hex. */
export function decode(b64: string): HexData {
  const u82 = new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0)));
  const result: HexData = {
    index: u82[0],
    terrain: u82[1],
  }
  if (u82[2]) {
    result.buildUpgrade = true;
  }

  // return early if no bonus
  if (u82.length <= 3) {
    return result;
  }

  const bonus: BonusData = {
    icon: u82[3]
  }
  if (u82[4]) {
    bonus.value = u82[4]
  }
  if (u82[5]) {
    bonus.hideContainer = true;
  }

  result.bonus = bonus;
  return result;
}