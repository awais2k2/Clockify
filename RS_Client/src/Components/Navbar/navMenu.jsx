import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userAction } from "../../Store";
import { useNavigate } from "react-router-dom";

function NavMenu() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const logouthandler = async () => {
    localStorage.removeItem("jwt");
    dispatch(userAction.logout());
    navigation("/register");
  };

  return (
    <div className="absolute z-50 right-0 w-[280px] bg-white text-[#666] shadow-lg border border-gray-200">
      <div>
        <div className=" py-[0.678rem] px-[1.4286rem]">
          <div className="text-black ">{user.name}</div>
          <div className="text-[#999] mt-[5px]">{user.email}</div>
        </div>
        <div className="hover:bg-gray-300  py-[0.678rem] px-[1.4286rem]">
          Profile
        </div>
        <div className="flex justify-between items-center hover:bg-gray-300  py-[0.678rem] px-[1.4286rem]">
          <div>Dark theme</div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-white border  peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white  peer-checked:bg-blue-400"></div>
            </label>
          </div>
        </div>
        <div className="hover:bg-gray-300  py-[0.678rem] px-[1.4286rem]">
          Download apps
        </div>
        <div className="flex justify-between items-center hover:bg-gray-300  py-[0.678rem] px-[1.4286rem]">
          <div>Try chat app</div>
          <div className="bg-green-600 text-[white] text-[10px] py-[3px] px-[10px]">
            NEW
          </div>
        </div>
        <div className="border-t w-[100%]   border-gray-200"></div>
        <div
          onClick={logouthandler}
          className="hover:bg-gray-300  py-[0.678rem] px-[1.4286rem] mb-[10px]">
          Logout
        </div>
      </div>
    </div>
  );
}

export default NavMenu;
