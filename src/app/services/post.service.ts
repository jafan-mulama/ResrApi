import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPost(newPost: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newPost);
  }

  updatePost(post: any): Observable<any> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<any>(url, post);
  }

  deletePost(post: any): Observable<any> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.delete<any>(url);
  }
}
