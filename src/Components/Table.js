import React, { useEffect, useState } from "react";
import Details from "./Details";
import Pagination from "./Footer";
import "./Table.css";

const Table = ({ employees, checkClick, onDelete, onDeleteSelected, onEdit }) => {
  const maxItemsInPage = 10;
  const [page, setPage] = useState(1);

  const [dataInPage, setDataInPage] = useState(
    employees.slice(
      (page - 1) * maxItemsInPage,
      (page - 1) * maxItemsInPage + maxItemsInPage
    )
  );

  const [flag, setFlag] = useState(null);
  const [anyBoxChecked, setAnyBoxChecked] = useState(false);

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(
    Math.ceil(employees.length / maxItemsInPage)
  );

  const currentDataInPage = () => {
    const start = (page - 1) * maxItemsInPage;
    const end = start + maxItemsInPage;
    setDataInPage(employees.slice(start, end));
  };

  const handleEdit = (id) => setFlag(id);
  const handleTopCheckBox = (e) => {
    //console.log(e.target.checked)
    if (e.target.checked) {
      dataInPage.map((x) => !x.isChecked && checkClick(x.id));
    } else {
      dataInPage.map((x) => x.isChecked && checkClick(x.id));
    }
  };

  const anyBoxCheck = (employees) => {
    setAnyBoxChecked(
      employees.reduce((i, member) => i || member.isChecked, false)
    );
  };

  useEffect(() => {
    anyBoxCheck(employees);
    setTotalNumberOfPages(Math.ceil(employees.length / maxItemsInPage));
  }, [employees]);

  useEffect(() => {
    currentDataInPage();
  }, [employees, page]);

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleTopCheckBox} />
              </th>
              <th>
                <div className="data">Name</div>
              </th>
              <th>
                <div className="data">Email</div>
              </th>
              <th>
                <div className="data">Role</div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataInPage.map((employee) => (
              <Details
                key={employee.id}
                row={employee}
                checkClick={checkClick}
                onDelete={onDelete}
                onEdit={onEdit}
                onEditClick={handleEdit}
                flag={flag}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <button
          className={`dlt-btn${!anyBoxChecked ? " not-active " : ""}`}
          disabled={!anyBoxChecked ? "disabled" : ""}
          onClick={onDeleteSelected}>
            Delete Selected
        </button>
        
        {totalNumberOfPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalNumberOfPages={totalNumberOfPages}
            maxItemsInPage={maxItemsInPage}
          />
        )}
      </div>
    </>
  );
};

export default Table;
