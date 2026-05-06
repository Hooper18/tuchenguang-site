// topojson-client 不发布官方类型声明，做 minimal shim 让 astro check 通过。
// 实际签名见 https://github.com/topojson/topojson-client
declare module 'topojson-client' {
  export function feature(topology: unknown, object: unknown): unknown
  export function mesh(
    topology: unknown,
    object: unknown,
    filter?: (a: unknown, b: unknown) => boolean,
  ): unknown
}
