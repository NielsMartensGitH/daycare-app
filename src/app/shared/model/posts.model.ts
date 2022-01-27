export class Posts {
    constructor(
        public id: number,
        public type_id: number,
        public created_at: string,
        public child_id: number,
        public picture: string,
        public message: string,
        public daycare_id: number,
        public privacy: number
    ) {}
}