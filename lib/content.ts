// // app/lib/content.ts

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// // 1. Fetch Hero Heading Content
// export async function getHeroContent(): Promise<{ heading: string }> {
//   try {
//     const res = await fetch(`${API_BASE_URL}/hero`, { cache: 'no-store' });
    
//     // res.ok కాకపోతే ఎర్రర్ త్రో చేయకుండా నేరుగా ఫాల్‌బ్యాక్ రిటర్న్ చేయండి
//     if (!res.ok) {
//       console.warn("Backend API not responding, using static fallback for hero.");
//       return { heading: "WebNSoftware helps businesses build modern websites, eCommerce platforms, custom software and powerful digital marketing solutions that turn ideas into real business growth." };
//     }
    
//     return await res.json();
//   } catch (error) {
//     console.error("Hero Fetch Error:", error);
//     return { heading: "WebNSoftware helps businesses build modern websites, eCommerce platforms, custom software and powerful digital marketing solutions that turn ideas into real business growth." };
//   }
// }

// // 2. Fetch All Services
// export async function getServices(): Promise<any[]> {
//   try {
//     const res = await fetch(`${API_BASE_URL}/services`, { cache: 'no-store' });
    
//     if (!res.ok) {
//       console.warn("Backend API not responding, using static fallback for services.");
//       return getStaticServices(); // కింద ఉన్న స్టాటిక్ డేటాను వాడుకుంటుంది
//     }
    
//     return await res.json();
//   } catch (error) {
//     console.error("Services Fetch Error:", error);
//     return getStaticServices();
//   }
// }

// // బ్యాకెండ్ కనెక్ట్ అవ్వనప్పుడు చూపించాల్సిన పాత డేటా
// function getStaticServices() {
//   return [
//     {
//       id: 1,
//       title: "Business Websites",
//       shortDescription: "Mdern, fast and proofessional websites designed to build trust and generate customers.",
//       imageUrl: "/images/services/web-development.jpg",  
//       whatsappMessage: "Hi WebNSoftware, I am interested in Business Website development. Please share the details and pricing.",
//     },
//     {
//       id: 2,
//       title: "e-Commerce Websites",
//       shortDescription: "Complete online stores with products, cart, checkout, payments and admin management.",
//       imageUrl: "/images/services/ecommerce.jpg",
//       whatsappMessage: "Hi WebNSoftware, I am interested in an eCommerce Website. Please share the details and pricing.",
//     }
//     // మీకు కావాల్సిన మిగతా సర్వీసెస్ ఇక్కడ ఉంచుకోవచ్చు...
//   ];
// }


// app/lib/content.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ServiceItem {
  id?: string;
  _id?: string;
  title: string;
  shortDescription: string;
  imageUrl?: string;
  videoUrl?: string;
  status?: 'active' | 'inactive';
  whatsappMessage: string;
  category: 'business-web' | 'ecommerce' | 'digital-marketing' | 'ai-videos' | 'reels';
}


// 1. Fetch Hero Heading Content
export async function getHeroContent(): Promise<{ heading: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/hero`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch hero content');
    return res.json();
  } catch (error) {
    console.error(error);
    return { heading: "WebNSoftware helps businesses build modern websites..." }; // Fallback
  }
}

// 2. Fetch All Services
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Fallback empty array
  }
}

// 3. get about section 
// app/lib/content.ts లో చివరన యాడ్ చేయండి

export interface AboutData {
  eyebrow: string;
  title: string;
  description: string;
}

export async function getAboutContent(): Promise<AboutData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/about`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch about content from backend:", error);
    return null; // బ్యాకెండ్ ఎర్రర్ వస్తే కాంపోనెంట్‌లోని ఫాల్‌బ్యాక్ డేటా ప్లే అవుతుంది
  }
}

