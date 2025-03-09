import Department from "./department";

class Role {
  id: number;
  title: string;
  salary: number;
  department: Department;

  constructor(
    id: number,
    title: string,
    salary: number,
    department: Department
  ) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department = department;
  }

  toArray(): string[] {
    return [
      `${this.id}`,
      this.title,
      `${this.salary}`,
      ...this.department.toArray(),
    ];
  }
}

export default Role;
