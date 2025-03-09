class Role {
    constructor(id, title, salary, department) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }
    toArray() {
        return [
            `${this.id}`,
            this.title,
            `${this.salary}`,
            ...this.department.toArray(),
        ];
    }
}
export default Role;
