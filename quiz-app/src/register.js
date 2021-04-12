import React from "react";
import {useState,useEffect} from "react";
function Register() {
      return (
        <form name="register_form" id="register_form">
        <table align="center" height="50%" width="100%" 
        cellspacing="2" cellpadding="2" border="5">
          
          <tr colspan="2" align="center"><td><b>REGISTER</b></td></tr>
          <tr>
            <td align="center"  width="41%"><strong>
              Username</strong></td>
            <td width="70%">
              <input type="text" id="u_name" value="" placeholder="Eg.John"
              size="20"/>
            </td>
          </tr>
          <tr>
            <td align="center"  width="41%"><strong>
              Handlename</strong></td>
            <td width="70%">
              <input type="text" id="u_Hname" value="" placeholder="Eg.DarkLight "
              size="20"/>
            </td>
          </tr>
          <tr>
            <td align="center"  width="41%"><strong>
              Email</strong></td>
            <td width="70%">
              <input type="email" id="u_email" value="" placeholder="Eg. Abc@gmail.com"
              size="20"/>
            </td>
          </tr>
          <tr>
            <td align="center"  width="41%"><strong>
              Password</strong></td>
            <td width="70%">
              <input type="password" id="u_pass" value="" placeholder="Your password"
              size="20"/>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p align="center">
                <input type="button" value="REGISTER" name="register" onClick=""/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="reset" value="RESET" name="reset" onClick="document.getElementByID('register_form').reset();" /></p>
            </td>
          </tr>
        </table>
        </form>
      );
}
export default Register;