import {useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ()=>{
    const  navigate = useNavigate();
    const [errors,setError] = useState([]);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const onChangeHandler = (event)=>{
        setUser({
            ...user,
            [event.target.name]: event.target.value 
        });
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/users/`,{
            method:'POST',
            headers:{
                'Content-type':'Application/json'
            },
            body:JSON.stringify(user)
        })
        .then((res)=>{
            if(res.ok){
                navigate('/login')
            }else{
                res.json()
            }
        })
        .then((result)=>{
            let errorArray = [];
            for(let error in result){
                errorArray.push(result[error]);
            }
            setError(errorArray);
        });
    }
    return(
        <div className="card card_signup">
            <h1>Sign Up</h1>
            <p>Register an account.</p>
            <form onSubmit={submitHandler}>
                <input onChange={onChangeHandler} className="form_field" name="username" type="text" value={user.name} placeholder="Full Name" required />
                <input onChange={onChangeHandler} className="form_field" name="email" type="email" value={user.email} placeholder="E-mail" required />
                <input onChange={onChangeHandler} className="form_field" name="password" type="password" value={user.password} placeholder="Password" required />
                <button className="form_btn" type="submit">Sign Up</button>
            </form>
            {errors.length !== 0 ? (
                <>
                {
                errors.map(er=>(
                    <p>{er}</p>
                ))
                }
                </>
            ) : null}
        </div>
    )
}
export default SignUp;