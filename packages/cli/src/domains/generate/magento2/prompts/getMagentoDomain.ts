import { t } from "i18next";
import { text, isCancel } from "@clack/prompts";
import { logSimpleWarningMessage } from "../functions/terminalHelpers";

/** Gets a Magento domain name and checks for validity. */
const getMagentoDomainName = async (message: string): Promise<string> => {
  const magentoDomainName = await text({
    message,
    initialValue: "magento.test",
    validate(value: string): string | void {
      if (!value?.trim()) {
        return t<string>("domain.project_name.is_empty");
      }

      const domainNameRegex =
        // eslint-disable-next-line no-useless-escape
        /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

      if (!domainNameRegex.test(value)) {
        return t<string>("command.generate_store.magento.invalid_domain");
      }
      return undefined;
    },
  });

  if (isCancel(magentoDomainName)) {
    logSimpleWarningMessage(t("command.generate_store.message.canceled"));
    process.exit(0);
  }

  return magentoDomainName as string;
};

export default getMagentoDomainName;
