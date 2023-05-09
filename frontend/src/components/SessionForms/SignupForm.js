import "./Form.css"; 
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = field => {
        let setState;

        switch (field) {
            case 'email':
                setState = setEmail;
                break;
            case 'username':
                setState = setUsername;
                break;
            case 'password':
                setState = setPassword;
                break;
            case 'password2':
                setState = setPassword2;
                break;
            default:
                throw Error('Unknown field in Signup Form');
        }

        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email,
            username,
            password
        };

        dispatch(signup(user));
    }

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <form className="session-form" id='session-signup' onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" />
                    <h2>Sign Up</h2>
                    {/* <div className="errors">{errors?.email}</div> */}
                        <input type="text"
                            value={email}
                            onChange={update('email')}
                            placeholder="Email"
                            required
                        />
                    {/* <div className="errors">{errors?.username}</div> */}
                        <input type="text"
                            value={username}
                            onChange={update('username')}
                            placeholder="Username"
                            required
                        />
                    {/* <div className="errors">{errors?.password}</div>         */}
                        <input type="password"
                            value={password}
                            onChange={update('password')}
                            placeholder="Password"
                            required
                        />
                    {/* <div className="errors" id='error-messages'>
                        {password !== password2 && 'Confirm password field must match'}
                    </div> */}
                        <input type="password"
                            value={password2}
                            onChange={update('password2')}
                            placeholder="Confirm Password"
                            required
                        />
                    <input
                        type="submit"
                        value="Sign Up"
                        disabled={!email || !username || !password || password !== password2}
                        id='signup-button'
                    />
                    <Link to='/login' id='login-link'>Already have an account?</Link>
                </form>
                <div className='errors'>
                    <ul> 
                        <li>{errors?.email}</li>
                        <li>{errors?.username} </li>
                        <li>{errors?.password} </li>
                        <li>{password !== password2 && 'Confirm password field must match'} </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;