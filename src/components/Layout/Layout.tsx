import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Outlet } from '@tanstack/react-router';

const Layout = () => {
	return (
		<main className="h-screen flex w-screen">
			<div className="bg-background flex-grow text-text flex flex-col rounded w-full">
				<Header />
				<div className="flex flex-grow h-1 overflow-hidden ">
					<Sidebar />
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default Layout;
