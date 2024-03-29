  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Modal from "react-modal";
import UniversalButton from "./UniversalButton";

  const initialState = {
    firstName: "",
    lastName: "",
    group: "",
    isDataUpdated: false,
    error: null,
  };

  function StudentsAdd() {
    const [state, setState] = useState(initialState);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3000/students", {
          firstName: state.firstName,
          lastName: state.lastName,
          group: state.group,
        });
        setState({ ...initialState, isDataUpdated: true });
        closeModal();
        fetchData()
      } catch (error) {
        setState({ ...state, error: error.message });
      }
    };

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };

    useEffect(() => {
      if (state.isDataUpdated) {
        fetchData();
        setState({ ...state, isDataUpdated: false });
      }
    }, [state.isDataUpdated]);

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    function refreshPage(){
      window.location.reload();
  } 

    return (
      <div className="container">
        <UniversalButton variant="add" onClick={openModal} className=" mb-3">Add Student</UniversalButton>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>Add Student</h2>
          {state.error && <div>Error: {state.error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input required type="text" className="form-control" id="firstName" name="firstName" value={state.firstName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input required type="text" className="form-control" id="lastName" name="lastName" value={state.lastName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="group" className="form-label">Group</label>
              <input required type="text" className="form-control" id="group" name="group" value={state.group} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => refreshPage()}>Submit</button>
          </form>
          <button onClick={closeModal} className="btn btn-secondary mt-3">Cancel</button>
        </Modal>
      </div>
    );
  }

  export default StudentsAdd;
