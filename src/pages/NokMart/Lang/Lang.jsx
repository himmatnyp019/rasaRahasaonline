import React, { useEffect, useState } from "react";

const Lang = () => {
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
            console.log(data.data);
            
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
                console.log("✅ Updated successfully");
                loadLangs(); // reload to reflect changes
            } else {
                console.error("❌ Update failed:", data.message);
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

                    {Object.keys(lang).map((keyName) => {
                        if (keyName === "_id" || keyName === "__v") return null;

                        return (
                            <div key={`${lang._id}-${keyName}`} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <span style={{ minWidth: "150px", fontWeight: "bold" }}>{keyName}</span>
                                <input
                                    type="text"
                                    defaultValue={lang[keyName]}
                                    style={{ flex: 1, padding: "5px", marginRight: "8px" }}
                                    onBlur={(e) => updateField(lang._id, keyName, e.target.value)}
                                />
                            </div>
                        );
                    })}

                </div>
            ))}
        </div>
    );
};

export default Lang;
