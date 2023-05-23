import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Form.css"; 
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { login, clearSessionErrors, receiveErrors } from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const [blank, setBlank] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            return dispatch(receiveErrors({email : 'Please fill in all inputs'}))
        }
        dispatch(login({ email, password }))
    };

    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(login({ email: 'demo-user@appacademy.io', password: 'Password!' }))
    }


    return (
        <div className='login-container'>
            <div className='login-form'> 
                <form className="session-form" onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" />
                    <h2>LOGIN</h2>
                        <input type="text"
                            value={email}
                            onChange={update('email')}
                            placeholder="Email"
                        />
                        <input type="password"
                            value={password}
                            onChange={update('password')}
                            placeholder="Password"
                        />
                    <input
                        type="submit"
                        value="Log In"
                        // disabled={!email || !password}
                        id='login-button'
                    />
                    <button id='demo-login-button' onClick={handleDemo}>
                        LOGIN AS DEMO USER
                    </button>
                <Link to='/signup' id='signup-link'>Need to create an account?</Link>
                    <div className="errors">
                        <ul>{blank}</ul>
                        <ul>{errors?.email} </ul>
                        <ul>{errors?.password}</ul>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
