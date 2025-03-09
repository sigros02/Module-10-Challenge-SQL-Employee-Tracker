class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toArray() {
        return [`${this.id}`, this.name];
    }
}
export default Department;
