import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    AlertTitle,
    Box,
    TextField
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import axios from "axios";
import './volunteerInfoSnippet2.css';
import RegistrationAlert from './alert';

const CustomAlertDialog = ({ open, onClose, type, message }) => {
    const alertStyles = {
        success: {
            icon: <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main' }} />,
            color: 'success',
            title: 'פעולה הושלמה בהצלחה',
            buttonColor: 'success'
        },
        error: {
            icon: <CancelIcon sx={{ fontSize: 48, color: 'error.main' }} />,
            color: 'error',
            title: 'שגיאה',
            buttonColor: 'error'
        },
        info: {
            icon: <InfoIcon sx={{ fontSize: 48, color: 'info.main' }} />,
            color: 'info',
            title: 'שים לב',
            buttonColor: 'info'
        }
    };

    const currentStyle = alertStyles[type];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    borderRadius: '12px',
                    minWidth: '320px',
                    maxWidth: '400px'
                }
            }}
        >
            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    py: 2
                }}>
                    {currentStyle.icon}
                    <Alert
                        severity={currentStyle.color}
                        icon={false}
                        sx={{
                            mt: 2,
                            width: '100%',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                            '& .MuiAlert-message': {
                                width: '100%',
                                textAlign: 'center'
                            }
                        }}
                    >
                        <AlertTitle sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                            {currentStyle.title}
                        </AlertTitle>
                        {message}
                    </Alert>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                    variant="contained"
                    color={currentStyle.buttonColor}
                    onClick={onClose}
                    sx={{
                        minWidth: '120px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        borderRadius: '8px'
                    }}
                >
                    אישור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const VolunteerInfoSnippet = ({ location, isFromMap = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [showRegistrationAlert, setShowRegistrationAlert] = useState(false);
    const [showCancellationAlert, setShowCancellationAlert] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [cancelEmail, setCancelEmail] = useState('');
    const [showEmailError, setShowEmailError] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        notes: '',
    });

    // בדיקת הרשמה קיימת בעת פתיחת הדיאלוג
    useEffect(() => {
        const checkExistingRegistration = async () => {
            if (location._id) {
                try {
                    // נסה לקבל את המייל מהלוקל סטורג'
                    const savedEmail = localStorage.getItem(`registeredEmail_${location._id}`);
                    if (savedEmail) {
                        const response = await axios.get(`/api/check-registration/${location._id}/${savedEmail}`);
                        if (response.data.isRegistered) {
                            setIsRegistered(true);
                            setRegisteredEmail(savedEmail);
                            setFormData(prev => ({ ...prev, email: savedEmail }));
                        }
                    }
                } catch (error) {
                    console.error('Error checking initial registration:', error);
                }
            }
        };

        if (isOpen) {
            checkExistingRegistration();
        }
    }, [isOpen, location._id]);

    // בדיקת הרשמה בעת שינוי המייל
    useEffect(() => {
        const checkExistingRegistration = async () => {
            if (formData.email && location._id) {
                try {
                    const response = await axios.get(`/api/check-registration/${location._id}/${formData.email}`);
                    if (response.data.isRegistered) {
                        setIsRegistered(true);
                        setRegisteredEmail(formData.email);
                        setRegistrationError('כבר נרשמת להתנדבות זו');
                    } else {
                        setIsRegistered(false);
                        setRegisteredEmail('');
                        setRegistrationError('');
                    }
                } catch (error) {
                    console.error('Error checking registration:', error);
                }
            }
        };

        const timeoutId = setTimeout(checkExistingRegistration, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.email, location._id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'email') {
            setRegistrationError('');
        }
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setIsRegistering(false);
        setFormData({ name: '', phone: '', email: '', notes: '' });
        setRegistrationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkResponse = await axios.get(`/api/check-registration/${location._id}/${formData.email}`);
            if (checkResponse.data.isRegistered) {
                setAlert({
                    open: true,
                    type: 'error',
                    message: 'כתובת המייל שהזנת כבר רשומה להתנדבות זו'
                });
                return;
            }

            const response = await axios.post('/api/register-volunteer', {
                ...formData,
                locationId: location._id
            });

            if (response.data.success) {
                // שמירת המייל בלוקל סטורג'
                localStorage.setItem(`registeredEmail_${location._id}`, formData.email);
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'ההרשמה להתנדבות בוצעה בהצלחה! פרטים נשלחו לכתובת המייל שהזנת'
                });
                handleClose();
                setIsRegistered(true);
                setRegisteredEmail(formData.email);
            }
        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'אירעה שגיאה בהרשמה. נא לנסות שוב'
            });
        }
    };

    const handleCancelRegistration = async () => {
        const emailToCancel = cancelEmail || registeredEmail;
        
        if (!emailToCancel) {
            setAlert({
                open: true,
                type: 'error',
                message: 'נא להזין את כתובת המייל איתה נרשמת'
            });
            return;
        }

        try {
            const isRegistered = await checkRegistration(emailToCancel);

            if (!isRegistered) {
                setAlert({
                    open: true,
                    type: 'error',
                    message: 'כתובת המייל שהזנת אינה רשומה להתנדבות זו'
                });
                return;
            }

            await axios.delete(`/api/cancel-registration`, {
                data: {
                    locationId: location._id,
                    email: emailToCancel
                }
            });

            // מחיקת המייל מהלוקל סטורג'
            localStorage.removeItem(`registeredEmail_${location._id}`);
            
            setIsRegistered(false);
            setRegisteredEmail('');
            setAlert({
                open: true,
                type: 'success',
                message: 'ביטול ההרשמה בוצע בהצלחה'
            });
            setShowCancelConfirm(false);
            setCancelEmail('');

        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'אירעה שגיאה בביטול ההרשמה. נא לנסות שוב'
            });
        }
    };

    const checkRegistration = async (email) => {
        try {
            const response = await axios.get(`/api/check-registration/${location._id}/${email}`);
            return response.data.isRegistered;
        } catch (error) {
            console.error('Error checking registration:', error);
            return false;
        }
    };

    const handleCancelEmailChange = (e) => {
        setCancelEmail(e.target.value);
    };

    return (
        <div className="reg">
            <div className="volunteering" dir="rtl">
                <p className="locationName">{location.farmName || 'שם החווה לא זמין'} | {location.area}, {location.location || 'לא צוין'} </p>
                <p className="type">סוג התנדבות: {location.volunteerType || 'לא צוין'}</p>
                {isRegistered && (
                    <div className="registration-status">
                        <p className="reg-message">הנך רשום/ה להתנדבות זו</p>
                        <Button
                            className="cancel-registration-inline"
                            onClick={() => setShowCancelConfirm(true)}
                        >
                            ביטול הרשמה
                        </Button>
                    </div>
                )}
            </div>
    
            <Button className="details-registration" onClick={handleOpen}>
                לפרטים והרשמה להתנדבות
            </Button>
    
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                disableScrollLock={true}
                PaperProps={{
                    style: {
                        borderRadius: '15px', 
                        maxWidth: '500px',
                        minWidth: '400px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }
                }}
            >
                <DialogContent className="details-and-reg" dir="rtl">
                    <DialogTitle className="location-headline">{location.farmName || 'פרטי התנדבות'}</DialogTitle>
                    
                    {!isRegistering ? (
                        <>
                            <div className="volunteering-details">
                                <section>
                                    <h4 className="description2">תיאור ההתנדבות</h4>
                                    <p className="location-des">{location.description || 'אין תיאור זמין'}</p>
                                </section>
                                <section>
                                    <h4 className="contactInfo">פרטי התקשרות</h4>
                                    <div className="contact">
                                        <p>איש קשר: {location.contactPerson || 'לא צוין'}</p>
                                        <p>טלפון: {location.contactPhone || 'לא צוין'}</p>
                                        <p>אימייל: {location.contactEmail || 'לא צוין'}</p>
                                    </div>
                                </section>
                            </div>
                            {isRegistered ? (
                                <div className="registration-status-message">
                                    <p>את/ה כבר רשום/ה להתנדבות זו בכתובת {registeredEmail}</p>
                                    <Button 
                                        className="cancel-registration-button"
                                        onClick={() => setShowCancelConfirm(true)}
                                    >
                                        ביטול הרשמה
                                    </Button>
                                </div>
                            ) : (
                                <Button 
                                    className="registretion-button" 
                                    onClick={() => setIsRegistering(true)}
                                >
                                    הרשמה להתנדבות
                                </Button>
                            )}
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="registration-form">
                            <TextField
                                className="form-input"           
                                name="name"
                                label="שם מלא"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        right: "1.5rem",
                                        left: "unset",
                                        transformOrigin: "right"
                                    },
                                    "& .MuiInputLabel-shrink": {
                                        color: '#cccccc',
                                        transform: "translate(0, -1.5rem) scale(0.75)",
                                        right: "0.75rem"
                                    },
                                    "& .MuiInputBase-input": {
                                        textAlign: "right",
                                        color: 'rgb(85, 84, 84)',
                                        "&:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important",
                                            WebkitTextFillColor: "inherit !important"
                                        },
                                        "&:-webkit-autofill:hover": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        },
                                        "&:-webkit-autofill:focus": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused": {
                                            "& fieldset": {
                                                borderColor: '#e0e0e0'
                                            }
                                        }
                                    }
                                }}
                            />
                            <TextField
                                className="form-input"
                                name="phone"
                                label="טלפון"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        right: "1.5rem",
                                        left: "unset",
                                        transformOrigin: "right"
                                    },
                                    "& .MuiInputLabel-shrink": {
                                        color: '#cccccc',
                                        transform: "translate(0, -1.5rem) scale(0.75)",
                                        right: "0.75rem"
                                    },
                                    "& .MuiInputBase-input": {
                                        textAlign: "right",
                                        color: 'rgb(85, 84, 84)',
                                        "&:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important",
                                            WebkitTextFillColor: "inherit !important"
                                        },
                                        "&:-webkit-autofill:hover": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        },
                                        "&:-webkit-autofill:focus": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused": {
                                            "& fieldset": {
                                                borderColor: '#e0e0e0'
                                            }
                                        }
                                    }
                                }}
                            />
                            <TextField
                                className="form-input"
                                name="email"
                                type="email"
                                label="אימייל"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                error={!!registrationError}
                                helperText={registrationError}
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        right: "1.5rem",
                                        left: "unset",
                                        transformOrigin: "right"
                                    },
                                    "& .MuiInputLabel-shrink": {
                                        color: '#cccccc',
                                        transform: "translate(0, -1.5rem) scale(0.75)",
                                        right: "0.75rem"
                                    },
                                    "& .MuiInputBase-input": {
                                        textAlign: "right",
                                        color: 'rgb(85, 84, 84)',
                                        "&:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important",
                                            WebkitTextFillColor: "inherit !important"
                                        },
                                        "&:-webkit-autofill:hover": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        },
                                        "&:-webkit-autofill:focus": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused": {
                                            "& fieldset": {
                                                borderColor: '#e0e0e0'
                                            }
                                        }
                                    }
                                }}
                            />
                            <TextField
                                className="form-input"
                                name="notes"
                                label="הערות"
                                value={formData.notes}
                                onChange={handleInputChange}
                                multiline
                                rows={2}
                                fullWidth
                                margin="normal"
                                sx={{
                                    "& .MuiInputLabel-root": {
                                        right: "1.5rem",
                                        left: "unset",
                                        transformOrigin: "right"
                                    },
                                    "& .MuiInputLabel-shrink": {
                                        color: '#cccccc',
                                        transform: "translate(0, -1.5rem) scale(0.75)",
                                        right: "0.75rem"
                                    },
                                    "& .MuiInputBase-input": {
                                        textAlign: "right",
                                        color: 'rgb(85, 84, 84)',
                                        "&:-webkit-autofill": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important",
                                            WebkitTextFillColor: "inherit !important"
                                        },
                                        "&:-webkit-autofill:hover": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        },
                                        "&:-webkit-autofill:focus": {
                                            WebkitBoxShadow: "0 0 0 1000px #f5f5f5 inset !important"
                                        }
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused": {
                                            "& fieldset": {
                                                borderColor: '#e0e0e0'
                                            }
                                        }
                                    }
                                }}
                            />
                            <Button 
                                className="register" 
                                type="submit"
                                disabled={isRegistered}
                            >
                                שליחת הרשמה
                            </Button>
                        </form>
                    )}
                    
                    <DialogActions>
                        <Button className="close" onClick={handleClose} disableScrollLock={true}>סגור</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
    
            <Dialog  className="cancelWindow"
                open={showCancelConfirm} 
                onClose={() => {
                    setShowCancelConfirm(false);
                    setRegistrationError('');
                    setCancelEmail('');
                }}
                PaperProps={{
                    style: {
                        borderRadius: '15px', 
                        maxWidth: '80%', // שימוש באחוזים
                        minWidth: '260px',
                        padding: '15px',
                
                    }
                }}
            >
                <DialogTitle dir="rtl" className="cancel-window">ביטול הרשמה</DialogTitle>
                <DialogContent 
                  className="details-and-reg" 
                  dir="rtl"
                  style={{
                   maxHeight: '80vh', // מגבלת גובה
                    overflowY: 'auto'  // גלילה פנימית
                   }}
    >
                    <p className="cancel-windowP">האם אתה בטוח שברצונך לבטל את ההרשמה?</p>
                    <TextField
                        className="inputP"
                        value={cancelEmail}
                        onChange={handleCancelEmailChange}
                        label="אימייל איתו נרשמת"
                        fullWidth
                        margin="normal"
                        color="#333"
                        error={showEmailError || !!registrationError}
                        helperText={showEmailError ? "נא להזין את האימייל איתו נרשמת" : registrationError}
                        sx={{
                            "& .MuiInputLabel-root": {
                                right: "1.5rem",
                                left: "unset",
                                transformOrigin: "right",
                            },
                            "& .MuiInputLabel-shrink": {
                                transform: "translate(0, -1.5rem) scale(0.75)",
                                right: "0.75rem",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "right",
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions className="dialog-actions" dir="rtl">
                    <Button
                        className="cancel-button"
                        onClick={() => {
                            setShowCancelConfirm(false);
                            setRegistrationError('');
                            setCancelEmail('');
                        }}
                    >
                        ביטול
                    </Button>
                    <Button
                        className="confirm-button"
                        onClick={handleCancelRegistration}
                    >
                        אישור ביטול הרשמה
                    </Button>
                </DialogActions>
            </Dialog>
    
            <RegistrationAlert
                showRegistrationAlert={showRegistrationAlert}
                showCancellationAlert={showCancellationAlert}
                onClose={() => {
                    setShowRegistrationAlert(false);
                    setShowCancellationAlert(false);
                }}
                isFromMap={isFromMap}
            />
            <CustomAlertDialog
                open={alert.open}
                onClose={() => setAlert({ ...alert, open: false })}
                type={alert.type}
                message={alert.message}
            />
        </div>
    );
};

export default VolunteerInfoSnippet;