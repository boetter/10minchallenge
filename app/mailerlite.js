// This file contains the minimal required MailerLite script
export function loadMailerLiteScript() {
  // Only load the script if it hasn't been loaded yet
  if (!document.getElementById('mailerlite-script')) {
    const script = document.createElement('script');
    script.id = 'mailerlite-script';
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    script.async = true;
    script.onload = () => {
      // Fetch the form tracking endpoint
      fetch("https://assets.mailerlite.com/jsonp/789462/forms/149197210107512439/takel");
    };
    document.body.appendChild(script);
  }
}

// Function to handle form submission success
export function handleMailerLiteSuccess() {
  const form = document.getElementById('ml-form-23805225');
  const successMessage = document.getElementById('ml-form-successContent-23805225');
  
  if (form && successMessage) {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
  }
}
