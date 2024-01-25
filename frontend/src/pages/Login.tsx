import {Input} from '../components/Input';
import {useState} from 'react';
import {Button} from '../components/Button';
import {User} from '../models/User';
import {useAuthenticate} from '../utils/hooks';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
  const { authenticate } = useAuthenticate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayError, setDisplayError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChangeUsername = (value: string) => {
    setUsername(value);
  }

  const handleChangePassword = (value: string) => {
    setPassword(value);
  }

  const handleLogin = async () => {
    try {
      const token = await authenticate({
        username: username,
        password: password
      });
      localStorage.setItem('token', token);
      navigate('/generator');
    } catch (error) {
      setDisplayError(true);
    }

  }

  return (
      <div className="h-screen flex flex-col items-center justify-center">
        {displayError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Wrong login</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
        )}
        <div className="rounded overflow-hidden shadow-lg">
          <div className="flex flex-col px-6 py-4">
            <div className="font-bold text-xl mb-2">Login</div>
            <div>
              <label>Username</label>
              <Input type='text' defaultValue={username} handleChange={handleChangeUsername}/>
            </div>
            <div>
              <label>Password</label>
              <Input type='text' defaultValue={password} handleChange={handleChangePassword}/>
            </div>
          </div>
          <div className="flex flex-row px-6 pt-4 pb-2">
            <Button title="Login" color="bg-orange-400 hover:bg-orange-500" handleClick={handleLogin}/>
          </div>
        </div>
      </div>

  )
}
