export class User {
  id: number;
  fullName: string;
  token: string;
  constructor(
    id: number,
    fullName: string)
    {
      this.id = id;
      this.fullName = fullName;
      this.token = 'fake-token-' + id;
    }
}
