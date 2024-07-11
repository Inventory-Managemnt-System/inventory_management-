import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./User.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
// import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../context/User/UserContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { scrollToTop } from "../../../utils/HelperFunc";

function EditUser() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let { pk } = useParams();

  const {
    getSingleUserIsLoading,
    getSingleUser,
    handleEditUser,
    seteditedFormData,
    editedFormData,
    editUserIsLoading,
    editUserError,
    editUserResponse,
    seteditUserError,
    seteditUserResponse,
  } = useContext(UserContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    getSingleUser(pk);
  }, []);

  useEffect(() => {
    if (!editUserIsLoading && editUserResponse) {
      navigate(`/UserDetail/${pk}`, {
        state: { message: "Edit successful!" },
      });
      seteditUserResponse(null);
    }
  }, [editUserIsLoading, editUserResponse]);

  useEffect(() => {
    if (!editUserIsLoading && editUserError) {
      scrollToTop();
      handleComfirmationPopUps(editUserError, "bg-danger");
      setButtonLoading(false);
      seteditUserError(null);
    }
  }, [editUserIsLoading, editUserError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (
      editUserIsLoading ||
      (!editUserIsLoading && !editUserError && !editUserResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    handleEditUser(e, pk);
    handleLoadingClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "Choose a file";

    seteditedFormData({
      ...editedFormData,
      image: file.name,
    });

    document.getElementById("fileLabel").innerText = fileName;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Edit User"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          {getSingleUserIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleUserIsLoading} />
            </Container>
          ) : (
            <Form onSubmit={handleEditSubmit}>
              <Row>
                <TitleHeader
                  text={"User Information"}
                  headerTextStyle={"headerTextStyle"}
                />

                <Form.Group className="mb-3">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        className="UserCreateInput"
                        value={editedFormData.name}
                        onChange={handleChange}
                        name="name"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        className="UserCreateInput"
                        placeholder="Username"
                        value={editedFormData.username}
                        onChange={handleChange}
                        name="username"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="User ID"
                        className="UserCreateInput"
                        value={editedFormData.oracle_id}
                        onChange={handleChange}
                        name="oracle_id"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        className="UserCreateInput"
                        value={editedFormData.email}
                        onChange={handleChange}
                        name="email"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        className="UserCreateInput"
                        placeholder="Phone Number"
                        value={editedFormData.phone_number}
                        onChange={handleChange}
                        name="phone_number"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                      <Form.Select
                        className="UserCreateInput"
                        name="level"
                        value={editedFormData.level}
                        onChange={handleChange}
                        required
                      >
                        <option value="">School Level</option>
                        <option value="Elementery">Elementery</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="file"
                        id="userfileInput"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        name="image"
                      />
                      <CustomFileInput
                        fieldName={"userfileInput"}
                        title={"Upload User Image"}
                        CustomFileInputicon={faUpload}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Row>
                <TitleHeader
                  text={"Account Settings"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="role"
                      value={editedFormData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">User Role</option>F{" "}
                      <option value="1">QA</option>
                      <option value="2">Admin</option>
                      <option value="3">HeadTecher</option>
                      <option value="4">WareHouseStaff</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="department"
                      value={editedFormData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Department</option>
                      <option value="Admin">Admin</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Row>
              <Row>
                <TitleHeader
                  text={"Addittional Information"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-3">
                  <Form.Group className="mb-3" controlId="notificationTitle">
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Date Employed"
                          className="UserCreateInput"
                          
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          placeholder="Addittional Information"
                          className="UserCreateTextArea"
                          
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100 p-2">
                    {buttonLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    ) : (
                      "Save Cahanges"
                    )}
                  </Button>
                </Row>
              </Row>
            </Form>
          )}
        </Container>
      </div>
    </div>
  );
}

export default EditUser;
