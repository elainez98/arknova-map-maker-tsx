import { Hex, decode, stringify } from "./hex";

import { Icon } from "./icon";
import { Terrain } from "./terrain";
import { TextDecoder } from 'util';

Object.assign(global, { TextDecoder });

test('are able to stringify and decode a hex', () => {
  const hex: Hex = {
    index: 4,
    terrain: Terrain.ROCK,
    bonus: {
      icon: Icon.Money,
      value: 5,
    }
  }
  const stringified = stringify(hex);

  expect(decode(stringified)).toMatchObject(hex);
});