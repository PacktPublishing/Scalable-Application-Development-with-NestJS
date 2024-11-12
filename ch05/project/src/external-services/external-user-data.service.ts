export class ExternalUserDataService {
  async fetchUsers(): Promise<any[]> {
    // Simulate an HTTP call to an external service
    return Promise.resolve([
      { id: 3, name: 'External User', email: 'external@example.com' },
    ]);
  }
}
