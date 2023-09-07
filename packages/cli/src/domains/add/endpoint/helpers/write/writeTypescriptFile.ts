import { Project } from "ts-morph";

export const writeToTypescriptFile = (path: string, endpoint: string) => {
  const fileName = path;
  const endpointName = endpoint;
  const contextType = "BoilerplateIntegrationContext";
  const paramsType = "TODO";
  const returnType = "TODO";

  // Initialize a ts-morph project and add the api.ts file
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(fileName);

  // Find the Endpoints interface
  const endpointsInterface = sourceFile.getInterface("Endpoints");

  if (!endpointsInterface) {
    console.error(`The "Endpoints" interface was not found in ${fileName}`);
    process.exit(1);
  }

  // Check if the endpoint already exists
  const existingEndpoint = endpointsInterface.getMethod(endpointName);
  if (existingEndpoint) {
    existingEndpoint.remove();
  }

  // Add the new endpoint to the Endpoints interface
  endpointsInterface.addMethod({
    name: endpointName,
    parameters: [
      { name: "context", type: contextType },
      { name: "params", type: paramsType },
    ],
    returnType: `Promise<${returnType}>`,
  });

  // Save the modified TypeScript file
  sourceFile.saveSync();
};
