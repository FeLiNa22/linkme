'use client';

import {Provider} from 'jotai';
import {FC, PropsWithChildren} from 'react';

const JotaiProvider: FC<PropsWithChildren> = ({children}) => (
  <Provider>{children}</Provider>
);

export default JotaiProvider;
