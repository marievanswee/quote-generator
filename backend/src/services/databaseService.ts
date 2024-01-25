import {User} from '../models/User';

export class DatabaseService {

  public static findOne(user: User): boolean {
    if(user.password === 'test' && user.username === 'test') {
      return true;
    } else {
      return false
    }
  }
}
