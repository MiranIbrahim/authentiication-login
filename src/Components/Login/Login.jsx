import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [successful, setSuccessful] = useState("");
  const [failed, setFailed] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setSuccessful("");
    setFailed("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        if(!result.user.emailVerified){
          alert("please verify your email");
          return;
        }
        setSuccessful("Login In successful");
      })
      .catch((error) => {
        setFailed(error);
      });
  };

  const emailRef = useRef(null);
  const handleReset = () =>{
    const email = emailRef.current.value;

    if(!email) {
      alert('please enter an email');
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      alert('Invalid mail address');
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Recovery mail sent!!');
    })
    .catch(error =>{
      console.log(error.message);
    });
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <p>{successful}</p>
            <p>{failed && 'Invalid Information'}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type= {showPass? 'text' : 'password'}
                  placeholder="password"
                  className="input input-bordered w-full"
                  name="password"
                  required
                />
                <span onClick={() => setShowPass(!showPass)} className="absolute top-4 right-3">
                  { showPass? <FaEye></FaEye> :
                  <FaEyeSlash></FaEyeSlash>}
                </span>
              </div>
              <label className="label">
                <a onClick={handleReset} className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            
            <p className="label">
              New to this site? Please<Link to="/register">Register</Link>{" "}
            </p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
