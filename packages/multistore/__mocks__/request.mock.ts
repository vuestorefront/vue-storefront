export const mockRequest = () => ({
  headers: {} as any,
  get: function get(header) {
    return this.headers[header];
  },
});
