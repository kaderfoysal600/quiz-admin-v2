import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router) {}

  //role
  getAllrole() {
    let user_type = sessionStorage.getItem('user_type');
    return this.http.get(
      `http://localhost:3000/api/listRole?user_type=${user_type}`
    );
  }

  getAllroleBySearch(data: any) {
    return this.http.post('http://localhost:3000/api/getAllRoleBySearch', data);
  }

  addRole(data: any) {
    return this.http.post('http://localhost:3000/api/addRole', data);
  }

  updateRoleById(id: string, data: any) {
    return this.http.put('http://localhost:3000/api/updateRole/' + id, data);
  }

  deleteRoleById(id: string) {
    return this.http.delete('http://localhost:3000/api/deleteRole/' + id);
  }

  //permission-group

  addPermissionGroup(data: any) {
    return this.http.post('http://localhost:3000/api/addPermissionGroup', data);
  }

  getAllPermissionGroupBySearch(data: any) {
    return this.http.post(
      'http://localhost:3000/api/getAllPermissionGroupBySearch',
      data
    );
  }

  updatePermissionGroupById(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updatePermissionGroup/' + id,
      data
    );
  }
  deletePermissionGroup(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/deletePermissionGroup/' + id
    );
  }

  //permission-group-item

  addPermissionGroupItem(data: any) {
    return this.http.post(
      'http://localhost:3000/api/addPermissionGroupItem',
      data
    );
  }
  getAllPermissionGroupItem() {
    return this.http.get('http://localhost:3000/api/getPermissionGroupItems');
  }

  getAllPermissionGroupItemSearch(page, size, filterData: any) {
    return this.http.post(
      `http://localhost:3000/api/getPermissionGroupItemsSearch?page=${page}&size=${size}`,
      filterData
    );
  }

  deletePermissionGroupItem(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/deletePermissionGroupItem/' + id
    );
  }
  updatePermissionGroupItem(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updatePermissionGroupItem/' + id,
      data
    );
  }

  //user

  addUser(data: any) {
    return this.http.post('http://localhost:3000/api/addUser', data);
  }
  onLogin(data: any) {
    return this.http.post('http://localhost:3000/api/v1/login', data);
  }
  getAllUser(userCompany) {
    return this.http.get(
      `http://localhost:3000/api/listUser?&user_type=${userCompany.user_type}&company_id=${userCompany.company_id}`
    );
  }
  getAllUserWithPegi(page, size, filterData: any, userCompany) {
    return this.http.post(
      `http://localhost:3000/api/getAllUserWithPegi?page=${page}&size=${size}&user_type=${userCompany.user_type}&company_id=${userCompany.company_id}`,
      filterData
    );
  }

  getProtectedData(): Observable<any> {
    const token = sessionStorage.getItem('token'); // Get token from session storage

    if (!token) {
      console.error('No token found');
      this.router.navigate(['/auth/login']);
      return new Observable();
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/api/protected-route', {
      headers,
    });
  }

  deleteUserById(id: string) {
    return this.http.delete('http://localhost:3000/api/deleteuser/' + id);
  }

  updateUserById(id: string, data: any) {
    return this.http.put('http://localhost:3000/api/editUser/' + id, data);
  }

  updateProfileById(id: string, data: any) {
    return this.http.put('http://localhost:3000/api/updateProfile/' + id, data);
  }

  //change / reset password

  changePassword(data: any) {
    return this.http.put('http://localhost:3000/api/change-password/', data);
  }
  resetPassword(data: any) {
    return this.http.put('http://localhost:3000/api/reset-password/', data);
  }

  //add role permission

  addRolePermission(data: any) {
    return this.http.post('http://localhost:3000/api/addRolePermission', data);
  }

  getAllRolePermission(id) {
    return this.http.get(`http://localhost:3000/api/getRolePermissions/${id}`);
  }
  deleteRolePermission(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/deleteRolePermission/' + id
    );
  }
  updateRolePermission(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updateRolePermission/' + id,
      data
    );
  }

  //company
  addComapny(data: any) {
    return this.http.post('http://localhost:3000/api/addCompany', data);
  }

  getAllCompany(page, size, filterData: any, userCompany) {
    return this.http.post(
      `http://localhost:3000/api/getAllCompany?page=${page}&size=${size}&user_type=${userCompany.user_type}&company_id=${userCompany.company_id}`,
      filterData
    );
  }

  getAllCompanyWithoutPegi() {
    return this.http.get('http://localhost:3000/api/getAllCompanyWithoutPagei');
  }
  getCompanyById(id: string) {
    return this.http.get('http://localhost:3000/api/getCompanyById/' + id);
  }

  updateCompany(id: string, data: any) {
    return this.http.put('http://localhost:3000/api/updateCompany/' + id, data);
  }
  deleteCompany(id: string) {
    return this.http.delete('http://localhost:3000/api/deleteCompany/' + id);
  }

  //device
  addDevice(data: any) {
    return this.http.post('http://localhost:3000/api/addDevice', data);
  }

  getAllDevice(page, size, filterData: any) {
    return this.http.post(
      `http://localhost:3000/api/getAllDevice?page=${page}&size=${size}`,
      filterData
    );
  }
  getAllDevice2() {
    return this.http.get('http://localhost:3000/api/getAllDevice2/');
  }
  updateDevice(id: string, data: any) {
    return this.http.put('http://localhost:3000/api/updateDevice/' + id, data);
  }
  deleteDevice(id: string) {
    return this.http.delete('http://localhost:3000/api/deleteDevice/' + id);
  }

  //add company device
  addCompanyDevice(data: any) {
    return this.http.post('http://localhost:3000/api/addCompanyDevice/', data);
  }

  updateCompanyDevice(data: any) {
    return this.http.post(
      'http://localhost:3000/api/updateCompanyDevices/',
      data
    );
  }

  deleteCompanyDevice(data: any) {
    return this.http.post(
      `http://localhost:3000/api/deleteCompanyDevice/`,
      data
    );
  }

  getAllCompanyDevice(id) {
    return this.http.get(`http://localhost:3000/api/getCompanyDevice/${id}`);
  }
  getAllCompanyDeviceWithoutId() {
    return this.http.get(`http://localhost:3000/api/getCompanyDeviceNew`);
  }

  //add company device extra

  //detect company  Device Add or delete

  deleteCompanyDeviceDetect(data: any) {
    return this.http.post(
      'http://localhost:3000/api/companyDeviceMonitorDelete/',
      data
    );
  }
  addCompanyDeviceDetect(data: any) {
    return this.http.post(
      'http://localhost:3000/api/companyDeviceMonitorAdd/',
      data
    );
  }

  //getAllCompany Device

  listCompanyDevice() {
    return this.http.get('http://localhost:3000/api/listCompanyDevice');
  }

  getAllNewCompanyDeviceById(id) {
    return this.http.get(
      `http://localhost:3000/api/getCompanyDeviceNewById/${id}`
    );
  }
  deleteNewComapanyDevice(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/deleteNewComapnyDevice/' + id
    );
  }
  updateNewCompanyDevice(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updateNewCompanyDevice/' + id,
      data
    );
  }

  //mqtf

  getAllMqtfLogRows(page, size, filterData: any) {
    return this.http.post(
      `http://localhost:3000/api/getAllMqtfLogRows?page=${page}&size=${size}`,
      filterData
    );
  }
  getAllMqtfLogs(page, size, filterData: any) {
    return this.http.post(
      `http://localhost:3000/api/getAllMqtfLogs?page=${page}&size=${size}`,
      filterData
    );
  }
  getAllMqtfLogsWithoutPegi() {
    return this.http.get('http://localhost:3000/api/getAllMqtfLogsWithoutPegi');
  }

  //divisions

  addDivisions(data: any) {
    return this.http.post('http://localhost:3000/api/v1/category', data);
  }

  getAllDivision(headers: HttpHeaders) {
    return this.http.get('http://localhost:3000/api/v1/category',  { headers: headers });
  }

  updateDivisionById(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updateDivision/' + id,
      data
    );
  }
  deleteDivision(id: string) {
    return this.http.delete('http://localhost:3000/api/deleteDivision/' + id);
  }

  //sub divisions

  addSubCategory(data: any) {
    return this.http.post('http://localhost:3000/api/v1/subcategory', data);
  }

  getAllSubCategory(cat_id) {
    return this.http.get(`http://localhost:3000/api/v1/subcategoryByCategory/${cat_id}`);
  }

  getAllSubDivision() {
    return this.http.get('http://localhost:3000/api/getAllSubDivision');
  }

  updateSubDivisionById(id: string, data: any) {
    return this.http.put(
      'http://localhost:3000/api/updateSubDivision/' + id,
      data
    );
  }
  deleteSubDivision(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/deleteSubDivision/' + id
    );
  }

  //sub sub category

  addSubSubCategory(data: any) {
    return this.http.post('http://localhost:3000/api/v1/subSubcategory', data);
  }
  getAllSubSubCategory() {
    return this.http.get('http://localhost:3000/api/v1/subSubcategory');
  }

  //quiz

  addQuiz(data: any, subCatId) {
    return this.http.post(
      `http://localhost:3000/api/v1/quiz?subCatId=${subCatId}`,
      data
    );
  }

  //member

  addMember(data: any) {
    return this.http.post('http://localhost:3000/api/addMember', data);
  }
  getAllMember() {
    return this.http.get('http://localhost:3000/api/listMember');
  }

  //adddol

  addProtik(data: any) {
    return this.http.post('http://localhost:3000/api/addProtik', data);
  }
  listProtik() {
    return this.http.get('http://localhost:3000/api/listProtik');
  }
}
