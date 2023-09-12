import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useToast } from "@chakra-ui/react";

import { useGetUser } from "../getUser";
import * as Yup from "yup";
import axios from "axios";

function Login() {
  const { fetchuser } = useGetUser();
  const toast = useToast();
  const Navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, values)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("jwt", res.data.token);
        }
        fetchuser();
        toast({
          position: "top-right",
          title: "Login Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        Navigate("/tracker");
      })
      .catch((error) => {
        console.log(error);
        toast({
          position: "top-right",
          title: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <div className="bg-white xl:w-[380px] lg:w-[400px] md:w-[60%] sm:w-[80%]  mx-[20px] sm:mx-auto mt-[200px]  shadow-inner p-[35px] border ">
      <div className="font-semibold  text-[20px] mb-[20px]">Log in</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        <Form>
          <div>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className=" p-[8px] w-full border border-gray-300 outline-none "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message text-red-600"
            />
          </div>
          <div className="mt-[12px]">
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="p-[8px] w-full border border-gray-300 outline-none "
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message text-red-600"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-[20px] bg-blue-400 hover:bg-blue-500 text-white py-[10px]">
            LOG IN
          </button>
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
  );
}

export default Login;
