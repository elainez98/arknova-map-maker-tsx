import { Icon } from './Model/icon';
import { Terrain } from './Model/terrain';
import { createContext } from 'react';

export interface BrushSelection {
  icon?: Icon;
  terrain?: Terrain
  value?: number
  deleteIcon?: boolean
  buildUpgrade?: boolean
}

export const BrushSelectionContext = createContext<BrushSelection>({});