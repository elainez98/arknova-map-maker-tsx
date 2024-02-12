export enum Icon {
  Bonus,
  Reputation,
  Money,
  XToken,
  Multiplier,
  AssociationWorker,
  PartnerZoo,
  University,
  Marketing,
  TakeFromReputation,
  Snap,
  Kiosk,
  Pavilion,
  Clever,
  Pouch,
  Perception,
  Hunter,
  Sunbathing,
  Digging,
  Determination,
  Tower,
}

export const VALUE_ICONS = [
  Icon.Money,
  Icon.Reputation,
  Icon.Hunter,
  Icon.Sunbathing,
  Icon.Perception,
  Icon.Pouch,
];

export class IconConfig {
  constructor(
    readonly icon: Icon,
    readonly x: number,
    readonly y: number,
    readonly size: number,
  ) { }
}

export const BonusConfig = new IconConfig(Icon.Bonus, 50.026, 40.739, 1750);

export const IconMap: Map<Icon, IconConfig> =
  new Map([
    [Icon.Reputation, 7.150, 40.784, 1735.6],
    [Icon.Money, 62.766, 77.684, 2767.6],
    [Icon.XToken, 0.518, 40.784, 1735.6],
    [Icon.Multiplier, 56.602, 40.739, 1750.4],
    [Icon.TakeFromReputation, 66.794, 40.734, 2608.9],
    [Icon.AssociationWorker, 33.558, 40.739, 1750.4],
    [Icon.PartnerZoo, 29.513, 78.469, 1923.0],
    [Icon.Clever, 39.490, 40.739, 2385.3],
    [Icon.Marketing, 97.179, 40.694, 1765.5],
    [Icon.Tower, 78.898, 1.1312, 2946.8],
  ].map(([icon, x, y, size]) => [icon, new IconConfig(icon, x, y, size)]));
