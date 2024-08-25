import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseData(null);
    setOptions([]); // Reset options on new submission
    setSelectedOptions([]); // Reset selected options

    // Validate JSON input
    try {
      const parsedData = JSON.parse(jsonInput);

      // Send POST request to backend
      const response = await axios.post("http://localhost:5000/bfhl", {
        data: parsedData.data,
      });

      const { numbers, alphabets, highest_lowercase_alphabet } = response.data;

      setResponseData(response.data);

      // Set options for the dropdown
      setOptions([
        { value: "alphabets", label: "Alphabets", data: alphabets },
        { value: "numbers", label: "Numbers", data: numbers },
        {
          value: "highest_lowercase_alphabet",
          label: "Highest lowercase alphabet",
          data: highest_lowercase_alphabet,
        },
      ]);
    } catch (err) {
      console.error(err); // Log error to the console
      setError("Invalid JSON format or request failed");
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const displayData = (data) => {
    if (!data || data.length === 0) {
      return "{}"; // Return empty object for no data
    }
    return data.join(", ");
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Bajaj Qualifier-1 Task</h1>
        <h3>
          21BCE8520 ||{" "}
          <a
            href="https://www.linkedin.com/in/balaji-viswanadh-madhavareddy-875473220/e"
            target="_blank"
            rel="noopener noreferrer">
            Balaji Viswanadh
          </a>
        </h3>

        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='Enter valid JSON, e.g., { "data": ["a", "1", "B", "2"] }'></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
        {responseData && (
          <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
            <h2>Select Options</h2>
            <Select
              className="Select"
              isMulti
              options={options}
              onChange={handleSelectChange}
              placeholder="Select categories"
            />
            <div>
              {selectedOptions.map((option) => (
                <div key={option.value}>
                  <h3>{option.label}</h3>
                  <p>{displayData(option.data)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
