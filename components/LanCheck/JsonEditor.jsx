import React, { useEffect, useState } from "react";

const LanCheck = () => {
  const [langs, setLangs] = useState([]);
  const apiUrl = "http://localhost:5000/api/langs"; // adjust if backend runs elsewhere

  // Load langs on mount
  useEffect(() => {
    loadLangs();
  }, []);

  const loadLangs = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (data.success) {
        setLangs(data.data);
      }
    } catch (err) {
      console.error("Error fetching langs:", err);
    }
  };

  // Update single field
  const updateField = async (id, key, value) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value })
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Updated successfully");
        loadLangs(); // reload to reflect changes
      } else {
        alert("❌ Update failed: " + data.message);
      }
    } catch (err) {
      console.error("Error updating field:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Languages Manager</h1>

      {langs.map((lang) => (
        <div
          key={lang._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px"
          }}
        >
          <h2>ID: {lang._id}</h2>

          {Object.keys(lang).map((key) => {
            if (key === "_id" || key === "__v") return null;

            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px"
                }}
              >
                <span style={{ minWidth: "150px", fontWeight: "bold" }}>
                  {key}
                </span>
                <input
                  type="text"
                  defaultValue={lang[key]}
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginRight: "8px"
                  }}
                  onBlur={(e) => updateField(lang._id, key, e.target.value)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default LangManager;
