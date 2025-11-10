export function castUrlToHash(input: string): string {
  const m = input.trim().match(/([a-f0-9]{40})$/i)
  return m ? m[1] : input.trim().replace(/^0x/, '')
}
