import {
  type GetDependencyReleaseLine,
  type GetReleaseLine,
  type ChangelogFunctions,
} from "@changesets/types";

export const getReleaseLine: GetReleaseLine = async (changeset) => {
  const summaryItems = changeset.summary.split("\n").map((line) => {
    return line.replace(/^\[([A-Z[\]]+)\](.+)/, "- **[$1]**$2").trimEnd();
  });

  return summaryItems.join("\n");
};

export const getDependencyReleaseLine: GetDependencyReleaseLine = async (
  _changesets,
  dependenciesUpdated
) => {
  if (dependenciesUpdated.length === 0) return "";

  const updatedDependenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
  );

  return ["- Updated dependencies:", ...updatedDependenciesList].join("\n");
};

export const changelogFunctions: ChangelogFunctions = {
  getReleaseLine,
  getDependencyReleaseLine,
};
