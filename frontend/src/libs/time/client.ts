'use client';

import dayjs from 'dayjs';
import i18next from 'i18next';
import {setup} from './shared';

setup(dayjs, i18next);

export const useTime = () => ({time: dayjs});
