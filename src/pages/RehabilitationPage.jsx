import React from "react";
import Header from "../components/header/Header";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SpineDetectioncard from "../components/spine/SpineDetectioncard";
import LeftNavi from "../components/rehabilitation/LeftNavi";


function RehabilitationPage() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    async function handleLogout() {
        try {
        await logout();
        navigate('/login');
        } catch {
        console.log('Failed to log out');
        }
    }
    return ( 
        <>
        <Header />
        <div style={{backgroundColor:"#FFFBEB", width:"100%",height:"100vh",display:"flex"}}>
            
            <LeftNavi/>
            <SpineDetectioncard/>
        </div>
        </>
    );
}

export default RehabilitationPage;