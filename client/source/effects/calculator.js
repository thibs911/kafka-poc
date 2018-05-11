import { request } from '../actions/networking';
import urls from '../constants/url-config';

export const sendMessage = message => dispatch =>
  dispatch(
    request(urls.MESSAGE, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  );

export default sendMessage;
