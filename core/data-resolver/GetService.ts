interface ServiceDescriptor<T> {
  loader: () => Promise<T>,
  methods: string[]
}

export default function GetService<SERVICE> ({ methods, loader }: ServiceDescriptor<SERVICE>): SERVICE {
  const methodsToReturn = {};

  for (let method of methods) {
    methodsToReturn[method] = async function (...args) {
      const service = await loader();
      return service[method](...args);
    }
  }

  return methodsToReturn as SERVICE
}
