import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private url: string = "http://localhost:5200/user";

  constructor(private http: HttpClient) { }

  GetUserProfile() : Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.url}/profile`)
  }

  UpdateUserProfile(userProfile: UserProfile) : Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.url}/profile`, userProfile)
  }
}
