export class Diarycomments {
    constructor(
        public id: number,
        public created_at: string,
        public comment: string,
        public diary_id: number,
        public parent_id: number,
        public daycare_id: string
         
    ) {}
}