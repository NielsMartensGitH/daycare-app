export class Comments {
    constructor(
        public id: number,
        public created_at: string,
        public comment: string,
        public post_id: number,
        public parent_id: number,
        public daycare_id: string
         
    ) {}
}