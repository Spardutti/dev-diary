import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/useAuth';
import { useLogout } from '@/features/auth/api/authQueries';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { useNavigate, useParams } from '@tanstack/react-router';
import { LogOut, PersonStandingIcon } from 'lucide-react';

const AvatarDropdown = () => {
	const user = useAuth();
	const { mutateAsync: logout } = useLogout();
	const navigate = useNavigate();
	const { projectId } = useParams({ strict: false });

	const onLogout = async () => {
		await logout();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="bg-black p-4 flex items-center gap-3">
					<Avatar className="w-10 h-10 text-sm bg-black border-2 border-green-500/80 rounded-none flex items-center justify-center relative overflow-visible">
						<AvatarFallback className="bg-black text-green-500 font-mono">
							{user.profile?.name.charAt(0)}
						</AvatarFallback>

						<div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500 rounded-none" />
						<div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-none" />
						<div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500 rounded-none" />
						<div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-none" />
					</Avatar>
					<div className="text-green-500 font-mono">
						<div className="text-xs opacity-70">[USER_ID:1337]</div>
						<div>{user.profile?.name}</div>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => navigate({ to: '/projects/$projectId/profile', params: { projectId: projectId! } })}
				>
					<PersonStandingIcon className="h-5 w-5" />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onLogout}>
					<LogOut className="h-5 w-5" />
					Disconnect
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AvatarDropdown;
