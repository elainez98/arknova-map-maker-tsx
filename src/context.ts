import { createContext } from 'react';
import { Terrain } from './Model/terrain';
import { Icon } from './Model/icon';

export interface BrushSelection {
  icon?: Icon;
  terrain?: Terrain
  value?: number
  deleteIcon?: boolean
}

export const BrushSelectionContext = createContext<BrushSelection>({});