import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IdentifiedUser} from "../models/user/identified-user.interface";
import {User} from "../models/user/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userService = "localhost:8080";
    constructor(private http: HttpClient) {}

    public getUsers():Observable<{users: IdentifiedUser[]}>{
        return this.http.get<{users: IdentifiedUser[]}>(`{'http://localhost:8080'`);
    }

    public getUser(userId: number):Observable<IdentifiedUser>{
        return this.http.get<IdentifiedUser>(`{http://localhost:8080}`);
    }

    public addUser(user: User): Observable<IdentifiedUser>{
        return this.http.post<IdentifiedUser>(`{http://localhost:8080}`,user);
    }

    public updateUser(user: IdentifiedUser): Observable<IdentifiedUser>{
        return this.http.put<IdentifiedUser>(`http://localhost:8080`,user);
    }

    public deleteUser(userId: number): Observable<void>{
        return this.http.delete<void>(`http://localhost:8080`);
    }
}