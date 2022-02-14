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
  posts$!:any[];  // fetch of all the posts by one specific daycare
  curDaycare!: any; // daycare id a stored in the sessionStorage
  imageToShow!: any;


  editThisMsg!:string;  // the message we want to edit which we will send to childcomponent EditPostFormComponent
  editId!: number; // the id of the post which we want to edit which we will send to childcomponent EditPostFormComponent

  msgId!: number; // for showing ONLY comments of this id
  msgToggle: boolean = false; // FALSE IS NOT SHOWING COMMENTS , TRUE IS SHOWING COMMENTS

  constructor(private dataStorage: DatastorageService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.curDaycare = sessionStorage.getItem('daycare_id');
    this.dataStorage.getPostsByDayCare(this.curDaycare).subscribe( 
      posts => {
        this.posts$ = posts;
      })


  }

  
// METHOD WHICH SENDS A TIMESTAMP TO OUR TimeService

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
    return this.timeService.timeSince(timestamp);
  }

  // ADD POST

  onAddPost(posts: any) {
    const post = posts.newPost;
    const imageIds: number[] = posts.imagesId
      console.log(imageIds)

    for (let i = 0; i < imageIds.length; i++) {
      console.log("hello")
      console.log(imageIds[i])
      let pivotObj = {
        "id": null,
        "post_id": posts.id,
        "image_id": imageIds[i]
      }
      this.dataStorage.postImagePivotTable(pivotObj).subscribe()

    }

    // imageIds.forEach(image_id => {
    //   let pivotObj = {
    //     "id": null,
    //     "post_id": posts.id,
    //     "image_id": image_id
    //   }

      // console.log("test")
      // console.log(pivotObj)
      // this.dataStorage.postImagePivotTable(pivotObj).subscribe();
    // })
    this.dataStorage.addPost(post).subscribe(
      (data) => {
        console.log(data)
        this.ngOnInit();
      })
      
  }

  // EDIT POST , this posts argument comes from the child via EventEmitter!!

  onEditPost(posts: any) {

    this.dataStorage.updatePost(posts, posts.id).subscribe(
      () => this.ngOnInit()
    )
  }

  // DELETE POST

  deletePost(postId: number) {
   this.dataStorage.deletePost(postId).subscribe(
     () => this.ngOnInit()
   );   
  }


  // WHEN EDITING WE NEED TO SEND current message and the ID of the post TO OUR CHILD COMPONENT EditPostFormComponent 

  onEdit(sendMsg:string, id: number){
    this.editThisMsg = sendMsg;
    this.editId = id; 
    console.log(this.editThisMsg);
  }


  // 

  messageId(id: number) {
    if (id == this.msgId) { // When we already opened the comments of this posts (when msgID is already known) it will close again
      this.msgToggle = false;
      this.msgId = 0;
    } else { // else comments will be shown
      this.msgId = id;
      this.msgToggle = true;
    }
   
  }

}
