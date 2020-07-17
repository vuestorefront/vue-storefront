
enum PACKAGE_TYPES {
    NotPackage = 0,
    Wrapper,
    IntegrationWrapper,
    Package
}

enum PACKAGE_SUBTYPE {
    INDEPENDENT = 0,
    API,
    COMPOSABLE,
    THEME,
    CLI
}

enum RELEASE_GRADATIONS {
    path = 1,
    minor,
    major
}

interface OperationsData {
    pathsToRun: Array<string>;
    freshVersions: Record<string, any>;
    oldFiles: Record<string, any>;
}

export { PACKAGE_TYPES, PACKAGE_SUBTYPE, RELEASE_GRADATIONS, OperationsData };
