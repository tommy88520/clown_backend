export class CreateUserDto {
  userId: string;
  nickname: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  token: string | null;
  create_time: Date;
}
