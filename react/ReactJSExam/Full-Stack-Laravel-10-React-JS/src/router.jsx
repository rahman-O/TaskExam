import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import AddTableData from './components/AddTableData'

import ViewTableData from './components/ViewTableData'
import EdotTableData from "./components/EdotTableData";

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/add',
				element: <AddTableData />,
			},
			{
				path: '/view',
				element: <ViewTableData />,
			},
			{
				path: '/edit/:id',
				element: <EdotTableData />,
			},
		],
	},
]);

export default router;
