import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  privacy: Yup.boolean().oneOf([true], "You must accept the privacy policy"),
});

function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    email: "",
    password: "",
    terms: false,
    privacy: false,
  };
  const handleSubmit = async (values) => {
    const { email, password } = values;

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        toast({
          position: "top-right",
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((error) => {
        toast({
          position: "top-right",
          title: "Account Not created.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="mt-[90px]">
        <div className="text-center">
          <h1 className="text-[32px] font-medium mb-[12px]">
            Get started with Clockify
          </h1>
          <p className="mb-[12px] text-[18px] text-[#666] font-normal">
            Create a free account to start tracking time and supercharge your
            productivity.
          </p>
          <p className="mb-[20px] text-[#999]">
            No credit card required · Unsubscribe at any time
          </p>
        </div>
      </div>
      <div className="xl:w-[380px] lg:w-[400px] md:w-[60%] bg-white sm:w-[80%] mx-[20px] sm:mx-auto  shadow-inner p-[35px] border ">
        <div className="font-semibold mb-[20px] text-[18px]">Sign up</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Enter email"
                className="p-[8px] w-full border border-gray-300 outline-none "
              />
              <ErrorMessage
                className="text-red-600 "
                name="email"
                component="div"
              />
            </div>
            <div className="mt-[10px]">
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="p-[8px] w-full border border-gray-300 outline-none "
              />
              <ErrorMessage
                className="text-red-600"
                name="password"
                component="div"
              />
            </div>
            <div className="mt-[15px]">
              <label className="flex gap-[10px] items-center">
                <Field type="checkbox" name="terms" />
                Accept Terms and Conditions
              </label>
              <ErrorMessage
                className="text-red-600 "
                name="terms"
                component="div"
              />
            </div>
            <div className="mt-[5px]">
              <label className="flex gap-[10px] items-center">
                <Field type="checkbox" name="privacy" />
                Accept Privacy Policy
              </label>
              <ErrorMessage
                className="text-red-600 "
                name="privacy"
                component="div"
              />
            </div>
            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-[10px]">
                CREATE FREE ACCOUNT
              </button>
            </div>
          </Form>
        </Formik>

        <div className="mt-[15px] text-center">
          <div>OR</div>
        </div>
        <div className="mt-[15px]">
          <button className="w-full border hover:bg-gray-200 py-[10px]">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
