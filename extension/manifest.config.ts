import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

export default defineManifest({
  manifest_version: 3,
  name: 'StandUp — Anti-Bullying Toolkit',
  short_name: 'StandUp',
  description:
    'Learn what bullying actually is in 7 questions. See how the law works in Norway, Sweden, Japan, the US — and why India still has only a guideline.',
  version: pkg.version,
  action: {
    default_popup: 'src/popup/index.html',
    default_title: 'StandUp',
  },
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  permissions: ['storage', 'sidePanel'],
  host_permissions: [],
  icons: {
    16: 'icons/icon-16.png',
    48: 'icons/icon-48.png',
    128: 'icons/icon-128.png',
  },
});
