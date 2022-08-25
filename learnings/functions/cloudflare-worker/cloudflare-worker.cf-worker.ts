import { CloudflareOptions } from '@teambit/cloud-providers.aspects.cloudflare-worker';

export const CloudflareLearning: CloudflareOptions = {
  // the name for your worker app (used by bit)
  name: 'cloudflare worker',

  // an entry file for your worker's dev/prod builds
  entry: require.resolve('./cloudflare-worker.app-root'),

  // your cloudflare details for deployment
  deployOptions: {
    // the auth token for cloudflare (https://developers.cloudflare.com/api/tokens/create)
    auth: { token: process.env.CLOUDFLARE_TOKEN },
    // your cloudflare account id
    accountId: 'eaaf3a865c132fee61839cd05ebbf940',
    // the cloudflare hosting zone id
    zoneId: 'e6bd633234509c20292d8027a9a37a81',
    // the url for the deployed worker
    routes: ['dechea.com/cloudflare-worker'],
  },
};

export default CloudflareLearning;
