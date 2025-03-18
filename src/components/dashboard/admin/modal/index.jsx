

import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "../../../../hooks/axios";
import { toggleModal, triggerRefresh } from "../../../../redux/modal-clise";
import { useEffect } from "react";

const MyModal = ({ editMode, branchData }) => {
  const [form] = Form.useForm();
  const axios = useAxios();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isOpen);
  const refreshData = useSelector((state) => state.refreshData);

  // Edit rejimida forma ma'lumotlarini to'ldirish
  useEffect(() => {
    if (editMode && branchData) {
      form.setFieldsValue({
        name: branchData.name,
        address: branchData.address,
        manager: branchData.manager,
        contact_number: branchData.contact_number,
      });
    } else {
      form.resetFields();
    }
  }, [editMode, branchData, form]);

  const handleCancel = () => {
    dispatch(toggleModal());
    form.resetFields();
  };

  const onFinish = (values) => {
    if (editMode && branchData) {
      // Update - PUT so'rovi
      axios({
        url: `/branch/update/${branchData.id}/`,
        method: "PUT",
        data: values,
      })
        .then(() => {
          dispatch(toggleModal());
          dispatch(triggerRefresh(!refreshData));
          form.resetFields();
        })
        .catch((error) => console.log(error));
    } else {
      // Create - POST so'rovi
      axios({
        url: "/branch/create/",
        method: "POST",
        data: values,
      })
        .then(() => {
          dispatch(toggleModal());
          dispatch(triggerRefresh(!refreshData));
          form.resetFields();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Modal
      title={editMode ? "Filialni tahrirlash" : "Yangi filial qo'shish"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Branch name"
          name="name"
          rules={[
            { required: true, message: "Iltimos, branch namini kiriting!" },
          ]}
        >
          <Input placeholder="Branch nomini kiriting" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Iltimos, manzilni kiriting!" }]}
        >
          <Input placeholder="Manzilni kiriting" />
        </Form.Item>

        <Form.Item
          label="Manager"
          name="manager"
          rules={[
            { required: true, message: "Iltimos, manager nomini kiriting!" },
          ]}
        >
          <Input placeholder="Manager ismini kiriting" />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[
            { required: true, message: "Iltimos, aloqa raqamini kiriting!" },
          ]}
        >
          <Input placeholder="Aloqa raqamini kiriting" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? "Yangilash" : "Saqlash"}
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Bekor qilish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;
