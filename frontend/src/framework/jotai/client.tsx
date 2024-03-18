'use client';

import type {FC, ReactNode} from 'react';
import type {WritableAtom} from 'jotai';
import {useHydrateAtoms} from 'jotai/utils';

export const JotaiAtomsHydrator: FC<{
  atomValues: Iterable<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: ReactNode;
}> = ({atomValues, children}) => {
  useHydrateAtoms(new Map(atomValues));
  return children;
};
