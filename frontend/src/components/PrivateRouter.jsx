import { Outlet, navigate } from "react-router-dom";

const isAuthenticate = () => !! localStorage.getItem('access_token');

export default function PrivateRouter = () => 