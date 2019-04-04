import { IUser } from './user.interface';

export class User implements IUser {

  public username: string;
  public name: string;
  public password: string;
  public sensorId: string;
  public cellPhone: string;
  public homePhone: string;
  public email: string;
  public address: string;
  public areaCode: string;

  constructor(username?: string, password?: string, sensorId?: string) {
      this.username = username;
      this.password = password;
      this.sensorId = sensorId;
  }
}
