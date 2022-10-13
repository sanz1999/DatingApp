import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResults } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members : Member[]=[];
  paginationResult: PaginatedResults<Member[]> = new PaginatedResults<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(page?:number,itemsPerPage?:number) {
    let params = new HttpParams();

    if(page!== null && itemsPerPage !==null){
      params=params.append('pageNumber',page.toString());
      params=params.append('pageSize',itemsPerPage.toString());
    }

    return this.http.get<Member[]>(this.baseUrl + 'users',{observe:'response',params}).pipe(
      map(response=> {
        this.paginationResult.results = response.body;
        if(response.headers.get('Pagination' )!==null){
          this.paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginationResult;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x=> x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  updateMember(member : Member){

    return this.http.put(this.baseUrl + 'users',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index]= member;
      })
    );
  }

  setMainPhoto(photoId:Number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId,{});
  }

  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }


}
