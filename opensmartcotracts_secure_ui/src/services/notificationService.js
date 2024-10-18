import swal from "sweetalert2";


export const notifySuccess = async (message) => swal.fire({
    toast: true,
    icon: 'success',
    title: message,
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})

export const notifyWarning = async (message) => swal.fire({
    toast: true,
    icon: 'warning',
    title: message,
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})

export const notifyError = async (message) => swal.fire({
    toast: true,
    icon: 'error',
    title: message,
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})

export const notifyFormValidationError = async () => swal.fire({
    toast: true,
    icon: 'error',
    title: 'Fill required inputs before submitting!',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})
