import {MetadataRoute} from 'next';
import {env} from '../env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '*/404'],
    },
    sitemap: `${env.NEXT_PUBLIC_HOST_URL}/sitemap.xml`,
  };
}
