export class CreateUserDto {
  userId: string;
  nickname: string;
  email: string;
  password: string | null;
  confirm_password: string | null;
  gender: string | null;
  token: string | null;
  google_login: boolean;
  session_if: string | null;
  create_time: Date;
}
