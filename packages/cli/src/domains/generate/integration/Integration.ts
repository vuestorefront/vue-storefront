type Integration = {
  name: string;
  gitRepositoryURL: string;
  documentationURL?: string;
  type: 'SDK' | 'VSF2';
};

export default Integration;
