import { Button, Popconfirm } from "antd";
import { useAxios } from "../../../hooks/axios";
import { useEffect, useState } from "react";
import MyModal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, triggerRefresh } from "../../../redux/modal-clise";
import { Link, useParams } from "react-router-dom";

const BranchStats = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedBranchData, setSelectedBranchData] = useState(null);
  const dispatch = useDispatch();
  const refreshData = useSelector((state) => state.refreshData);
  const axios = useAxios();
  const { id } = useParams();

  useEffect(() => {
    fetchBranches();
  }, [refreshData]);

  useEffect(() => {
    fetchDashboardData();
  }, [refreshData]);

  const fetchBranches = () => {
    axios({
      url: "/register/",
      method: "GET",
    })
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setData2(res.data);
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchDashboardData = () => {
    axios({
      url: "/dashboard/",
      method: "GET",
    })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (data2.length > 0) {
      setSelectedBranch(data2[0]?.name || "Noma'lum filial");
    }
  }, [data2]);
  const handleAddBranch = () => {
    setEditMode(false);
    setSelectedBranchData(null);
    dispatch(toggleModal());
  };

  const handleEditBranch = (branch) => {
    setEditMode(true);
    setSelectedBranchData(branch);
    dispatch(toggleModal());
  };

  const handleDeleteBranch = (branchId) => {
    axios({
      url: `/branch/delete/${branchId}/`,
      method: "DELETE",
    })
      .then(() => {
        dispatch(triggerRefresh(!refreshData));
      })
      .catch((error) => console.log(error));
  };

  const selectedData = data?.branch_stats?.[selectedBranch] || {};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold">Filiallar boshqaruv paneli</h1>
          <p className="opacity-80 mt-2">
            Barcha filiallar statistikasi va ma'lumotlarini ko'rish
          </p>
        </div>
        <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Filial tanlang
            </h2>
            <Button onClick={handleAddBranch}>Add new Branch</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {data2 &&
              Array.isArray(data2) &&
              data2.map((value) => (
                <div key={value.id} className="flex flex-col gap-2">
                  <Link to="/dashboard/benzin-turlari">
                    <div
                      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer ${
                        selectedBranch === value.name
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedBranch(value.name);
                      }}
                    >
                      {value.name}
                    </div>
                  </Link>

                  <div className="flex gap-2 mt-1">
                    <Button
                      size="small"
                      onClick={() => handleEditBranch(value)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Bu filialni o'chirishni xohlaysizmi?"
                      onConfirm={() => handleDeleteBranch(value.id)}
                      okText="Ha"
                      cancelText="Yo'q"
                    >
                      <Button size="small" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            {selectedBranch} filiali
          </h2>
          <div className="grid grid-cols-3 gap-[20px]">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">💰</span>
                <div className="text-sm text-gray-600 font-medium">Foyda</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedData?.profit}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">💸</span>
                <div className="text-sm text-gray-600 font-medium">Xarajat</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedData?.expense}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">📦</span>
                <div className="text-sm text-gray-600 font-medium">
                  Kiruvchi miqdor
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedData?.debt}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">📊</span>
                <div className="text-sm text-gray-600 font-medium">Qoldiq</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedData?.astatka}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">💳</span>
                <div className="text-sm text-gray-600 font-medium">Qarz</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedData?.incoming_quantity}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">💵</span>
                <div className="text-sm text-gray-600 font-medium">Kassa</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedData?.kassa}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyModal editMode={editMode} branchData={selectedBranchData} />
    </div>
  );
};

export default BranchStats;
