import SigninForm, { Quote } from "../components/signinCard";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <SigninForm />
      <Quote />
    </div>
  );
};

export default Signup;