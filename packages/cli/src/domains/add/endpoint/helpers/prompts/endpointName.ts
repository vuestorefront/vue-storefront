import { intro, isCancel, text } from "@clack/prompts";

export const endpointName = async (): Promise<string> => {
  intro("To create a new endpoint, you need to specify its name");
  const name = await text({
    message: "Enter endpoint name",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - @clack/prompts does not require return value
    validate: (value: string) => {
      const regex = /'^(?!.*[^a-zA-Z]).+$'/;

      if (!value) {
        return "Endpoint name is required";
      }
      if (!regex.test(value)) {
        return "Endpoint name must contain only letters";
      }
      return undefined;
    },
  });

  if (isCancel(name)) {
    console.log("Endpoint creation has been canceled");
    process.exit(0);
  }

  return name;
};
