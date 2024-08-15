import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private url: string = "https://localhost:7231/api/Users";

  constructor(private http: HttpClient) { }

  GetUserById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.url}/${id}`);
  }

  UpdateUserProfile(id: string, userProfile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.url}/${id}`, userProfile);
  }
}
