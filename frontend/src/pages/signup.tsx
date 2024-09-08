import { Ouote } from "../components/Quote";
import SignupForm from "../components/signupCard";

const Signup = () => {
  console.log('Signup component rendered');
  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      <div>
        <SignupForm />
      </div>
      <div>
        <Ouote />
      </div>
    </div>
  );
};

export default Signup;
