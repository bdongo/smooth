import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Form.css"; 
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    return (
        <div className='login-container'>
            <div className='login-form'> 
                <form className="session-form" onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" />
                    <h2>LOGIN</h2>
                    <div className="errors">{errors?.email}</div>
                        <input type="text"
                            value={email}
                            onChange={update('email')}
                            placeholder="Email"
                        />
                    <div className="errors">{errors?.password}</div>
                        <input type="password"
                            value={password}
                            onChange={update('password')}
                            placeholder="Password"
                        />
                    <input
                        type="submit"
                        value="Log In"
                        disabled={!email || !password}
                        id='login-button'
                    />
                    <button id='demo-login-button'>
                        LOGIN AS DEMO USER
                    </button>
                <Link to='/signup' id='signup-link'>Need to create an account?</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;