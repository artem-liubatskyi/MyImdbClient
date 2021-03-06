import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { UserFull } from '../models/user-full';
import { Observable } from 'rxjs';
import { RegistrationFormData } from '../models/registration-form-data';
import { UserPage } from '../models/user-page';
import { EditUser } from '../models/edit-user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  register(user: UserFull) {
    return this.http.post(AppConfig.registration,
      {
        id: user.id,
        userName: user.userName,
        password: user.password,
        eMail: user.eMail,
        about: user.about,
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
        genderId: user.genderId,
        countryId: user.countryId
      })
  }
  getUser() {
    return this.http.get<EditUser>(AppConfig.getUserForEdit);
  }
  getRegistrationFormData(): Observable<RegistrationFormData> {
    return this.http.get<RegistrationFormData>(AppConfig.registrationFormData);
  }
  getUserPage(): Observable<UserPage> {
    return this.http.get<UserPage>(AppConfig.userPage);
  }
  restorePassword(hash: string, newPassword: string) {
    return this.http.post(AppConfig.restorePassword,
      {
        newPassword: newPassword,
        passwordHash: hash
      })
  }
  restorePasswordRequest(email: string) {
    return this.http.post(AppConfig.restorePasswordRequest, email);
  }
  update(user: EditUser) {
    return this.http.post(AppConfig.updateUser,
      {
        id: user.id,
        userName: user.userName,
        oldPassword: user.oldPassword,
        password: user.password,
        email: user.email,
        biography: user.biography,
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
        genderId: user.genderId,
        countryId: user.countryId
      })
  }
}
