// eslint-disable-next-line vue/use-v-on-exact
/* eslint-disable vue/no-unused-components */
import swal from 'sweetalert'
import { NotificationProgrammatic as Notification } from 'buefy'

export function toastr (message = 'Default message', type = null, queue = false, duration = 5000) {
  Notification.open({
    message,
    type,
    duration,
    queue,
    position: 'is-top-right',
    iconPack: 'fas',
    hasIcon: true
  })
}

export function showAlert (title, text, icon, time = null) {
  swal({
    title: title,
    text: text,
    icon: icon,
    timer: time
  })
}
