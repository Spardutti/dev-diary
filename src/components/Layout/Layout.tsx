import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Outlet } from '@tanstack/react-router';

const Layout = () => {
	return (
		<main className="bg-primary p-1.5 h-screen flex">
			<div className="bg-background flex-grow text-text flex flex-col rounded">
				<Header />
				<div className="flex flex-grow">
					<Sidebar />
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default Layout;
