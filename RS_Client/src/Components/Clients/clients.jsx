import {
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { clientAction } from "../../Store";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Client() {
  const [disablebtn, setDisablebtn] = useState(false);
  const [enteredClient, setEnteredClient] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.client.clients);
  const user = useSelector((state) => state.user.user);
  const inputchangehandler = (e) => {
    setEnteredClient(e.target.value);
  };

  useEffect(() => {
    if (enteredClient.length > 0) {
      setDisablebtn(false);
    } else {
      setDisablebtn(true);
    }
  }, [enteredClient]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/client/clients`, {
        userId: user.id,
      })
      .then((res) => {
        dispatch(clientAction.addClients(res.data));
      })
      .catch((error) => {});
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/client`, {
        name: enteredClient,
        id: user.id,
      })
      .then(() => {
        toast({
          position: "top-right",
          title: "Client Created ",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        axios
          .post(`${process.env.REACT_APP_API_URL}/client/clients`, {
            userId: user.id,
          })
          .then((res) => {
            dispatch(clientAction.addClients(res.data));
          })
          .catch((error) => {});
        setEnteredClient("");
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

  return (
    <div>
      <div className="text-[1.714rem] text-[#666]">Client</div>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-[20px] mt-[30px]">
        <div className="flex items-center gap-[20px]">
          <div className="bg-white">
            <Select>
              <option value="option1">Show Active</option>
              <option value="option3">Show Archive</option>
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
              value={enteredClient}
              className="border flex-1 p-[9px] boder-gray-300 outline-none focus:border-gray-300"
              type="text"
              placeholder="Add new Client"
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
      <div className="mt-[30px]">
        <TableContainer bg="white">
          <Table variant="simple">
            <Thead className=" bg-[#e4eaee] px-[20px] py-[10px] text-[#999] border border-gray-300">
              <Tr>
                <Th>NAME</Th>
                <Th>ADDRESS</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients &&
                clients.map((client) => {
                  return (
                    <Tr key={client.id}>
                      <Td>{client.name}</Td>
                      <Td>--</Td>
                      <Td>
                        <div className="flex items-center gap-[30px] justify-end ">
                          <div className="w-[1px] h-[30px] bg-gray-300"></div>
                          <div className="cursor-pointer hover:text-blue-400">
                            {<AiOutlineEdit size={22} />}
                          </div>
                          <div className="w-[1px] h-[30px] bg-gray-300"></div>
                          <div className="cursor-pointer hover:text-blue-400">
                            {<SlOptionsVertical size={22} />}
                          </div>
                          <div className="w-[1px] h-[30px] bg-gray-300"></div>
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Client;
