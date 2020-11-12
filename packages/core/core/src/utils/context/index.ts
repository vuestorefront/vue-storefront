type Context = any;

interface ContextConfiguration {
  useContext: () => Context;
}

let useContext = () => ({ $vsfSettings: {} });

const configureContext = (config: ContextConfiguration) => {
  useContext = config.useContext || useContext;
};

export {
  Context,
  useContext,
  configureContext
};
