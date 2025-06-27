'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  CalendarIcon,
  ChevronRightIcon,
  SparklesIcon,
  UserGroupIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CommandLineIcon,
} from '@heroicons/react/20/solid'

// CSP-resistent MailerLite loading funktion
function loadMailerLiteScript(setMainFormSuccess, setFooterFormSuccess) {
  if (typeof window !== 'undefined' && !document.getElementById('mailerlite-script')) {
    
    // Success callbacks (hvis MailerLite scriptet loader)
    window.ml_webform_success_23805225 = () => {
      console.log('✅ MailerLite success callback triggered');
      setMainFormSuccess(true);
    };

    window.ml_webform_success_footer = () => {
      console.log('✅ MailerLite footer success callback triggered');
      setFooterFormSuccess(true);
    };

    // Prøv at loade MailerLite scriptet (kan blive blokeret af CSP)
    try {
      const script = document.createElement('script');
      script.id = 'mailerlite-script';
      script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ MailerLite script loaded successfully');
        fetch("https://assets.mailerlite.com/jsonp/789462/forms/149197210107512439/takel")
          .catch(err => console.log('MailerLite tracking failed:', err));
      };
      
      script.onerror = () => {
        console.warn('⚠️ MailerLite script failed to load (probably CSP)');
      };
      
      document.body.appendChild(script);
    } catch (error) {
      console.warn('⚠️ Script injection blocked by CSP:', error);
    }
  }
}

const primaryFeatures = [
  {
    name: 'Skriv bedre og bliv mere kreativ.',
    description: 'Prompts, der hjælper dig med at skrive, oversætte og redigere tekster. Metoder, der kan inspirere dig til at finde nye kreative løsninger.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Forretningsmodeller og effektive hacks.',
    description: 'Prompts, der fungerer som din egen managementkonsulent. Klar til at hjælpe dig med at løse komplekse problemer på jobbet.',
    icon: LightBulbIcon,
  },
  {
    name: 'Få styr på data og kode.',
    description: 'Lær at bruge prompts, der gør dig stærkere i Excel eller genererer decideret kildekode, du kan bruge.',
    icon: CommandLineIcon,
  },
]

const secondaryFeatures = [
  {
    name: 'Prøv mange forskellige prompts',
    description:
      'Ved at eksperimentere med mange forskellige prompts lærer du hurtigt selv at skrive bedre prompts. Jo flere slags du prøver, desto bedre bliver du til at få AI til at forstå dine behov.',
    href: '#',
    icon: SparklesIcon,
  },
  {
    name: 'Brug AI hver dag',
    description:
      'Daglig træning er nøglen til maksimal nytte af AI. Når du integrerer AI i din daglige rutine, opbygger du både en forståelse og erfaring, som du kan bruge fremover med nye AI-værktøjer.',
    href: '#',
    icon: CalendarIcon,
  },
  {
    name: 'Fra stavekontrol til ny kollega',
    description:
      'AI begynder måske som en simpel stavekontrol, men med regelmæssig træning udvikler AI sig til en uvurderlig samarbejdspartner, der både kan hjælpe dig og udfordre dig.',
    href: '#',
    icon: UserGroupIcon,
  },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mainFormSubmitting, setMainFormSubmitting] = useState(false)
  const [mainFormSuccess, setMainFormSuccess] = useState(false)
  const [footerFormSubmitting, setFooterFormSubmitting] = useState(false)
  const [footerFormSuccess, setFooterFormSuccess] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      window.scrollTo({
        top: absoluteTop - 50,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    loadMailerLiteScript(setMainFormSuccess, setFooterFormSuccess);
  }, []);

  // CSP-resistent form submission handler
  const handleFormSubmit = async (e, formType) => {
    e.preventDefault();
    
    const form = e.target;
    const email = form.elements['fields[email]'].value;
    
    // Basic validation
    if (!email || !email.includes('@') || email.length < 5) {
      alert('Indtast venligst en gyldig email adresse');
      return;
    }
    
    console.log(`📧 Submitting ${formType} form for:`, email);
    
    // Set loading state
    if (formType === 'main') {
      setMainFormSubmitting(true);
    } else {
      setFooterFormSubmitting(true);
    }
    
    try {
      const formData = new FormData(form);
      
      // Prøv MailerLite API submission
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      console.log('✅ Form submitted successfully');
      
      // Simuler success efter 2 sekunder
      setTimeout(() => {
        if (formType === 'main') {
          setMainFormSuccess(true);
          setMainFormSubmitting(false);
        } else {
          setFooterFormSuccess(true);
          setFooterFormSubmitting(false);
        }
      }, 2000);
      
    } catch (error) {
      console.error('❌ Form submission failed:', error);
      
      // Fallback: Redirect til MailerLite landing page
      const fallbackUrl = `https://landing.mailerlite.com/webforms/landing/p8m1z1?fields[email]=${encodeURIComponent(email)}`;
      
      if (confirm('Der opstod en teknisk fejl. Vil du åbne tilmeldingen i et nyt vindue?')) {
        window.open(fallbackUrl, '_blank');
        
        if (formType === 'main') {
          setMainFormSuccess(true);
        } else {
          setFooterFormSuccess(true);
        }
      }
      
      // Reset loading state
      if (formType === 'main') {
        setMainFormSubmitting(false);
      } else {
        setFooterFormSubmitting(false);
      }
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="relative isolate">
          <svg
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={0}
                id="hero-pattern-55d3d46d"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-50">
              <path
                d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect fill="url(#hero-pattern-55d3d46d)" width="100%" height="100%" strokeWidth={0} />
          </svg>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              style={{ zIndex: -1 }}
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              style={{ zIndex: -1 }}
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
            </div>
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                <div className="flex">
                  <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    <span className="font-semibold text-indigo-600">Gratis e-mailkursus</span>
                    <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                    <a href="#newsletter" className="flex items-center gap-x-1"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          scrollToSection('newsletter');
                                        }}
                                        >
                      <span aria-hidden="true" className="absolute inset-0" />
                      Ny AI-udfordring hver dag i et år
                      <ChevronRightIcon aria-hidden="true" className="-mr-2 size-5 text-gray-400" />
                    </a>
                  </div>
                </div>
                <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                  Sæt 10 minutter i kalenderen til daglig AI-træning
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Du bruger måske allerede ChatGPT til at rette stavefejl eller skrive en sjov festsang. Men hvis du virkelig ønsker at løfte dit arbejde med AI, kræver det en målrettet indsats at ændre vaner og lære nye metoder.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#newsletter"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('newsletter');
                    }}
                  >
                    Tilmeld dig
                  </a>
                  <a 
                    href="#features" 
                    className="text-sm/6 font-semibold text-gray-900"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('features');
                    }}
                  >
                    Læs mere <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="hidden sm:block mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
                <svg role="img" viewBox="0 0 366 729" className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
                  <title>App screenshot</title>
                  <defs>
                    <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                      <rect rx={36} width={316} height={684} />
                    </clipPath>
                  </defs>
                  <path
                    d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                    fill="#4B5563"
                  />
                  <path
                    d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                    fill="#343E4E"
                  />
                  <foreignObject
                    width={316}
                    height={684}
                    clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                    transform="translate(24 24)"
                  >
                    <img
                      alt=""
                      src="/mobile-app-screenshot.png"
                      width="316"
                      height="684"
                    />
                  </foreignObject>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-6 lg:px-8" id="features">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
              <div className="lg:row-start-2 lg:max-w-md">
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                  Modtag en ny prompt hver dag og afprøv den i dit AI-værktøj.
                </h2>
                <p className="mt-6 text-lg/8 text-gray-300">
                  Træningen løber henover et år. Hver dag vil du på mail modtage en prompt, du nemt kan kopiere ind i ChatGPT, Copilot, Claude eller hvad du end måtte bruge.
                </p>
              </div>
              <img
                alt="Product screenshot"
                src="/dark-project-app-screenshot.png"
                width={2432}
                height={1442}
                className="relative -z-20 max-w-xl min-w-full rounded-xl ring-1 shadow-xl ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
              />
              <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
                <dl className="max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">
                  {primaryFeatures.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt className="ml-9 inline-block font-semibold text-white">
                        <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-500" />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-12 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:top-auto lg:bottom-[-12rem] lg:translate-y-0 lg:transform-gpu"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
              />
            </div>
          </div>
        </div>

        {/* Features grid section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Træn dine AI-rutiner</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              Du skal ændre vaner for at få glæde af AI
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
            AI handler ikke kun om teknologi. Du bliver ikke automatisk bedre til dit arbejde blot ved at købe adgang til ChatGPT eller Claude. Værdien kommer, når du ændrer dine vaner og lærer at bruge AI i dine daglige rutiner.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                    <feature.icon aria-hidden="true" className="size-5 flex-none text-indigo-600" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Newsletter section - CSP Safe */}
        <div id="newsletter" className="mx-auto mt-32 max-w-7xl sm:mt-48 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Start din træning i dag
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
              Du kan til enhver tid afmelde dig forløbet igen, og du modtager ikke andet end en daglig AI-udfordring. Når der er gået et år, stopper det automatisk. Ingen reklamer eller spam.
            </p>
            
            <div className="mx-auto mt-10 max-w-md">
              {mainFormSuccess ? (
                <div className="text-center py-4 bg-white/10 rounded-md">
                  <p className="text-white font-medium">🎉 Tak for din tilmelding! Tjek din email for bekræftelse.</p>
                </div>
              ) : (
                <>
                  <form 
                    className="flex gap-x-4"
                    action="https://assets.mailerlite.com/jsonp/789462/forms/149197210107512439/subscribe" 
                    method="post"
                    onSubmit={(e) => handleFormSubmit(e, 'main')}
                  >
                    <input type="hidden" name="ml-submit" value="1" />
                    <input type="hidden" name="anticsrf" value="true" />
                    
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="fields[email]"
                      type="email"
                      required
                      placeholder="Indtast din email"
                      autoComplete="email"
                      className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6"
                      disabled={mainFormSubmitting}
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50"
                      disabled={mainFormSubmitting}
                    >
                      {mainFormSubmitting ? 'Sender...' : 'Tilmeld mig'}
                    </button>
                  </form>
                  
                  {/* Backup link for CSP-blocked users */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                      Problemer med tilmelding?{' '}
                      <a 
                        href="https://landing.mailerlite.com/webforms/landing/p8m1z1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline"
                      >
                        Klik her for at tilmelde dig
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  r={1}
                  cx={0}
                  cy={0}
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>

      {/* About section */}
      <div className="overflow-hidden bg-white py-24 sm:py-32 sm:mt-24">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="max-w-4xl">
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
             Samlet og skrevet af Jacob Bøtter
            </h1>
            <p className="mt-6 text-xl/8 text-balance text-gray-700">
            Hej! Jeg hedder Jacob, og hver dag bruger jeg AI til en lang række opgaver. Gennem årene har jeg samlet prompts og metoder til at få mere værdi af min AI-anvendelse. I dette gratis e-mailkursus deler jeg mine mest effektive metoder med dig. Hver dag.
            </p>
          </div>
          <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            <div className="lg:pr-8">
              <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">Min baggrund</h2>
              <p className="mt-6 text-base/7 text-gray-600">
                Jeg har brugt de sidste 20 år på forkant med den digitale udvikling. Jeg har skrevet fem bøger om ledelse og teknologi og rådgivet hundredvis af virksomheder og ledere i, hvordan ny teknologi kan skabe bedre arbejdspladser.
              </p>
              <p className="mt-8 text-base/7 text-gray-600">
                I flere virksomheder har jeg været med til at implementere AI-værktøjer og træne medarbejdere. Her bliver det tydeligt at et traditionelt kursus er utilstrækkeligt, da medarbejderen ofte kommer tilbage til pinden og glemmer guldkornene fra kurset. Der skal ændres vaner og læres nye metoder, og det skal trænes hver eneste dag. Derfor har jeg lavet dette gratis brevkursus for at gøre det let for dig at få trænet hver dag.
              </p>
            </div>
            <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
              <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt="Jacob Bøtter"
                    src="/1.jpg"
                    className="block size-full object-cover"
                    width="560"
                    height="560"
                  />
                </div>
                <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                  <img
                    alt="Jacob Bøtter"
                    src="/2.jpg"
                    className="block size-full object-cover"
                    width="560"
                    height="560"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                  <img
                    alt="Jacob Bøtter"
                    src="/3.jpg"
                    className="block size-full object-cover"
                    width="560"
                    height="560"
                  />
                </div>
                <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                  <img
                    alt="Jacob Bøtter"
                    src="/4.jpg"
                    className="block size-full object-cover"
                    width="560"
                    height="560"
                  />
                </div>
              </div>
            </div>
            <div className="max-lg:mt-16 lg:col-span-1">
              <p className="text-base/7 font-semibold text-gray-500">En nem måde at komme i gang med AI</p>
              <hr className="mt-6 border-t border-gray-200" />
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
              <div className="flex flex-col gap-y-2">
                  <dt className="text-sm/6 text-gray-600">Metoder & prompts</dt>
                  <dd className="order-first text-6xl font-semibold tracking-tight">
                    <span>365</span>
                  </dd>
                </div>
                <div className="flex flex-col gap-y-2">
                  <dt className="text-sm/6 text-gray-600">Minutters daglig træning</dt>
                  <dd className="order-first text-6xl font-semibold tracking-tight">
                    <span>10</span>
                  </dd>
                </div>
                <div className="flex flex-col gap-y-2">
                  <dt className="text-sm/6 text-gray-600">Timers samlet investering</dt>
                  <dd className="order-first text-6xl font-semibold tracking-tight">
                    <span>60</span>
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 bg-[#121620] sm:mt-12">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-8 sm:pt-16 lg:px-8">
          <div className="border-t border-gray-800 pt-8">
            <div className="max-w-md mx-auto md:max-w-none md:flex md:justify-between md:gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white">Tilmeld dig forløbet</h3>
                <p className="mt-2 text-gray-400">
                Modtag en daglig AI-udfordring i et år. Du kan afmelde dig når som helst. 100% gratis og spamfrit.
                </p>
              </div>
              
              <div className="mt-8 md:mt-0">
                {footerFormSuccess ? (
                  <div className="text-center py-4 bg-[#1e2433]/50 rounded-md">
                    <p className="text-white font-medium">🎉 Tak for din tilmelding!</p>
                  </div>
                ) : (
                  <>
                    <form 
                      className="flex flex-col sm:flex-row sm:gap-x-4"
                      action="https://assets.mailerlite.com/jsonp/789462/forms/149197210107512439/subscribe" 
                      method="post"
                      onSubmit={(e) => handleFormSubmit(e, 'footer')}
                    >
                      <input type="hidden" name="ml-submit" value="1" />
                      <input type="hidden" name="anticsrf" value="true" />
                      
                      <div className="flex flex-col sm:flex-row w-full gap-3">
                        <input
                          id="footer-email"
                          name="fields[email]"
                          type="email"
                          required
                          placeholder="Indtast din email"
                          autoComplete="email"
                          className="min-w-0 flex-auto rounded-md bg-[#1e2433] px-4 py-3 text-base text-white border border-gray-700 outline-none placeholder:text-gray-500 focus:border-indigo-500"
                          disabled={footerFormSubmitting}
                        />
                        <button
                          type="submit"
                          className="flex-none rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 disabled:opacity-50"
                          disabled={footerFormSubmitting}
                        >
                          {footerFormSubmitting ? 'Sender...' : 'Tilmeld mig'}
                        </button>
                      </div>
                    </form>
                    
                    {/* Backup link for CSP issues */}
                    <div className="mt-3 text-center">
                      <a 
                        href="https://landing.mailerlite.com/webforms/landing/p8m1z1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-gray-300 underline"
                      >
                        Alternative tilmelding
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              Et AI-eksperiment af <a href="https://boetter.dk" className="text-indigo-400 hover:text-indigo-300">Jacob Bøtter</a> fra <a href="https://heutedenkenmorgenfertig.com" className="text-indigo-400 hover:text-indigo-300">Heute denken, morgen fertig</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}