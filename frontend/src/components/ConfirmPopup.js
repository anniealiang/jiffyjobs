import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, Divider, Typography, DialogContentText, DialogContent, 
        DialogActions, DialogTitle, Link, Button, Pagination, Grid, 
        CardContent, Card, Box, IconButton, Chip, TextField, Avatar,
        Stack,  } from '@mui/material';

// handles congrats popup
export function ConfirmPopup({ open, onClose, dashboard, apply, state}) {

    const navigate = useNavigate();

    // close popups
    const handleApplyMore = () => {
        navigate('/JobBoard');
    };

    // goes to dashboard
    const handleToDashboard = () => {
        window.location.href = '/dashboard';
    };

    const renderFields = () => {
        if (state === 'congrats') {
            return (
                <>
                    <Dialog open={open} onClose={onClose} maxWidth={"360px"} PaperProps={{ sx: { width: '374px', height: '209px', borderRadius: "10.9px", display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Outfit' } }}>
                        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontFamily: 'Outfit', width: '100%', height: '12px', textAlign: 'center' }}>
                                <Typography style={{ fontFamily: 'Outfit', fontSize: '17px', fontWeight: 600, color: '#4A4FE4' }}>Congratulations!</Typography>
                            </div>
                            <div style={{ textAlign: 'center', fontFamily: 'Outfit', width: '259px', height: '46px', marginTop: '24px' }}>
                                <Typography style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: 400 }}>You have successfully submitted your profile. You can now track your status of the application in the <span style={{textDecoration: 'underline', fontWeight: 600}}>Dashboard</span>.</Typography>
                            </div>
                        </DialogContent>
                        <Divider style={{ width: '100%', height: '1.44px', paddingTop: '10px', fontWeight: 500 }} />
                        <DialogActions style={{ justifyContent: 'center', padding: '13px' }}>
                            <Button onClick={dashboard} sx={{ border: '1px solid #5B5B5B', borderRadius: '7px', textTransform: 'none', color: '#5B5B5B', fontFamily: 'Outfit', fontSize: '14px', width: '145px', height: '32px', fontWeight: 400 }}>
                                View Dashboard
                            </Button>
                            <Button onClick={apply} sx={{ border: '1px solid #D9D9D9', borderRadius: '7px', textTransform: 'none', color: 'white', backgroundColor: '#4A4FE4', '&:hover': {backgroundColor: '#4A4FE4'}, fontFamily: 'Outfit', fontSize: '14px', width: '145px', height: '32px', fontWeight: 400 }}>
                                Continue Applying
                            </Button>
                        </DialogActions>
                    </Dialog>     
                </>
            );
        } else {
            return (
                <>
                <Dialog open={open} onClose={onClose} maxWidth={"360px"} PaperProps={{ sx: { width: '374px', height: '209px', borderRadius: "10.9px", display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Outfit' } }}>
                    <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit', width: '100%', height: '12px', textAlign: 'center' }}>
                            <Typography style={{ fontFamily: 'Outfit', fontSize: '17px', fontWeight: 600, color: '#4A4FE4' }}>Withdrawn</Typography>
                        </div>
                        <div style={{ textAlign: 'center', fontFamily: 'Outfit', width: '259px', height: '46px', marginTop: '24px' }}>
                            <Typography style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: 400 }}>You have successfully withdrawn your profile. You can always apply to more jobs in job board by clicking <span style={{textDecoration: 'underline', fontWeight: 600}}>Apply More</span>.</Typography>
                        </div>
                    </DialogContent>
                    <Divider style={{ width: '100%', height: '1.44px', paddingTop: '10px', fontWeight: 500 }} />
                    <DialogActions style={{ justifyContent: 'center', padding: '13px' }}>
                        <Button onClick={handleToDashboard} sx={{ border: '1px solid #5B5B5B', borderRadius: '7px', textTransform: 'none', color: '#5B5B5B', fontFamily: 'Outfit', fontSize: '14px', width: '145px', height: '32px', fontWeight: 400 }}>
                            Back to Dashboard
                        </Button>
                        <Button onClick={handleApplyMore} sx={{ border: '1px solid #D9D9D9', borderRadius: '7px', textTransform: 'none', color: 'white', backgroundColor: '#4A4FE4', '&:hover': {backgroundColor: '#4A4FE4'}, fontFamily: 'Outfit', fontSize: '14px', width: '145px', height: '32px', fontWeight: 400 }}>
                            Apply More
                        </Button>
                    </DialogActions>
                </Dialog>   
                </>
            )
        }
    };

    return (
        renderFields()       
    );
}