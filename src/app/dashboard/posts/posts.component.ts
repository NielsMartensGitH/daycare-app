import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';
import { FileuploadService } from 'src/app/fileupload.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  
  postId!: number;

  posts$!:any[];  // fetch of all the posts by one specific daycare
  curDaycare!: any; // daycare id as stored in the sessionStorage

  postImages$: any[] = [] // here we store our fetched images
  files!: any; // Our filesobject which we get from our input field of type FILE
  formdata = new FormData();

  PostId!: number
  editThisMsg!:string;  // the message we want to edit which we will send to childcomponent EditPostFormComponent
  editId!: number; // the id of the post which we want to edit which we will send to childcomponent EditPostFormComponent

  // USED FOR COMMENTS
  msgId!: number; // for showing ONLY comments of this id
  msgToggle: boolean = false; // FALSE IS NOT SHOWING COMMENTS , TRUE IS SHOWING COMMENTS

  data: any;

  constructor(private dataStorage: DatastorageService, private timeService: TimeService, private uploadfile: FileuploadService) { }

  ngOnInit(): void {
    this.curDaycare = sessionStorage.getItem('daycare_id');
    this.dataStorage.getPostsByDayCare(this.curDaycare).subscribe( 
      posts => {
        this.posts$ = posts;

      })

      this.dataStorage.getAllImages().subscribe(
        data => {
          console.log("ALL IMAGES")
          this.postImages$ = data;
        }
      )
     
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

    this.dataStorage.addPost(posts).subscribe(
      (data) => {
        console.log("FILES INSIDE SERVICE, waarom is dit plots een leeg object?")
 
        this.PostId = data; // PUT ID IN PostId variable
        
        this.uploadEachFile(data)
        this.ngOnInit();
      })
      
// fetch('http://gameofcones.be/api/posts', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
//   },
//   body:JSON.stringify(posts)
// }).then(res => res.json())
// .then(res => {
//   this.postId = parseInt(JSON.stringify(res))
// })

  }

  

    // PROMISE


  // UPLOADS EACH FILE

  uploadEachFile(data: any) {
    console.log("DATA POSTID")
    console.log(this.files)
    console.log(data)
    if(this.files != undefined) {
      for (let index = 0; index < this.files.length; index++) {
        const element = this.files[index];
        console.log("ELEMENT")
        console.log(element)
        
        const imageObj = {
          "id": null,
          "imagepath": element.name,
          "post_id": data
        }
  
        console.log("OBJECT TO POST TO IMAGES")
        console.log(imageObj)
        // STORE FILENAME IN IMAGES FOLDER
        this.dataStorage.postImageName(imageObj).subscribe(
          (data) => {
            console.log("POSTIMAGENAME")
            console.log(data)    
            // const pivotObj = {
            //   "id": null,
            //   "post_id": this.pivotPostId,
            //   "image_id": data
            // }
            // console.log(pivotObj)
            // this.dataStorage.postImagePivotTable(pivotObj).subscribe()
        });    
    
        this.formdata.append('files', element);
        
      
        this.uploadfile.uploadMultiple(this.formdata).subscribe(
          (d) => {
            console.log(d);
            
          },
          (error) => {
            console.log(error)
          })
        }

  }
  

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

  addFiles(files: any) {
    this.files = files;
  }

}