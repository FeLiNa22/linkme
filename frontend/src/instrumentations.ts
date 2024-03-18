import {registerOTel} from '@vercel/otel';
import {env} from './env';

export function register() {
  registerOTel({serviceName: env.NEXT_PUBLIC_APP_NAME});
}
