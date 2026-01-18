// Lightweight declarations for static assets and CSS modules to avoid import errors during migration
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  import * as React from 'react';
  const src: string;
  export default src;
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
declare module '*.css';
declare module '*.module.css';
