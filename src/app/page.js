
"use client"; // أضف هذا السطر

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    unit: "",
    manager_title: "",
    job_code: "",
    level: "",
    responsibilities: ""
  });

  // تحديث الحقول العامة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        });
    } catch (error) {
      console.error("Error adding organization unit:", error);
      toast.error("حدث خطا ما يرجى المحاولة مرة اخرى");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div className="flex" style={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>بطاقة الوصف الوظيفي</h1>
          <h3>يهدف هذا الاستبيان لجمع معلومات عن المسميات الوظيفية بهدف تصميم بطاقات وصف وظيفي</h3>
        </div>
        <div style={{ minWidth: "168px", textAlign: "center" }}>
          <img src="/images/logo.png" />
          <p>الجمهورية العربية السورية</p>
          <div>محافظة دمشق</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* حقل اسم الوحدة */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="title">مسمى الوظيفي</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* حقل الهدف */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="unit">الوحدات التنظيمية التي تتبع لها هذا المسمى</label>
          <input
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="manager_title">المسمى الوظيفي للمسؤول المباشر</label>
          <input
            id="manager_title"
            name="manager_title"
            value={formData.manager_title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="job_code">الرمز الوظيفي</label>
          <input
            id="job_code"
            name="job_code"
            value={formData.job_code}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="level">المستوى التنظيمي</label>
          <input
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="responsibilities">المهام والمسؤوليات</label>
          <input
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        {/* زر الإرسال */}
        <button type="submit" style={{ padding: "10px 20px" }}>
          حفظ
        </button>
      </form>
    </div>
  );
}
