import { useNavigate } from "react-router";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import ProjectTask from "./ProjectTask/projectTask";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { taskAction, memberAction } from "../../Store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SpecificProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const tasks = useSelector((state) => state.task.tasks);
  const [disablebtn, setDisablebtn] = useState(false);
  const [enteredTask, setEnteredtask] = useState("");
  const toast = useToast();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/tasks/${id}/tasks`)
      .then((res) => {
        dispatch(taskAction.addTasks(res.data));
      });
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/members`, { userId: user.id })
      .then((res) => {
        dispatch(memberAction.addMembers(res.data));
      })
      .catch((error) => {});
  }, []);

  const backToProject = () => {
    navigate("/projects");
  };

  const inputchangehandler = (e) => {
    setEnteredtask(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("tasks", { name: enteredTask, id: id })
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/projects/tasks/${id}`)
          .then((res) => {
            dispatch(taskAction.addTasks(res.data));
          });
        setEnteredtask("");
        toast({
          position: "top-right",
          title: "Task Added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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

  useEffect(() => {
    if (enteredTask.length > 0) {
      setDisablebtn(false);
    } else {
      setDisablebtn(true);
    }
  }, [enteredTask]);

  return (
    <>
      <div
        onClick={backToProject}
        className="text-blue-500 cursor-pointer hover:underline">
        Projects
      </div>
      <div className="text-[1.714rem] text-[#666] mb-[30px]">Teams</div>
      <Tabs size="md" variant="enclosed">
        <TabList className="space-x-1 sm:overflow-auto overflow-scroll">
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            TASKS
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            ACCESS
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            STATUS
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            FORECAST
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            NOTE
          </Tab>
          <Tab
            _selected={{ bg: "white" }}
            border="1px"
            borderColor="gray.300"
            borderBottom="none"
            rounded="none"
            bg="gray.200">
            SETTING
          </Tab>
        </TabList>
        <TabPanels bg="white" border="1px" borderColor="gray.300">
          <TabPanel>
            <div className="flex md:flex-row flex-col md:items-center justify-between gap-[20px] mt-[30px]">
              <div className="flex items-center gap-[20px]">
                <div className="bg-white">
                  <Select>
                    <option value="option1">Show Done</option>
                    <option value="option3">Show Active</option>
                    <option value="option2">Show All</option>
                  </Select>
                </div>
                <div className="bg-white">
                  <input
                    className="border p-[9px] boder-gray-300 focus:border-gray-300 outline-none"
                    type="text"
                    placeholder="Search by name"
                    bg="white"
                  />
                </div>
              </div>
              <div>
                <div className="flex  items-center gap-[20px]">
                  <input
                    onChange={inputchangehandler}
                    value={enteredTask}
                    className="border flex-1 p-[9px] boder-gray-300 outline-none focus:border-gray-300"
                    type="text"
                    placeholder="Add new task"
                    bg="white"
                  />
                  <button
                    disabled={disablebtn}
                    onClick={onSubmit}
                    className={`py-[10px] px-[30px] rounded-sm text-[14px] bg-blue-400 hover:bg-blue-500 text-white ${
                      disablebtn && "cursor-not-allowed"
                    } `}>
                    ADD
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-[30px] mb-[30px] ">
              <div className="bg-[#e4eaee] px-[20px]  py-[10px] text-[#999] border border-b-0 border-gray-300">
                Projects
              </div>
              <TableContainer bg="white">
                <Table variant="simple">
                  <Thead className="  text-[#999] border border-gray-300">
                    <Tr>
                      <Th>NAME</Th>
                      <Th>Assigness</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tasks &&
                      tasks.map((item) => {
                        return <ProjectTask key={item.id} task={item} />;
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel>
            <div>two</div>
          </TabPanel>
          <TabPanel>
            <div>three</div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default SpecificProject;
