import herokuAPI from "./herokuAPI";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Record = (props) => (
  <tr>
    <td>{props.record.person_name} </td>
    <td>{props.record.person_position}</td>
    <td>{props.record.person_level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const RecordList = () => {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    const getRecord = async () => {
      const response = await fetch(`${herokuAPI}/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    };

    getRecord();
    return;
  }, [records.length]);

  // This method will delete a record
  const deleteRecord = async (id) => {
    try {
      await axios.delete(`${herokuAPI}/${id}`);
    } catch (error) {
      console.log(error);
    }
    // await fetch(`${herokuAPI}/${id}`, { method: "DELETE" });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  };
  // This method will map out the records on the table
  const recordList = () => {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  };
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
};

export default RecordList;

/////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Record = (props) => (
//   <tr>
//     <td>{props.record.person_name}</td>
//     <td>{props.record.person_position}</td>
//     <td>{props.record.person_level}</td>
//     <td>
//       <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
//         Edit
//       </Link>
//       |
//       <button
//         className="btn btn-link"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </button>
//     </td>
//   </tr>
// );

// export default function RecordList() {
//   const [records, setRecords] = useState([]);

//   // This method fetches the records from the database.
//   useEffect(() => {
//     async function getRecords() {
//       const response = await fetch(`${herokuAPI}/record/`);

//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const records = await response.json();
//       setRecords(records);
//     }

//     getRecords();

//     return;
//   }, [records.length]);

//   // This method will delete a record
//   async function deleteRecord(id) {
//     await fetch(`${herokuAPI}/${id}`, {
//       method: "DELETE",
//     });

//     const newRecords = records.filter((el) => el._id !== id);
//     setRecords(newRecords);
//   }

//   // This method will map out the records on the table
//   function recordList() {
//     return records.map((record) => {
//       return (
//         <Record
//           record={record}
//           deleteRecord={() => deleteRecord(record._id)}
//           key={record._id}
//         />
//       );
//     });
//   }

//   // This following section will display the table with the records of individuals.
//   return (
//     <div>
//       <h3>Record List</h3>
//       <table className="table table-striped" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Position</th>
//             <th>Level</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>{recordList()}</tbody>
//       </table>
//     </div>
//   );
// }
