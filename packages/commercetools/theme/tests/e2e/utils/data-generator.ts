const generator = {
  get email(): string {
    return `cypress.${Date.now()}@vuestorefront.test`;
  },

  get uuid(): string {
    return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, () => {
      const random = Math.floor(Math.random() * 16);
      return random.toString(16);
    });
  }

};

export default generator;
