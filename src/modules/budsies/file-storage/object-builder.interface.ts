export default interface ObjectBuilderInterface {
  buildFromJSON(data: { [key: string]: any }): any
}
