
"use client"; // أضف هذا السطر

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    Name: "",
    SubordinateUnits: "",
    TrackingUnits: "",
    Objective: "",
    tasks: [{
      Description: "",
    }
    ],
  });

  // تحديث الحقول العامة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // تحديث حقل المهام
  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index][field] = value;
    setFormData({ ...formData, tasks: updatedTasks });
  };


  // إضافة حقل مهام جديد
  const addTaskField = () => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { OrganizationUnitID: "", Description: "" }],
    });
  };


  // إرسال البيانات إلى API
  const handleSubmit = async (e) => {
    console.log(formData);

    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/organization-units", formData);
      toast.success('تم الاضافة بنجاح');
      setFormData(
        {
          Name: "",
          SubordinateUnits: "",
          TrackingUnits: "",
          Objective: "",
          tasks: [{
            Description: "",
          }
          ],
        });
    } catch (error) {
      console.error("Error adding organization unit:", error);
      toast.error("حدث خطا ما يرجى المحاولة مرة اخرى");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div className="flex" style={{ width: "100%", justifyContent: "space-between",alignItems:"center" }}>
        <div>
          <h1>بطاقة توصيف وحدة تنظيمية</h1>
          <h3>يهدف هذا الاستبيان لجمع معلومات عن الوحدات التنظيمية</h3>
        </div>
        <div style={{minWidth:"168px", textAlign:"center"}}>
          <img src="/images/logo.png" />
          <p>الجمهورية العربية السورية</p>
          <div>محافظة دمشق</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* حقل اسم الوحدة */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">مسمى الوحدة التنظيمية</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* حقل الهدف */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="SubordinateUnits">الوحدات التنظيمية التي تتبع لها هذه الوحدات التنظيمية</label>
          <textarea
            id="SubordinateUnits"
            name="SubordinateUnits"
            value={formData.SubordinateUnits}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="TrackingUnits">الوحدات التنظيمية التي تتبع لهذه الوحدات التنظيمية</label>
          <textarea
            id="TrackingUnits"
            name="TrackingUnits"
            value={formData.TrackingUnits}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="Objective">الهدف من وجود هذه الوحدة التنظيمية</label>
          <textarea
            id="Objective"
            name="Objective"
            value={formData.Objective}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* حقول المهام */}
        <div style={{ marginBottom: "10px" }}>
            <label>المهام والمسؤوليات</label>
          {formData.tasks.map((task, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="المهمة والمسؤولية"
                value={task.Description}
                onChange={(e) => handleTaskChange(index, "Description", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>
          ))}
          <div className="flex" style={{ width: "100%", justifyContent: "space-between" }}>
            <p></p>
            <button type="button" style={{ padding: "0.25rem 1rem" }} onClick={addTaskField}>+</button>
          </div>
        </div>

        {/* زر الإرسال */}
        <button type="submit" style={{ padding: "10px 20px" }}>
          حفظ
        </button>
      </form>
    </div>
  );
}
