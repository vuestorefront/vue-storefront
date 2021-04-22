interface DefaultExport {
  default: Function
}
type LoaderFunc = () => Promise<DefaultExport>
type WrappedFunc = (...args) => Promise<any>

export default (loader: LoaderFunc): WrappedFunc => async function (...args) {
  const service = await loader();
  return service.default(...args);
}
