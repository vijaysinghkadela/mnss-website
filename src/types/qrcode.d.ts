declare module 'qrcode' {
  export function toDataURL(
    text: string,
    options?: { width?: number; margin?: number }
  ): Promise<string>;
  const _default: { toDataURL: typeof toDataURL };
  export default _default;
}
