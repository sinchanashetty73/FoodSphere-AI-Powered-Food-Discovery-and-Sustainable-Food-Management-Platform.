import React from "react";
import "./Footer.css";

import { 
  FaInstagram,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";


const Footer = () => {

return (

<footer className="footer">


<div className="footer-container">


{/* LEFT */}

<div className="footer-col">

<h2> FoodSpire</h2>

<p>
Smart Food & Community Ecosystem promoting
sustainability and healthy eating.
</p>

</div>



{/* QUICK LINKS */}

<div className="footer-col">

<h3>Quick Links</h3>

<p>Home</p>
<p>Restaurants</p>
<p>Homemade Foods</p>
<p>Night Deals</p>

</div>



{/* SUPPORT */}

<div className="footer-col">

<h3>Support</h3>

<p>About Us</p>
<p>Contact</p>
<p>FAQs</p>
<p>Privacy Policy</p>

</div>



{/* SOCIAL MEDIA */}

<div className="footer-col">

<h3>Connect</h3>

<p>
Follow us on social media for updates
and special offers.
</p>


<div className="social-icons">


<a 
href="https://www.instagram.com/"
target="_blank"
rel="noreferrer"
>

<FaInstagram/>

</a>


<a
href="https://www.facebook.com/"
target="_blank"
rel="noreferrer"
>

<FaFacebookF/>

</a>



<a
href="https://github.com/"
target="_blank"
rel="noreferrer"
>

<FaGithub/>

</a>



<a
href="https://www.linkedin.com/"
target="_blank"
rel="noreferrer"
>

<FaLinkedinIn/>

</a>



<a
href="https://youtube.com/"
target="_blank"
rel="noreferrer"
>

<FaYoutube/>

</a>


</div>


</div>


</div>


<hr/>


<p className="footer-bottom">

© 2025 FoodSpire AI. All rights reserved.

</p>


</footer>


);

};


export default Footer;