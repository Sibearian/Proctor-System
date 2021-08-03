import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Nav, Sidenav } from "rsuite";

const Navbar = () => {
	const [activeKey, setActiveKey] = useState("dashboard");
	const onSelect = (key) => {
		setActiveKey(key);
	};
	return (
		<Sidenav
			expanded={false}
			appearance="subtle"
			activeKey={activeKey}
			onSelect={onSelect}
		>
			<Sidenav.Body>
				<Nav>
					<Nav.Item
						eventKey="dashboard"
						icon={<Icon icon="dashboard" />}
						componentClass={Link}
						to="/dashboard"
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
				</Nav>
			</Sidenav.Body>
		</Sidenav>
	);
};

export default Navbar;
