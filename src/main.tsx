import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Providers from '@/app/provider';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers />
	</StrictMode>,
);
