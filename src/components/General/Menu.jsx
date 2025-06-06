import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { RxDashboard } from "react-icons/rx";
import { GiScooter } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { LuBookCheck } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { GoReport } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";
import { MoonLoader } from "react-spinners";

const MenuScreen = ({ ViewData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col w-[275px] bg-[#1A1919] min-h-screen px-4">
      <Link to="/" className="w-[300px mt-5">
        <div className="w-full h-24 rounded-lg flex items-center justify-center">
          <img src={logo} alt="Logo" className="max-h-full max-w-full object-contain" />
        </div>
      </Link>
      <div className="w-full h-auto flex flex-col gap-1 px-6">
        <Link
          to="/dashboard"
          className={`flex gap-2 items-center py-3 mt-5 rounded-md duration-300 ${
            ViewData === "Dashboard" ? "bg-[#E60000]" : ""
          }`}
        >
          {ViewData === "Dashboard" ? (
            <div className="bg-white h-8 w-1 rounded-md"></div>
          ) : null}
          <RxDashboard className="text-white w-6 h-6" />
          <label className="text-white text-lg cursor-pointer">Dashboard</label>
        </Link>
        <Link
          to="/listings"
          className={`flex gap-2 items-center py-3 rounded-md duration-300  ${
            ViewData === "Listing" ? "bg-[#E60000]" : ""
          }`}
        >
          {ViewData === "Listing" ? (
            <div className="bg-white h-8 w-1 rounded-md"></div>
          ) : null}
          <GiScooter className="text-white w-6 h-6 " />
          <label className="text-white text-lg cursor-pointer">Listings</label>
        </Link>
        <Link
          to="/bookings"
          className={`flex gap-2 items-center py-3 rounded-md duration-300  ${
            ViewData === "Booking" ? "bg-[#E60000]" : ""
          }`}
        >
          {ViewData === "Booking" ? (
            <div className="bg-white h-8 w-1 rounded-md"></div>
          ) : null}
          <LuBookCheck className="text-white w-6 h-6 " />
          <label className="text-white text-lg cursor-pointer">Bookings</label>
        </Link>
        <Link
          to="/messaging"
          className={`flex gap-2 items-center py-3  duration-300  rounded-md ${
            ViewData === "Messaging" ? "bg-[#E60000]" : ""
          }`}
        >
          {ViewData === "Messaging" ? (
            <div className="bg-white h-8 w-1 rounded-md"></div>
          ) : null}
          <LuMessageCircleMore className="text-white w-6 h-6" />
          <label className="text-white text-lg cursor-pointer">Messaging</label>
        </Link>

        <Link
          to="/transactions"
          className={`flex gap-2 items-center py-3 duration-300 rounded-lg ${
            ViewData === "Transactions" ? "bg-[#E60000]" : ""
          }`}
        >
          {ViewData === "Transactions" ? (
            <div className="bg-white h-8 w-1 duration-300 rounded-md"></div>
          ) : null}
          <AiOutlineTransaction className="text-white w-6 h-6" />
          <label className="text-white text-lg cursor-pointer">
            Transactions
          </label>
        </Link>

        <Link
          to="/profile"
          className={`flex gap-2 items-center py-3 duration-300 rounded-lg ${
            ViewData === "Profile" ? "bg-[#E60000]" : ""
          }`}
        >
          {ViewData === "Profile" ? (
            <div className="bg-white h-8 w-1 duration-300 rounded-md"></div>
          ) : null}
          <VscAccount className="text-white w-6 h-6 " />
          <label className="text-white text-lg cursor-pointer">Profile</label>
        </Link>

        <button className="flex h-12 justify-center gap-2 items-center w-full py-5 mt-20 bg-gray-700 rounded-md cursor-pointer">
          {loading ? (
            <div className="w-full h-auto mt-10 duration-300 rounded-lg flex items-center justify-center">
              <MoonLoader className="w-8 h-8" />
            </div>
          ) : (
            <>
              <MdLogout className="text-white w-6 h-6" />
              <label
                onClick={logout}
                className="text-white text-lg cursor-pointer"
              >
                Logout
              </label>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuScreen;
