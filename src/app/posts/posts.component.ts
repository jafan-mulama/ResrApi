import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: any[] = [];
  newPost: any = {};
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  message!: string;

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  getPosts() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.posts = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  createPost(idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void | string  {
    if (!idInput.value || !titleInput.value || !bodyInput.value) {
      // One or more input fields are empty, do not proceed with the submission
      this.message = 'One or more input fields are empty. Please fill all fields.';
      return;
    }
    
    let newPost = {
      id: idInput.value,
      title: titleInput.value,
      body: bodyInput.value
    };

    idInput.value ='';
    titleInput.value ='';
    bodyInput.value ='';

    this.http.post<any[]>(this.apiUrl, newPost)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          newPost.id = newPost.id;
          newPost.title = response.title;
          newPost.body = response.body;
          this.posts.splice(0, 0, newPost);
          this.clearForm();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  updatePost(post: any, idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void {
    const id = Number(idInput.value);
    const title = titleInput.value;
    const body = bodyInput.value;
  
    // Rest of your code here...
  
    // Update the post object with the new values
    post.id = id;
    post.title = title;
    post.body = body;
  
    // Rest of your HTTP request code here...
  }
  
  
  
  

  deletePost(post: any): void {
    this.http.delete(this.apiUrl+ '/' + post.id).subscribe({
      next: (response: any) => {
        console.log(response);
        let indext = this.posts.indexOf(post);
        this.posts.splice(indext, 1)
    
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error here, display error message, etc.
      },
      complete: () => {
        // Optional: Handle completion of the observable
      }
    });
  }
  

  clearForm() {
    this.newPost = {};
  }
}
