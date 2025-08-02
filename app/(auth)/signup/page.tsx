import FormLayout from "@/features/auth/components/layouts";
import SignUpForm from "@/features/auth/components/sign-up-form";

const SignUpPage = () => {
  return (
    <FormLayout
      title={"Sign Up"}
      description={"Create your account"}
      type={"sign up"}
    >
      <SignUpForm />
    </FormLayout>
  );
};

export default SignUpPage;
