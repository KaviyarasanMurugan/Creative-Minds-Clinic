const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxw5hpaqtt8glB5QpZQgEAqwTMG17k2RsbitjRa6QpJkQsSIy3z_xUX9fccr6IdX6J4/exec";


function toggleMenu() {
  document.querySelector('.nav').classList.toggle('open');
}


function selectDoctor(name) {
  const select = document.getElementById('doctor');

  if (select) {
    select.value = name;
  }
}


/**
 * Submit normal appointment
 */
async function submitBooking(e) {

  e.preventDefault();

  const formMessage = document.getElementById('formMessage');

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const doctor = document.getElementById('doctor').value;
  const concern = document.getElementById('concern').value.trim();

  // Basic phone validation
  const phoneDigits = phone.replace(/\D/g, '');

  if (phoneDigits.length !== 10) {
    formMessage.textContent =
      'Please enter a valid 10-digit phone number.';
    return;
  }

  formMessage.textContent = 'Submitting your appointment request...';

  const appointmentData = {
    type: "appointment",

    name: name,
    phone: phone,
    email: email,

    age: "",

    specialist: doctor,

    service: "Appointment Request",

    preferredDate: "",
    preferredTime: "",

    message: concern
  };


  try {

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(appointmentData)
    });

    const result = await response.json();

    if (result.success) {

      formMessage.textContent =
        'Appointment request received! Thank you for contacting Creative Minds Clinic. Our team will contact you shortly to confirm your appointment.';

      document.getElementById('bookingForm').reset();

    } else {

      formMessage.textContent =
        'We could not submit your request. Please try again or contact us on WhatsApp.';

    }

  } catch (error) {

    console.error("Appointment submission error:", error);

    formMessage.textContent =
      'We could not submit your request right now. Please try again or contact us on WhatsApp.';

  }
}


/**
 * Submit DMIT enquiry
 */
async function submitDmit(e) {

  e.preventDefault();

  const formMessage =
    document.getElementById('dmitFormMessage');

  const name =
    document.getElementById('dmitName').value.trim();

  const phone =
    document.getElementById('dmitPhone').value.trim();

  const email =
    document.getElementById('dmitEmail').value.trim();

  const forWhom =
    document.getElementById('dmitFor').value;

  const requirement =
    document.getElementById('dmitRequirement').value.trim();


  // Basic phone validation
  const phoneDigits = phone.replace(/\D/g, '');

  if (phoneDigits.length !== 10) {

    formMessage.textContent =
      'Please enter a valid 10-digit phone number.';

    return;
  }


  formMessage.textContent =
    'Submitting your DMIT enquiry...';


  const dmitData = {

    type: "dmit",

    name: name,
    phone: phone,
    email: email,

    age: "",

    specialist: "Dr. Jabasteen",

    service: "DMIT",

    preferredDate: "",
    preferredTime: "",

    message:
      `For: ${forWhom || "Not specified"}\n` +
      `Requirement: ${requirement || "Not provided"}`
  };


  try {

    const response = await fetch(APPS_SCRIPT_URL, {

      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify(dmitData)

    });


    const result = await response.json();


    if (result.success) {

      formMessage.textContent =
        'DMIT enquiry received! Thank you for contacting Creative Minds Clinic. Our team will contact you shortly.';

      document.getElementById('dmitForm').reset();

    } else {

      formMessage.textContent =
        'We could not submit your enquiry. Please try again or contact us on WhatsApp.';

    }

  } catch (error) {

    console.error("DMIT submission error:", error);

    formMessage.textContent =
      'We could not submit your enquiry right now. Please try again or contact us on WhatsApp.';

  }

}


/**
 * Privacy Policy
 */
function openPrivacy(e) {

  if (e) {
    e.preventDefault();
  }

  document
    .getElementById('privacyModal')
    .classList.add('show');

  document
    .getElementById('privacyModal')
    .setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');
}


function closePrivacy() {

  document
    .getElementById('privacyModal')
    .classList.remove('show');

  document
    .getElementById('privacyModal')
    .setAttribute('aria-hidden', 'true');

  document.body.classList.remove('modal-open');
}


document.addEventListener('keydown', function(e) {

  if (e.key === 'Escape') {
    closePrivacy();
  }

});


/**
 * Current year
 */
document.getElementById('year').textContent =
  new Date().getFullYear();