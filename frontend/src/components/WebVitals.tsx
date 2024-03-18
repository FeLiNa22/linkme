'use client';

import {useReportWebVitals} from 'next/web-vitals';
import {FC} from 'react';

const WebVitals: FC<React.PropsWithChildren<unknown>> = () => {
  useReportWebVitals(metric => {
    console.info(metric);
  });

  return null;
};

export default WebVitals;
