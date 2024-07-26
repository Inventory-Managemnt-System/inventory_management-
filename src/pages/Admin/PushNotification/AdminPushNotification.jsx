import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Notification.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
 import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import PushNotification from "../../../components/Notification/PushNotification";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import { NotificationHistory } from "../../Admin/PushNotification/NotificationHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationBtn from "../../../components/Button/NotificationBtn"

function AdminPushNotification() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [audience, setAudience] = useState('')

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "QA",
    },
    {
      pk: 2,
      type: "Warehouse Staff",
    },
    {
      pk: 3,
      type: "Head Teacher",
    },
    {
      pk: 4,
      type: "Admin",
    },
    
  ];
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <BackButtonIcon/>
          <TitleHeader text={"Push Notifications"} />

          <Row>
            <Row className="d-lg-none">
              <Col className="d-flex text-center justify-content-end mb-3">
              <NotificationBtn
              Primaryicon={faClockRotateLeft}
              onClick={handleShow}
              text={"Notification History"}
              Primarystyle={"pushNotificationTimer d-none d-lg-flex"}
            />
              </Col>
              <NotificationHistory   show={showModal} handleClose={handleClose} />
            </Row>

            <Col className="d-flex justify-content-end ms-auto gap-3 mb-5">
              <Filter
                optionTitle={"Select Target Audience:"}
                options={filterData}
                defult={"All"}
                onSelect={(value)=>setAudience(value)}

              />
              <NotificationBtn
              Primaryicon={faClockRotateLeft}
              onClick={handleShow}
              text={"Notification History"}
              Primarystyle={"pushNotificationTimer d-none d-lg-flex"}
            />
            </Col>
            <NotificationHistory   show={showModal} handleClose={handleClose} />
          </Row>
          <PushNotification audience={audience}/>
        </Container>
      </div>
    </div>
  );
}

export default AdminPushNotification;
