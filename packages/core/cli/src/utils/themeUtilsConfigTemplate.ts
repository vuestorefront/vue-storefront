interface VsfTuConfigProps {
  outputPathName: string;
  themePath: string;
  _themePath: string;
}

export interface VsfTuSource {
  path: string;
  ignore?: string[];
  variables?: Record<string, any>;
  watch: boolean;
}

export interface VsfTuConfiguration {
  copy: {
    to: string;
    from: VsfTuSource[];
  };
}
export const vsfTuConfig = ({
  outputPathName,
  themePath,
  _themePath
}: VsfTuConfigProps): VsfTuConfiguration => ({
  copy: {
    to: `${outputPathName}`,
    from: [
      {
        path: `${_themePath}`,
        watch: false
      },
      {
        path: `${themePath}`,
        ignore: ['generate-template.ts', 'theme-utils.config.js'],
        variables: {},
        watch: false
      }
    ]
  }
});
