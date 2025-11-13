/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 * Feather Hoshizora
 * 11/10/2025
 */
import React { useRef } from 'react';
import emailjs from '@emailjs/browser';
//should update this to accomadate multiple forms and templates later but as of right now unsure which email templates would be necessary
export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
// sort of placeholder
    emailjs
      .sendForm('service_u3bnr7a', 'template_swquodl', form.current, {//contactUs form
        publicKey: 'UCgiIJzRHDSOmrJF7',//Feather's account
      })
      .then(
        () => {
          console.log('sent email');
        },
        (error) => {
          console.log('EMAIL THING BROKE', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
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
//service_u3bnr7a gmail service id
//UCgiIJzRHDSOmrJF7 feather emailJS key
//template_swquodl contact us form