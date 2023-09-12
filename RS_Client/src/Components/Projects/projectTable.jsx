import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { forwardRef, useState, useEffect } from "react";
import React from "react";

import ProjectList from "./projectList";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { projectAction } from "../../Store";

const ProjectTable = forwardRef(({ inputValue }, ref) => {
  const allprojects = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects/projects`, {
        userId: user.id,
      })
      .then((res) => {
        dispatch(projectAction.addProjects(res.data));
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setprojects([...allprojects]);
  }, [allprojects]);

  const handleFunctionInChild = () => {
    if (inputValue === "") {
      setprojects([...allprojects]);
    } else {
      const filteredProjects = allprojects.filter((project) =>
        project.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setprojects(filteredProjects);
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleFunctionInChild,
  }));

  return (
    <>
      <TableContainer bg="white" ref={ref}>
        <Table variant="simple" color="black">
          <Thead>
            <Tr>
              <Th display="flex" gap="5px">
                <input type="checkbox" />
                <div>Name</div>
              </Th>
              <Th>CLIENT</Th>
              <Th>TRACKED</Th>
              <Th>AMOUNT</Th>
              <Th>PROGRESS</Th>
              <Th>ACCESS</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects &&
              projects.map((project) => {
                return <ProjectList key={project.id} project={project} />;
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
});

export default ProjectTable;
