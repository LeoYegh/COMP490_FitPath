//I had the jsdoc stuff here for ages and couldn't figure out why it wouldn't work.
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactUs.css';
//should update this to accomadate multiple forms and templates later but as of right now unsure which email templates would be necessary
/** 
 *
 * @returns {form@var;sendEmail|String} ContactUs
 * @author Feather Hoshizora
 * 11/10/2025
 * Connects to Email JS service to send emails back and forth from the app directly, 
 * to be later utilized by Contact form as well as potentially other parts of the app
 */
export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
// sort of placeholder atm
    emailjs
      .sendForm('service_u3bnr7a', 'template_swquodl', form.current, {//contactUs form
        publicKey: 'UCgiIJzRHDSOmrJF7',//Feather's account
      })
      .then(
        () => {
          console.log('sent email');//allows for records of emails sent and for debugging
        },
        (error) => {
          console.log('EMAIL THING BROKE', error.text);//hopefully will not be used?
        },
      );
  };

  return (
          
    <form ref={form} onSubmit={sendEmail}>
    <div className="contact">
            <div className='headerContainer'>
                <h1>Share feedback!</h1>
            </div>

        </div>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    
  );
};
export default ContactUs
/**service_u3bnr7a gmail service id
 *UCgiIJzRHDSOmrJF7 feather emailJS key
 *template_swquodl contact us form
 */
