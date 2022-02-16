export class Child {
    constructor(
        public id: number,
        public child_firstname: string,
        public child_lastname: string,
        public age: number,
        public childcode: string,
        public parent_id: number,
        public daycare_id: number,
        public checked_in: number,
        public diary_sent: number,
    ) {}
}