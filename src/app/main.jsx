import React from "react";
import ReactDOM from "react-dom";
import "@progress/kendo-theme-material/dist/all.css";
import {
    Notification,
    NotificationGroup
} from "@progress/kendo-react-notification";
import {
    Animation,
    Expand,
    Fade,
    Push,
    Slide,
    Zoom,
    Reveal
} from "@progress/kendo-react-animation";

const notifications = [
    {
        id: 1,
        type: "error",
        notificaiton: "An Error has occured",
        show: false
    },
    {
        id: 2,
        type: "success",
        notification: "It was a successful test",
        show: false
    },
    {
        id: 3,
        type: "warning",
        notification: "This is a warning message",
        show: false
    },
    {
        id: 4,
        type: "info",
        notification: "This is an informational message",
        show: false
    }
];

const App = () => {
    let { current: timeout } = React.useRef();
    const [toggle, setToggle] = React.useState(false);
    const [notificationList, setNotificationList] = React.useState(
        notifications
    );

    function onToggle() {
        setNotificationList(
            notifications.map((n) => {
                n.show = true;
                return n;
            })
        );
        setToggle((current) => !current);
    }

    function onEntered(notificaiton) {
        //console.log(notificaiton);
        setTimeout(() => {
            const tempArray = notificationList.filter(
                (n) => n.id !== notificaiton.id
            );
            setNotificationList(tempArray);
        }, 3000);
        // timeout = setTimeout(() => {
        //     setToggle((current) => !current);
        // }, 5000);
    }

    function clearTimeout() {
        return () => clearTimeout(timeout);
    }

    function hideNotification(notification) {
        // notificationList.find((n) => n.id === notification.id);
        // if (notification) {
        console.log("notification: ", notification);
        //     notification.show = false;
        // }
        //notificationList.find((n) => n.id === notification.id).show = false;
        const newArray = notificationList.filter(
            (n) => n.id !== notification.id
        );
        setNotificationList(newArray);
    }
    React.useEffect(clearTimeout, [timeout]);

    return (
        <React.Fragment>
            <button className="k-button" onClick={onToggle}>
                {toggle ? "Hide" : "Show"}
            </button>
            <NotificationGroup
                style={{
                    left: 10,
                    bottom: 0,
                    alignItem: "flex-start"
                }}
            >
                {notificationList.map((notification) => {
                    return (
                        <Fade
                            enter={false}
                            exit={false}
                            onEntered={onEntered(notification)}
                        >
                            {notification.show && (
                                <Notification
                                    key={notification.id}
                                    type={{ style: "success", icon: true }}
                                    closable={true}
                                    //onClose={() => setToggle(false)}
                                    onClose={() =>
                                        hideNotification(notification)
                                    }
                                >
                                    <span>Your data has been saved.</span>
                                </Notification>
                            )}
                        </Fade>
                    );
                })}
            </NotificationGroup>
        </React.Fragment>
    );
};

ReactDOM.render(<App />, document.querySelector("my-app"));
