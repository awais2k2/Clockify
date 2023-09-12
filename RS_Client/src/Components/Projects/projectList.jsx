import { Td, Tr, Box } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProjectList(props) {
  const project = props.project;
  const navigate = useNavigate();
  const [showoptions, setShowoptions] = useState(false);
  const showOption = () => {
    setShowoptions(!showoptions);
  };

  const specificProject = (id) => {
    navigate(`${id}`);
  };
  return (
    <Tr key={project.id} className="hover:shadow-lg ">
      <Td>
        <Box display="flex" alignItems="center" gap="10px">
          <input type="checkbox" />
          <Box
            bg={project.statuscolor}
            className={`h-2 w-2 rounded-full`}></Box>
          {project.name}
        </Box>
      </Td>
      <Td
        className="cursor-pointer"
        onClick={() => {
          specificProject(project.id);
        }}>
        {project.client.name}
      </Td>
      <Td
        className="cursor-pointer"
        onClick={() => {
          specificProject(project.id);
        }}>
        0,00h
      </Td>
      <Td
        className="cursor-pointer"
        onClick={() => {
          specificProject(project.id);
        }}>
        0.00 USD
      </Td>
      <Td>--</Td>
      <Td
        onClick={() => {
          specificProject(project.id);
        }}
        className="cursor-pointer">
        {project.public ? "Public" : "Private"}
      </Td>
      <Td>
        <div className="flex items-center gap-[30px] justify-end ">
          <div className="w-[1px] h-[30px] bg-gray-300"></div>
          <div className="cursor-pointer hover:text-blue-400">
            {<AiOutlineEdit size={20} />}
          </div>
          <div className="w-[1px] h-[30px] bg-gray-300 "></div>
          <div>
            <div
              onClick={showOption}
              className="relative cursor-pointer hover:text-blue-400 ">
              {<SlOptionsVertical size={20} />}
            </div>
            {showoptions && (
              <div className="absolute z-50 right-[30px]  bg-white shadow-md">
                <div className="p-4 hover:bg-gray-300">Set as template</div>
                <div className="p-4 hover:bg-gray-300">Archive</div>
              </div>
            )}
          </div>
        </div>
      </Td>
    </Tr>
  );
}

export default ProjectList;
