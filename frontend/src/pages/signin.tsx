import SigninForm, { Quote } from "../components/signinCard";

const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <SigninForm />
      <Quote />
    </div>
  );
};

export default Signin;