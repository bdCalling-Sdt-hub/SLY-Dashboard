import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import Piechart from "../../component/Main/Dashboard/Piechart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <h1 className="text-4xl font-semibold py-5 px-3">Dashboard</h1>
      <div className="px-3">
        <Status />
        <div className="">
          <IncomeGraphChart />
          {/* <Piechart /> */}
        </div>
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
