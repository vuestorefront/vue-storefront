export default interface ObjectBuilderInterface<
  T,
  R = { [key: string]: unknown }
> {
  buildFromJSON(data: R): T
}
