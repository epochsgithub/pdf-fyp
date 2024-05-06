import React, { Fragment, useEffect, useState } from 'react'
import { authHeaders, baseUrl } from './contants';
import axios from 'axios';
import { BsBellFill } from 'react-icons/bs';
import { Button, Dropdown, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import PerfectScrollbar from "react-perfect-scrollbar";
import Avatar from "react-avatar";
import classNames from 'classnames';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, TableContainer } from '@mui/material';

function NotificationDropdown({ direction, ...args }) {
    const [notification, setnotification] = useState({});
    const [notifications, setnotifications] = useState([]);
    const [notifier, setNotifier] = useState(null);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [reading, setReading] = useState(false);
    const [modalData, setModalData] = useState("");

    const getData = () => {
        axios.get(`${baseUrl}/pdfeditor/notification/`, authHeaders)
            .then((response) => {
                // console.log("response", response);
                setnotification(response.data);
                setnotifications(response.data.results);
            })
            .catch((e) => {
                // if (e.response) {
                //   if (e.response) {
                //     forEveryKeyLoop(e.response.data);
                //   }
                // }
            });
    };
    const getNotificationPagination = () => {
        const nextPageNumber = notification.page_number + 1;
        // console.log("notification.page_number ", nextPageNumber);
        axios.get(`${baseUrl}/pdfeditor/notification/?page=${nextPageNumber}`)
            .then((response) => {
                // console.log("response is", response);
                setnotifications((c) => c.concat(response.data.results));
                setnotification((prevNotification) => ({
                    ...prevNotification,
                    page_number: nextPageNumber,
                }));
            })
            .catch((e) => {
                // if (e.response) {
                //   if (e.response) {
                //     forEveryKeyLoop(e.response.data);
                //   }
                // }
            });
    };
    const scrollHandler = (e) => {
        const el = document.getElementById("scrollId");
        // console.log(el.scrollTop, el.scrollHeight - el.clientHeight);
        const newHeight = Math.ceil(
            el.scrollTop - (el.scrollHeight - el.clientHeight)
        );
        // console.log(Math.ceil(newHeight));
        if (newHeight === 0) {
            getNotificationPagination();
        }
    };
    const readMessage = (item) => {
        // const transformedTitle =
        //     item.resource_title === "Stock"
        //         ? "stocks"
        //         : item.resource_title.toLowerCase();
        // const allNotification = notification;
        // const seletedNotification = allNotification.results.find(
        //   (i) => i.id === item.id
        // );
        // seletedNotification.title = true;
        // console.log("allNotification", allNotification);
        // setnotification(allNotification);
        setNotifier(item.id);
        axios.patch(`${baseUrl}/pdfeditor/notification/${item.id}/`, { read: true }, authHeaders)
            .then((res) => {
                setNotifier(null);
                // window.location.assign(
                //     `${window.location.origin}/app/coll/view/${item.resource_id}`
                // );
                // history.push({
                //   pathname: `/arm-${item.module_name
                //     .toLowerCase()
                //     .replace(/ /g, "-")}/view/${item.resource_id}`,
                // });
                getData();
            })
            .catch((e) => {
                setNotifier(null);
                // window.location.assign(
                //     `${window.location.origin}/app/${item.resource_title === "Stock"
                //         ? "stocks"
                //         : `arm-${item.module_name.toLowerCase().replace(/ /g, "-")}`
                //     }/view/${item.resource_id}`
                // );
            });
    };
    useEffect(() => {
        !open && getData();
        const intervalCall = setInterval(() => {
            !open && getData();
        }, 60 * 1000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    }, []);
    return (
        <Fragment>
            <Dropdown direction={direction} isOpen={open} toggle={() => setOpen(!open)}>
                <DropdownToggle
                    className="btn-icon d-flex align-items-start justify-content-end"
                    color="default"
                    size="sm"
                    onClick={() => setOpen(!open)}
                >
                    {notification &&
                        notification.unread_notifications != 0 ? (
                        <div className="notification-badge">
                            {notification.unread_notifications > 99
                                ? "99+"
                                : notification.unread_notifications}
                        </div>
                    ) : (
                        ""
                    )}
                    <BsBellFill size={20} />
                </DropdownToggle>
                <DropdownMenu {...args} className="main-dropdown">
                    <div className="d-flex justify-content-between">
                        <h5>Notification</h5>
                        <span>
                            Unread notifications{" "}
                            {notification &&
                                notification.total_unread_notification}
                            &nbsp;&nbsp;
                        </span>
                    </div>
                    <PerfectScrollbar onScroll={(e) => scrollHandler(e)} id="scrollId">
                        <div className="notification-dropdown">
                            {notifications &&
                                notifications.map((item, index) => (
                                    <div
                                        key={index}
                                        className={classNames(
                                            "notification-container cursor-pointer",
                                            {
                                                "bg-light-primary": !item.read,
                                            }
                                        )}
                                        onClick={() => {
                                            notifier === null && readMessage(item);
                                        }}

                                    >
                                        <button onClick={() => {
                                            setOpenModal(true);
                                            setModalData(item)
                                        }}>
                                            <div className="d-flex">
                                                <Avatar
                                                    style={{ background: "#2B76D2", marginRight: "10px" }}
                                                    name={item.notification_title}
                                                    size="30"
                                                    round
                                                    color="primary"
                                                />

                                                <div style={{ paddingRight: "10px", textAlign: "left" }}>
                                                    <h6>
                                                        {item.notification_title}
                                                        {/* {notifier === item.id && (
                                                        <Spinner size={"sm"} color="primary" />
                                                    )} */}
                                                    </h6>

                                                    <p>{item.notification_text}</p>
                                                </div>
                                            </div>

                                            {/* <Link
                      target="_blank"
                      to={`/arm-${item.module_name
                        .toLowerCase()
                        .replace(/ /g, "-")}/view/${item.resource_number}`}
                    > */}
                                            {/* view */}
                                            {/* </Link> */}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </PerfectScrollbar>
                </DropdownMenu>
            </Dropdown>
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
                <DialogTitle>OFFER</DialogTitle>
                <DialogContent >
                    <h1 style={{ color: "#2b76d2", fontFamily: "Poppins,sans-serif" }}>{modalData.notification_title}</h1>
                    <p style={{ color: "gray", fontFamily: "Poppins,sans-serif" }}>{modalData.notification_text}</p>
                </DialogContent>
                <DialogActions>
                    <Button style={{ background: "#2b76d2" }} onClick={() => setOpenModal(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default NotificationDropdown