import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Provider from '@/App';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<Provider />
		</StrictMode>,
	);
}
