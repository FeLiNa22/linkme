import {MetadataRoute} from 'next';
import {env} from '../env';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: env.NEXT_PUBLIC_APP_NAME,
    short_name: env.NEXT_PUBLIC_APP_NAME,
    theme_color: '#fff',
    background_color: '#fff',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: 'favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
