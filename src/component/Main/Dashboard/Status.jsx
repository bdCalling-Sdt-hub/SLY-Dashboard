import { FaDatabase } from "react-icons/fa";
import { PiCurrencyCircleDollar, PiUsers, PiUsersThreeFill } from "react-icons/pi";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
const Status = () => {
  const { data, isLoading } = useGetDashboardStatusQuery();



  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
      <div className="flex bg-[#0076b53a] items-center gap-5 p-5 rounded-lg border-2 border-[#0077b5]">
        <div className=" ">
          {/* <PiUsersThreeFill className="size-10" /> */}
          <img className="w-16" src="/Home/icon.png" alt="" />
        </div>
        <div className="space-y-2">
          <h1>Total User</h1>
          <h1 className="text-5xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "0"}
          </h1>
        </div>
      </div>
      <div className="flex bg-[#0076b53a] items-center gap-5 p-5 rounded-lg border-2 border-[#0077b5]">
        <div className=" ">
          {/* <PiUsersThreeFill className="size-10" /> */}
          <img className="w-16" src="/Home/icon.png" alt="" />
        </div>
        <div className="space-y-2">
          <h1>Total Orders</h1>
          <h1 className="text-5xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "0"}
          </h1>
        </div>
      </div>
      <div className="flex bg-[#0076b53a] items-center gap-5 p-5 rounded-lg border-2 border-[#0077b5]">
        <div className=" ">
          {/* <PiUsersThreeFill className="size-10" /> */}
          <img className="w-16" src="/Home/icon.png" alt="" />
        </div>
        <div className="space-y-2">
          <h1>Total revenue</h1>
          <h1 className="text-5xl font-semibold text-[#222222]">
            ${data?.totalNumberOfUser || "0"}
          </h1>
        </div>
      </div>
      <div className="flex bg-[#0076b53a] items-center gap-5 p-5 rounded-lg border-2 border-[#0077b5]">
        <div className=" ">
          {/* <PiUsersThreeFill className="size-10" /> */}
          <img className="w-16" src="/Home/icon.png" alt="" />
        </div>
        <div className="space-y-2">
          <h1>SLY Package</h1>
          <h1 className="text-5xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "0"}
          </h1>
        </div>
      </div>

    </div>
  );
};

export default Status;
