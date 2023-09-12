import ProjectMain from "./projectMain";
import { useSelector } from "react-redux";
import SpecificProject from "./specificProject.jsx";
function Project() {
  const gotoproject = useSelector((state) => state.project.gotoproject);
  return <>{gotoproject ? <SpecificProject /> : <ProjectMain />}</>;
}

export default Project;
