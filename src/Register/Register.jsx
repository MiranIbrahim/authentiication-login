import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [viewPass, setViewPass] = useState(false);
  const [regFailed, setRegFailed] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.checkbox.checked;
    console.log(email, password, accepted);
    setRegFailed("");
    setSuccess("");

    if (password.length < 6) {
      setRegFailed("password should be 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegFailed("Atleast one uppercase needed");
      return;
    }
    else if (!accepted) {
        setRegFailed("Please accept out terms and conditions");
        return;
      }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        
        console.log(result.user);
        setSuccess("Successfully Registered");
        sendEmailVerification(result.user)
        .then(() => {
            alert('check your email');
        });

      })
      .catch((error) => {
        console.log(error);
        setRegFailed(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 max-w-lg shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={viewPass ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  className="absolute top-4 right-3"
                  onClick={() => setViewPass(!viewPass)}
                >
                  {viewPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
                <input type="checkbox" className="label" name="checkbox" id="checkbox" /> <span>Agree with terms and conditions?</span>
            </div>
            <div className="">
                <span>Already have an account? Please </span>
                <Link to='/login'>Login</Link>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {regFailed && <p className="text-red-700">{regFailed}</p>}
          {success && <p className="text-green-700">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
