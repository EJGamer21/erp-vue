import { swal } from "sweetalert";

export const toastConfigs = {
    closeButton: true,
    progressBar: true,
    position: "top right",
    showMethod: "fadeInDown",
    hideMethod: "fadeOutRight",
    showDuration: "1000",
    hideDuration: "1000",
    timeOut: "5000"
};

export function showAlert(title, text, icon, time = null) {
    swal({
        title: title,
        text: text,
        icon: icon,
        timer: time
    });
}
