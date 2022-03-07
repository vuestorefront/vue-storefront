export default function resolveDependency(name: string): string {
  try {
    return require.resolve(name, { paths: [process.cwd()] });
  } catch (error) {
    return '';
  }
}
