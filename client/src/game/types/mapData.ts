interface IMapdata {
  frame: number
  height: string
  width: string
  layout: number[][]
  assets: { frames: number; file_name: string; collision: number }[]
}
