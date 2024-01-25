import {User} from '../models/User';

export class DatabaseService {

  public static findOne(user: User): boolean {
    return user.password === 'test' && user.username === 'test';
  }
}
