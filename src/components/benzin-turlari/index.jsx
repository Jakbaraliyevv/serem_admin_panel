import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/axios";
import { data } from "react-router-dom";
import notificationApi from "../../generic/notify";

function BenzinTurlari() {
  const axios = useAxios();
  const notify = notificationApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [branch, setBranch] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectt, setSelect] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    axios({
      url: "/register/",
      method: "GET",
    })
      .then((data) => setBranch(data.data))
      .catch((error) => console.log(error));
  }, []);

  const postData = () => {
    const data = {
      branch: selectt,
      name,
      price,
      stock,
    };
    if (!selectt || !name || !price || !stock) {
      notify({ type: "fullData" });
      return;
    }

    const url = `/1branch${selectt}/`;
    console.log("So‘rov URL:", url);
    axios({
      url: `/1/branch/${selectt}/`,
      method: "POST",
      data,
    })
      .then((data) => {
        console.log(data);
        notify({ type: "Saved" });
      })
      .catch((error) => console.log(error));

    console.log(data, "data11");
  };

  return (
    <section className="bg-[#f9fafb] min-h-screen">
      <div className="w-[90%] m-auto pt-[20px]">
        <div className="bg-blue-600 flex items-center justify-between p-5 rounded-md">
          <h2 className="text-[#FFF] text-[25px] font-bold">Benzin turlari</h2>
          <Button onClick={() => setIsModalOpen(true)}>Add benzin</Button>
        </div>
        <table className="w-full mt-7">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Branch</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Name</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Price</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">Stock</th>
              <th className="border border-gray-300 px-4 py-2 w-1/5">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                OIL
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                AI-80
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                1200 so'm
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                122
              </td>
              <td className="border border-gray-300 px-4 py-2 text-end">
                <Button classNames="!w-[40px]" type="primary" className="mr-2">
                  Tahrirlash
                </Button>
                <Button classNames="!w-[40px]" danger>
                  O'chirish
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Bekor qilish
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
              postData();
            }}
          >
            Saqlash
          </Button>,
        ]}
      >
        <div className="mt-5">
          <form className="flex flex-col gap-7">
            <div className="space-y-2">
              <label
                htmlFor="benzin"
                className="text-[17px] font-medium text-gray-700"
              >
                Benzin nomi
              </label>
              <Input
                id="benzin"
                required
                className="h-11 rounded-lg text-base"
                onChange={(e) => setName(e.target.value)}
                placeholder="Benzin nomini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-[17px] font-medium text-gray-700"
              >
                Benzin narxi
              </label>
              <Input
                id="price"
                required
                className="h-11 rounded-lg text-base"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Benzin narxini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="qoldiq"
                className="text-[17px] font-medium text-gray-700"
              >
                Benzin qoldiq
              </label>
              <Input
                id="qoldiq"
                required
                className="h-11 rounded-lg text-base"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Benzin qoldigini kiriting"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="branch"
                className="text-[17px] font-medium text-gray-700"
              >
                Fillial
              </label>
              <select
                id="branch"
                onChange={(e) => setSelect(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Fillialni tanlang</option>
                {branch?.map((value) => (
                  <option value={value.id}>{value.name}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}

export default BenzinTurlari;
