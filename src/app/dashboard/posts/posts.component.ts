import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$!:any[];
  newPosts$!: any;
  diaries$!:[];

  editThisMsg!:string;
  editId!: number;

  msgId!: number;
  msgToggle: boolean = false;

  constructor(private dataStorage: DatastorageService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.dataStorage.getAllPosts().subscribe( 
      posts => {
        this.posts$ = posts;
      })
    this.dataStorage.getAllDiaries().subscribe( 
        diaries => {
          this.diaries$ = diaries;
        })
        setTimeout(() => {
          this.newPosts$ = [...this.posts$, ...this.diaries$]
          console.log(this.newPosts$);
          //this.newPosts$.slice().sort((a:any, b:any) => a.created_at - b.created);
          //console.log(this.newPosts$)
        }, 1000)
    
      
    
  }

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
    return this.timeService.timeSince(timestamp);
  }

  onAddPost(posts: Posts[]) {
    this.dataStorage.addPost(posts).subscribe(
      () => {
        this.ngOnInit();
      })
      
  }

  onEditPost(posts: any) {

    this.dataStorage.updatePost(posts, posts.id).subscribe(
      () => this.ngOnInit()
    )
  }

  deletePost(postId: number) {
   this.dataStorage.deletePost(postId).subscribe(
     () => this.ngOnInit()
   );   
  }
  
  onEdit(sendMsg:string, id: number){
    this.editThisMsg = sendMsg;
    this.editId = id; 
    console.log(this.editThisMsg);
  }

  messageId(id: number) {
    console.log(id == this.msgId)
    if (id == this.msgId) {
      this.msgToggle = false;
      this.msgId = 0;
    } else {
      this.msgId = id;
      this.msgToggle = true;
    }
   
  }

}
