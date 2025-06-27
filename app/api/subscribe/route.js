import { NextResponse } from 'next/server';

export async function POST(request) {
  // 1. Hent data fra anmodningen fra din frontend
  const formData = await request.formData();
  const email = formData.get('fields[email]');

  // Tjek om email er til stede
  if (!email) {
    return NextResponse.json({ success: false, message: 'Email er påkrævet.' }, { status: 400 });
  }

  // 2. Forbered data til at blive sendt videre til MailerLite
  const mailerliteFormData = new URLSearchParams();
  mailerliteFormData.append('fields[email]', email);
  mailerliteFormData.append('ml-submit', '1');
  mailerliteFormData.append('anticsrf', 'true');

  try {
    // 3. Send data fra din server til MailerLite
    const response = await fetch('https://assets.mailerlite.com/jsonp/789462/forms/149197210107512439/subscribe', {
      method: 'POST',
      body: mailerliteFormData,
    });

    const textResponse = await response.text();

    // 4. Tjek MailerLites svar og send et passende svar tilbage til din frontend
    if (textResponse.includes('"success":true')) {
      return NextResponse.json({ success: true, message: 'Tilmelding succesfuld!' });
    } else {
        // Forsøg at parse en fejlbesked fra MailerLite
        try {
            const errorData = JSON.parse(textResponse.match(/{.*}/s)[0]);
            const errorMessage = errorData.errors?.fields.email[0] || 'En fejl opstod hos MailerLite.';
            return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
        } catch {
            return NextResponse.json({ success: false, message: 'Kunne ikke behandle svar fra MailerLite.' }, { status: 500 });
        }
    }
  } catch (error) {
    console.error('Fejl i API-rute til MailerLite:', error);
    return NextResponse.json({ success: false, message: 'Serverfejl. Kunne ikke kontakte MailerLite.' }, { status: 500 });
  }
}