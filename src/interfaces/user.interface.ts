export interface LoginRequestBody {
  email: string;
  password: string;
}
 
enum Role {
    Admin = 'Admin',
    User = 'User'
}

export interface RegisterRequestBody extends LoginRequestBody{
   role : Role,
   name:string,

}