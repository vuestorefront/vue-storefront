const generator = {
  get email(): string {
    return `cypress.${Date.now()}@vuestorefront.test`;
  }
};

export default generator;
