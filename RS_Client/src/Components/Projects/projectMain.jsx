import { BiChevronDown } from "react-icons/bi";
import { useState, useRef } from "react";
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import ProjectTable from "./projectTable";
import { useDispatch } from "react-redux";
import { projectAction } from "../../Store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  client: Yup.string().required("Client Name is required"),
});

function ProjectMain() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const childRef = useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.user.user);
  const clients = useSelector((state) => state.client.clients);

  const initialValues = {
    name: "",
    client: "",
    color: "#000000",
    isVerified: false,
  };

  const onSubmit = (values) => {
    values.id = user.id;
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects`, values)
      .then((res) => {
        toast({
          position: "top-right",
          title: "Project Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        axios
          .post(`${process.env.REACT_APP_API_URL}/projects/projects`, {
            userId: user.id,
          })
          .then((res) => {
            dispatch(projectAction.addProjects(res.data));
          });
      })
      .catch((err) => {
        toast({
          position: "top-right",
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleButtonClick = (value) => {
    setInputValue(value);
    setTimeout(() => {
      if (childRef.current) {
        childRef.current.handleFunctionInChild();
      }
    }, 250);
  };

  return (
    <>
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}>
        <ModalOverlay backgroundColor="rgba(0, 0, 0, 0.8)" />
        <ModalContent rounded="base">
          <ModalHeader
            fontSize={24}
            fontWeight="medium"
            className="text-[#666]">
            Create new project
          </ModalHeader>
          <ModalCloseButton mt="12px" />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              <Form>
                <div className="flex  gap-[15px]">
                  <div className="flex-1">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter project name"
                      className="p-[8px] w-full border border-gray-300 outline-none "
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message text-red-600"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      list="browser"
                      id="client"
                      name="client"
                      placeholder="Add/Find clients"
                      className="p-[8px] w-full border border-gray-300 outline-none "
                    />
                    {clients && (
                      <datalist id="browser">
                        {clients.map((client) => {
                          return <option key={client.id} value={client.name} />;
                        })}
                      </datalist>
                    )}

                    <ErrorMessage
                      name="client"
                      component="div"
                      className="error-message text-red-600"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[10px] mt-[10px]">
                  <div className="p-[5px] border border-gray-300 inline-block">
                    <Field type="color" id="color" name="color" />
                  </div>
                  <div>
                    <label className="flex gap-[10px] items-center">
                      <Field
                        type="checkbox"
                        id="isVerified"
                        name="isVerified"
                        className="checkbox"
                      />
                      <p> Public</p>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="absolute bottom-[15px] right-[20px] ring-1 ring-blue-400 py-[8px] px-[25px] bg-blue-400 hover:bg-blue-500 text-white">
                  CREATE
                </button>
              </Form>
            </Formik>
          </ModalBody>
          <ModalFooter className="space-x-2">
            <button
              onClick={onClose}
              className="mr-[120px] bg-white hover:text-blue-400 border py-[7px] px-[25px] border-blue-400">
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="text-[#999]">
        <div className="flex justify-between items-center">
          <div className="text-[1.714rem] text-[#666]">Projects</div>
          <button
            onClick={onOpen}
            className="p-[12px] text-[14px] bg-blue-400 hover:bg-blue-500 text-white ">
            CREATE NEW PROJECT
          </button>
        </div>
        <div className="flex  flex-col  lg:flex-row items-center gap-[20px] py-[10px] px-[25px] bg-white mt-[30px] border border-gray-300">
          <div className="flex lg:w-auto w-full justify-between items-center gap-[10px]">
            <div className="text-[#999]">FILTER</div>
            <div className="w-[1px] hidden lg:block h-[40px] mx-[20px]  bg-gray-300"></div>
            <div className="flex gap-[2px] items-center cursor-pointer">
              Active
              <BiChevronDown size={18} className="mt-[4px]" />
            </div>
            <div className="w-[1px] hidden lg:block h-[40px] mx-[20px]  bg-gray-300"></div>
            <div className="flex gap-[2px] items-center cursor-pointer">
              Client
              <BiChevronDown size={18} className="mt-[4px]" />
            </div>
            <div className="w-[1px] hidden lg:block h-[40px] mx-[20px]  bg-gray-300"></div>
            <div className="flex gap-[2px] items-center cursor-pointer">
              Access
              <BiChevronDown size={18} className="mt-[4px]" />
            </div>
            <div className="w-[1px] hidden lg:block h-[40px] mx-[20px]  bg-gray-300"></div>
            <div className="flex gap-[2px] items-center cursor-pointer">
              Billing
              <BiChevronDown size={18} className="mt-[4px]" />
            </div>
            <div className="w-[1px] hidden lg:block h-[40px] mx-[20px]  bg-gray-300"></div>
          </div>
          <div className="flex flex-1 w-full gap-[10px] items-center">
            <div className="text-[#999]">
              <TfiSearch size={24} className="" />
            </div>
            <div className="flex-1">
              <input
                onChange={(e) => {
                  handleButtonClick(e.target.value);
                }}
                type="text"
                placeholder="What are u working on "
                className="w-full hover:ring-1 focus:ring-1 focus:outline-none pl-[6px] ring-gray-300 flex-1 py-[10px] "
              />
            </div>
            <div>
              <button className="border-blue-400 p-[10px] bg-white hover:bg-blue-400 border text-blue-400 hover:text-white">
                APPLY FILTER
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <div className="bg-[#e4eaee] px-[20px] py-[10px] text-[#999] border border-gray-300">
            Projects
          </div>
          <ProjectTable ref={childRef} inputValue={inputValue} />
        </div>
      </div>
    </>
  );
}

export default ProjectMain;
