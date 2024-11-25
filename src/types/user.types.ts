// user.types.ts
export interface User {
    id: string;
    email: string;
    password: string;
    name?: string; // Optional field
  }
  
  export interface CreateUserInput {
    email: string;
    password: string;
    name?: string;
  }
  //login
 
  