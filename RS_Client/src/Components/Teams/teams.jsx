import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { memberAction } from "../../Store";

function Teams() {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const members = useSelector((state) => state.member.members);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/members`, { userId: user.id })
      .then((res) => {
        dispatch(memberAction.addMembers(res.data));
      })
      .catch((error) => {});
  }, []);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/send-link`, {
        from: user.email,
        to: values.email,
        id: user.id,
        subject: "Member Invitation",
        text: ` Accept Invitation=http://localhost:3000/register/user/${values.email}`,
      })
      .then((res) => {
        toast({
          position: "top-right",
          title: "Sent Succesfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/members`, {
            userId: user.id,
          })
          .then((res) => {
            dispatch(memberAction.addMembers(res.data));
          })
          .catch((error) => {});
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top-right",
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const showaddmember = () => {
    onOpen();
  };
  return (
    <div>
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}>
        <ModalOverlay backgroundColor="rgba(0, 0, 0, 0.8)" />
        <ModalContent rounded="base">
          <ModalHeader
            fontSize={26}
            fontWeight="medium"
            className="text-[#666]">
            Add Members
          </ModalHeader>
          <ModalCloseButton mt="12px" />
          <ModalBody>
            <div className=" border-t border-gray-300 w-full"></div>
            <div className="mt-[20px]">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}>
                <Form>
                  <div>
                    <Field
                      className="p-[8px] w-full border border-gray-300 outline-none "
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error text-red-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="absolute bottom-[16px] right-[20px] ring-1 ring-blue-400 py-[8px] px-[25px] bg-blue-400 hover:bg-blue-500 text-white">
                    ADD
                  </button>
                </Form>
              </Formik>

              <div className="flex gap-[10px] items-center mt-[20px] ">
                <div className="ml-[3px]">
                  <input type="checkbox" defaultChecked />
                </div>
                <div>
                  <p className="text-[#666]">Send an invite email</p>
                </div>
              </div>
              <div className=" border-t border-gray-300 mt-[20px] w-full"></div>
            </div>
          </ModalBody>
          <ModalFooter className="space-x-2">
            <button
              onClick={onClose}
              className="mr-[100px] bg-white hover:text-blue-400 border py-[7px] px-[25px] border-blue-400">
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="text-[1.714rem] text-[#666] mb-[30px]">Teams</div>
      <Tabs size="md" variant="enclosed">
        <TabList className="space-x-1">
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            MEMBERS
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            GROUPS
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            REMINDERS
          </Tab>
        </TabList>
        <TabPanels bg="white" border="1px" borderColor="gray.300">
          <TabPanel>
            <div>
              <div className="flex justify-between md:items-center flex-col md:flex-row gap-[15px]">
                <div className="flex gap-[20px] flex-1">
                  <div>
                    <Select rounded="none" placeholder="Show all">
                      <option value="">Show active</option>
                      <option value="">Show inactive</option>
                    </Select>
                  </div>
                  <div className="w-[400px]">
                    <Input
                      rounded="none"
                      type="text"
                      placeholder="Search by name or email"
                    />
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <button
                    onClick={showaddmember}
                    className="p-[12px] text-[14px] bg-blue-400 hover:bg-blue-500 text-white ">
                    ADD NEW MEMBER
                  </button>
                </div>
              </div>
              <div className="mt-[20px]">
                <div className="bg-[#e4eaee] px-[20px] py-[10px] text-[#999] border border-gray-300">
                  Members
                </div>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th display="flex" gap="5px">
                          <input type="checkbox" />
                          <div>Name</div>
                        </Th>
                        <Th>EMAIL</Th>
                        <Th>BILLABLE RATE</Th>
                        <Th>ROLE</Th>
                        <Th>GROUP</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>{user.name} (you)</Td>
                        <Td>{user.email}</Td>
                        <Td>change</Td>
                        <Td>
                          <div className="bg-blue-400 p-[2px] w-[60px] text-center text-white">
                            {user.role}
                          </div>
                        </Td>
                        <Td>Group</Td>
                      </Tr>
                      {user &&
                        members &&
                        members.map((member) => {
                          return (
                            <Tr key={member.id}>
                              <Td>
                                {member.isUser
                                  ? member.email.substring(0, 5).toUpperCase()
                                  : "(NOT JOINED YET)"}
                              </Td>
                              <Td>{member.email}</Td>
                              <Td>change</Td>
                              <Td>
                                <div className="bg-blue-400 p-[2px] w-[60px] text-center text-white">
                                  {member.role}
                                </div>
                              </Td>
                              <Td>Group</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div></div>
          </TabPanel>
          <TabPanel>
            <div></div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Teams;
