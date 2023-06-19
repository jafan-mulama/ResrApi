import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { PostService } from '../services/post.service';
=======
>>>>>>> fb495e66a2f4ea94534905d660e59234890317d4
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPost: any = {};
  message!: string;

<<<<<<< HEAD
  constructor(private service: PostService, private http: HttpClient) { }
=======
  constructor(private http: HttpClient) { }
>>>>>>> fb495e66a2f4ea94534905d660e59234890317d4

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
<<<<<<< HEAD
    this.service.getPosts().subscribe({
      next: (response: any) => {
        console.log(response);
        this.posts = response;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
=======
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
>>>>>>> fb495e66a2f4ea94534905d660e59234890317d4
  }

  createPost(idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void {
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

    idInput.value = '';
    titleInput.value = '';
    bodyInput.value = '';

<<<<<<< HEAD
    this.service.createPost(newPost).subscribe({
      next: (response: any) => {
        console.log(response);
        newPost.id = response.id;
        this.posts.unshift(newPost);
        this.clearForm();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
=======
    this.http.post<any[]>(this.apiUrl, newPost)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          newPost.id = response.id;
          this.posts.unshift(newPost);
          this.clearForm();
        },
        error: (error) => {
          console.error(error);
        }
      });
>>>>>>> fb495e66a2f4ea94534905d660e59234890317d4
  }

  updatePost(post: any, idInput: HTMLInputElement, titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void {
    const id = Number(idInput.value);
    const title = titleInput.value;
    const body = bodyInput.value;

    post.id = id;
    post.title = title;
    post.body = body;
<<<<<<< HEAD

    this.service.updatePost(post).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  deletePost(post: any): void {
    this.service.deletePost(post).subscribe({
      next: (response: any) => {
        console.log(response);
        const index = this.posts.indexOf(post);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
      },
      error: (error: any) => {
        console.error(error);
=======

    this.http.put<any>(this.apiUrl + '/' + post.id, post)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }

  deletePost(post: any): void {
    this.http.delete(this.apiUrl + '/' + post.id).subscribe({
      next: (response: any) => {
        console.log(response);
        const index = this.posts.indexOf(post);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
      },
      error: (error: any) => {
        console.error(error);
>>>>>>> fb495e66a2f4ea94534905d660e59234890317d4
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
