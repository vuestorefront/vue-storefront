export default interface ObjectBuilderInterface<
  T,
  R = { [key: string]: unknown }
> {
  (data: R): T
}
