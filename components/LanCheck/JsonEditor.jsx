import React, { useEffect, useState } from "react";
import axios from "axios";

const JsonEditor = ({ lang }) => {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  // Load JSON
  useEffect(() => {
    axios.get(`http://localhost:5000/api/json/${lang}`)
      .then(res => {
        if (res.data.success) setJsonData(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [lang]);

  // Handle edit
  const handleChange = (key, value) => {
    setJsonData({ ...jsonData, [key]: value });
  };

  // Save JSON
  const saveJson = () => {
    axios.post(`http://localhost:5000/api/json/${lang}`, { json: jsonData })
      .then(res => alert(res.data.message))
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Editing {lang}.json</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(jsonData).map(([key, value]) => (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>
                <input
                  type="text"
                  value={value}
                  style={{ width: "100%" }}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={saveJson}>Save</button>
    </div>
  );
};

export default JsonEditor;
