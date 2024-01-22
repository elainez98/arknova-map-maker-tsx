import { Icon } from "./icon"
import { Terrain } from "./terrain";

export interface Bonus {
  icon: Icon;
  value?: number;
  hideContainer?: boolean;
}

export interface Hex {
  index: number;
  terrain: Terrain;
  upgradeRequired?: boolean;
  bonus?: Bonus;
}

function isDefault(hex: Hex) {
  return !hex.bonus && !hex.upgradeRequired && hex.terrain === Terrain.NORMAL;
}

/**
 * Stringifies the hex.
 */
export function stringify(hex: Hex) {
  if (isDefault(hex)) {
    return '';
  }
  let array: Uint8Array = hex.bonus ? new Uint8Array([
    hex.index,
    hex.terrain,
    hex.upgradeRequired ? 1 : 0,
    hex.bonus.icon,
    hex.bonus.value || 0,
    hex.bonus.hideContainer ? 1 : 0
  ]) : new Uint8Array([
    hex.index,
    hex.terrain,
    hex.upgradeRequired ? 1 : 0
  ]);

  const decoder = new TextDecoder('utf8');
  return btoa(decoder.decode(array));
}

/** Decodes a base64 representation of a hex into a hex. */
export function decode(b64: string): Hex {
  const u82 = new Uint8Array(atob(b64).split('').map(c => c.charCodeAt(0)));
  const result: Hex = {
    index: u82[0],
    terrain: u82[1],
  }
  if (u82[2]) {
    result.upgradeRequired = true;
  }

  // return early if no bonus
  if (u82.length <= 3) {
    return result;
  }

  const bonus: Bonus = {
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