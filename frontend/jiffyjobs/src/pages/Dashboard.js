import React, { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

import { Box, Card } from '@mui/material'

import PropTypes from 'prop-types';

import { VerticalDashboardBar } from '../components/VerticalDashboardBar';
import { StatusDashboard } from '../components/StatusDashboard';
import { SavedJobDashboard } from '../components/SavedJobDashboard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div 
            role="tabpanel" 
            hidden={value !== index} 
            id={`vertical-tabpanel-${index}`} 
            aria-labelledby={`vertical-tab-${index}`} 
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function Dashboard() {
    const { renderVerticalDashBoard, value } = VerticalDashboardBar()
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [showToken, setShowToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) setShowToken(true);
    },[token]);

    useEffect(()=> {
        if (showToken) {
            console.log(showToken);
            toast.error('Please Login!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/login');
            setShowToken(false);
        }

    }, [showToken])

    return (
        <div className='outerCard1' style={{paddingTop: '1%'}}>
            <Box className='outer-box'>
                <div className='inner-div'>
                    <Card elevation='4' style={{display: 'flex', overflow: 'hidden', borderRadius: '15px', width: "100%"}}> 
                        { renderVerticalDashBoard }
                        <TabPanel value={value} index={7} className='progress-tab'>
                            <StatusDashboard/>
                        </TabPanel>
                        <TabPanel value={value} index={9} className='progress-tab'>
                            <SavedJobDashboard/>
                        </TabPanel>
                    </Card>
                </div>
            </Box> 
        </div>
    );
}