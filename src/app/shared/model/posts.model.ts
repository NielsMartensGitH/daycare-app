export class Posts {
    constructor(
        public id: number,
        public type_id: number,
        public created_at: string,
        public child_id: number,
        public picture: string,
        public message: string,
        public privacy: number,
        public daycarename: string,
        public daycareavatar: string    
    ) {}
}