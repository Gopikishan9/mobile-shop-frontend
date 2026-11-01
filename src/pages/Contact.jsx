import React from "react";

const Contact = () => {
  const phone = "919076588408";
  const message = "Hi, can I know more about your shop?";

  const email = "aakashmobilemart@gmail.com";

  const address = `Vishnu Mandir Tiraha, Near Punjab National Bank, Farenda,
            Maharajganj, UP, 273155`;

  const handleEmailClick = () => {
    // Email client open hoga
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    // Phone dial pad open hoga
    window.location.href = "tel:+919076588408";
  };

  const handleWhatsappClick = () => {
    // Phone dial pad open hoga
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  // const [copiedText, setCopiedText] = useState("");

  // const handleCopy = async (textToCopy, type) => {
  //   try {
  //     // Yeh line text ko copy karti hai
  //     await navigator.clipboard.writeText(textToCopy);
  //     setCopiedText(type);

  //     // 2 second baad 'Copied' message hataane ke liye
  //     setTimeout(() => setCopiedText(""), 2000);
  //   } catch (err) {
  //     console.error("Copy karne me dikkat aayi: ", err);
  //   }
  // };

  return (
    <div className="contact">
      <h2>Contact</h2>
      <div className="contact-info">
        <div className="contact-item">
          <div className="contact-akash">
            <img src="./icons/telephone.png" alt="phone" width={50} />
            <p>Phone</p>
          </div>
          <p onClick={handlePhoneClick}>+91 90765 88408</p>
        </div>

        <div className="contact-item">
          <div className="contact-akash">
            <img src="./icons/whatsapp.png" alt="whatsapp" width={50} />
            <p>Whatsapp</p>
          </div>
          <p onClick={handleWhatsappClick}>+91 90765 88408</p>
        </div>

        <div className="contact-item">
          <div className="contact-akash">
            <img src="./icons/mail.png" alt="email" width={50} />
            <p>Email</p>
          </div>
          <p onClick={handleEmailClick}>{email}</p>
        </div>

        <div className="contact-item">
          <div className="contact-akash">
            <img src="./icons/location.png" alt="location" width={50} />
            <p>Location</p>
          </div>
          <p>{address}</p>
        </div>
      </div>

      <div className="contact-form">
        <h3>Send us a Message</h3>

        <form className="contact-form">
          <input type="text" placeholder="Enter your name" />

          <input type="tel" placeholder="Enter your phone number" />

          <textarea
            placeholder="Enter your message"
            rows="3"
            maxLength={130}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
