// @ts-check
import { defineConfig } from 'astro/config';
import appHosting from '@apphosting/astro-adapter';
// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: appHosting({
        mode: 'standalone'
    })
});
