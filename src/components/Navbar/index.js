import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Nav, Sidenav } from "rsuite";
import { auth } from "../../misc/firebase";

const Navbar = () => {
	const [activeKey, setActiveKey] = useState("dashboard");
	const onSelect = (key) => {
		setActiveKey(key);
	};
	const signOut = useCallback(() => {
		auth.signOut();
	}, []);

	return (
		<Sidenav
			expanded={false}
			appearance="subtle"
			activeKey={activeKey}
			onSelect={onSelect}
			style={{ height: "100%" }}
		>
			<Sidenav.Body>
				<Nav>
					<Nav.Item
						eventKey="dashboard"
						icon={<Icon icon="dashboard" />}
						componentClass={Link}
						to="/"
					>
						Dashboard
					</Nav.Item>

					<Nav.Item
						eventKey="messages"
						icon={<Icon icon="send" />}
						componentClass={Link}
						to="/messages"
					>
						Messages
					</Nav.Item>

					<Nav.Item
						eventKey="settings"
						icon={<Icon icon="gears2" />}
						componentClass={Link}
						to="/settings"
					>
						Settings
					</Nav.Item>
					<Nav.Item
						style={{ bottom: 10 }}
						onSelect={signOut}
						icon={<Icon icon="sign-out" />}
					>
						Sign Out
					</Nav.Item>
				</Nav>
			</Sidenav.Body>
		</Sidenav>
	);
};

export default Navbar;
