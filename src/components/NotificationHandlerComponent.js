import {Component} from 'react';
import NotifService from '../services/Notif/NotifService';
import Device from '../services/Device';

export default class NotificationHandlerComponent extends Component {
  constructor(props) {
    super(props);
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  async componentDidMount() {
    this.notif.checkPermission(this.handlePerm.bind(this));
  }

  async onRegister(token) {
    console.log('SET DEVICE TOKEN', token.token);
    await Device.register(token.token);
  }

  async onNotif(notification) {
    console.log('NEW NOTIFICATION', notification);
    if (!notification.userInteraction) {
      this.notif.localNotif(notification?.data);
    }
  }

  handlePerm(perms) {
    // Alert.alert('Permissions', JSON.stringify(perms));
  }
}
