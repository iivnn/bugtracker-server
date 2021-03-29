import Project from "../classes/Project";
import User from "../classes/User";

export default function setModels(){
    User.setModel();
    Project.setModel();
}