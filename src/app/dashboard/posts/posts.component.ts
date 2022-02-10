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
  newPosts$!:any[];
  diaries$!:[];
  array!: any[];
  curDaycare!: any;

  editThisMsg!:string;
  editId!: number;
  msgId!: number;
  msgToggle: boolean = false;

  constructor(private dataStorage: DatastorageService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.curDaycare = sessionStorage.getItem('daycare_id');
    this.dataStorage.getPostsByDayCare(this.curDaycare).subscribe( 
      posts => {
        this.posts$ = posts;
      })

    this.dataStorage.getAllDiaries().subscribe( 
        diaries => {
          this.diaries$ = diaries;
          this.diaries$.map((obj:any) => {
            obj.poop = obj.poop.split("&")
          })
        })
        setTimeout(() => {
          this.array = [...this.posts$, ...this.diaries$];
          this.newPosts$ = this.array.sort((a:any, b:any) => <any>new Date(b.created_at) - <any>new Date(a.created_at));
          console.log(this.newPosts$)
        }, 1000)


    // this.dataStorage.getAllDiaries().subscribe( 
    //     diaries => {
    //       this.diaries$ = diaries;
    //       this.diaries$.map((obj:any) => {
    //         obj.poop = obj.poop.split("&")
    //       })
    //     })
          // setTimeout(() => {
        //   this.array = [...this.posts$, ...this.diaries$];
          
        //   console.log(this.array);
        //   this.newPosts$ = this.array.sort((a:any, b:any) => <any>new Date(b.created_at) - <any>new Date(a.created_at));
        //   console.log(this.newPosts$)
        // }, 2000)
    
      //<any>new Date(a.created_at) - <any>new Date(b.created_at)

    
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
    if (id == this.msgId) {
      this.msgToggle = false;
      this.msgId = 0;
    } else {
      this.msgId = id;
      this.msgToggle = true;
    }
   
  }

}
