import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Logincss from '../Login.module.css';
import {AuthContext} from "../context/AuthContext";

const Login = ()=>{
    const navigate = useNavigate();
    const [loginCredentials, setLoginCredential] = useState({
        'username':'',
        'password':''
    });
    const [errors,setError] = useState('');
    const authContext = useContext(AuthContext);

    const onChangeHandler = (event)=>{
        setLoginCredential({
            ...loginCredentials,
            [event.target.name]:event.target.value
        })
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/auth/`,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(loginCredentials)
        })
        .then((res)=>{
            if(res.ok && res.status !== 400){
                return res.json()
                    .then(data=>{
                        console.log(data);
                        authContext.login(data.user, data.token);
                        navigate('/')
                    });
            } else if(!res.ok && res.status === 400){
                return res.json()
                    .then(responseData=>{
                        setError(responseData.non_field_errors[0]);
                    })
            }
        })
        .catch(err=>{
            alert(err);
        })
    }
    return(
        <div className={"card "+Logincss.card_signup}>
            <h1>Login</h1>
            <p>Login to your account.</p>
            <form onSubmit={submitHandler}>
                <input onChange={onChangeHandler} className={Logincss.form_field} name="username" type="text" value={loginCredentials.username} placeholder="Full Name" required />
                <input onChange={onChangeHandler} className={Logincss.form_field} name="password" type="password" value={loginCredentials.password} placeholder="Password" required />
                <button className="form_btn" type="submit">Login</button>
            </form>
            {errors && (
                <p>{errors}</p>
            )}
        </div>
    )
}
export default Login;

