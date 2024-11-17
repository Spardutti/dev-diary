import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<main className="bg-background h-screen text-white">
			<Outlet />
		</main>
	);
};

export default Layout;
