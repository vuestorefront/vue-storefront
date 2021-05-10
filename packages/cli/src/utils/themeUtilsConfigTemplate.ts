interface IVsfTuConfigProps {
  outputPathName: string;
  themePath: string;
  _themePath: string;
}
export const vsfTuConfig = ({
  outputPathName,
  themePath,
  _themePath
}: IVsfTuConfigProps) => `module.exports = {
  copy: {
    to: '${outputPathName}',
    from: [
     {
        path: '${_themePath}',
        watch: false
      },
      {
        path: '${themePath}',
        ignore: ['generate-template.ts', 'theme-utils.config.js'],
        variables: {},
        watch: false
      },
    ]
  }
}`;
