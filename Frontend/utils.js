import { toast } from 'react-toastify';

export const HandleSuccess = (message) => {
    // console.log('isDark->',isDark);
    toast.success(message, {
        position:'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor:  '#28a745', // Dark background for dark theme
            color:'#000' // White text for dark theme
        }
    });
};
//#28a745 

export const HandleError = (message) => {
    // console.log('isDark->',isDark);
    
    toast.error(message, {
        position: 'top-left',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor: '#dc3545',
            color: '#000'
        }
    });
};
// 343a40

export const notifyInfo = (message) => {
    toast.info(message, {
        position:'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor:  '#17a2b8',
            color: '#000'
        }
    });
};
