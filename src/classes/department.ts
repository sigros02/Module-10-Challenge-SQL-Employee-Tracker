class Department {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  toArray(): string[] {
    return [`${this.id}`, this.name];
  }
}

export default Department;
