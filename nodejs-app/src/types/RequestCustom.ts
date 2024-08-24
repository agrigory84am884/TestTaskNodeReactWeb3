export class RequestCustom extends Request {
    user!: User
}

class User {
    userId!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
}