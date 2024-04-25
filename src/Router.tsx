import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { ForgotPassword } from "./pages/forgot-password";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
};
