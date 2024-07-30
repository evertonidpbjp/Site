// pages/components/[type]/[subtype]/[name].js

import React from 'react';
import { useRouter } from 'next/navigation';
import AnimationRevealPage from '../helpers/AnimationRevealPage';
import {RestaurantLandingPage} from '../demos/RestaurantLandingPage';
// import {HotelTravelLandingPage} from '../demos/HotelTravelLandingPage';  
// import {SaaSProductLandingPage} from '../demos/SaaSProductLandingPage';  
// import {ServiceLandingPage} from '../demos/ServiceLandingPage,';  
// import {EventLandingPage} from '../demos/EventLandingPage';  
// import {AgencyLandingPage} from '../demos/AgencyLandingPage';  
// import {HostingCloudLandingPage} from '../demos/AgencyLandingPage';
import {
  RestaurantLandingPageImageSrc,
  // HotelTravelLandingPageImageSrc,
  // SaaSProductLandingPageImageSrc,
  // ServiceLandingPageImageSrc,
  // EventLandingPageImageSrc,
  // AgencyLandingPageImageSrc,
  // HostingCloudLandingPageImageSrc,
} from '../../../public/images/demo/RestaurantLandingPage.jpeg';

export const components = {
  landingPages: {
    RestaurantLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
    HotelTravelLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
    SaaSProductLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
    ServiceLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
    EventLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
    AgencyLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
    HostingCloudLandingPage: {
      component: RestaurantLandingPage,
      imageSrc: RestaurantLandingPageImageSrc,
      url: "/components/landingPages/RestaurantLandingPage",
    },
  },
};

const ComponentRenderer = () => {
  const router = useRouter();
  const { type, subtype, name } = router.query;

  let Component = null;
  try {
    if (type === 'blocks' && subtype) {
      Component = components[type][subtype]?.elements?.[name]?.component;
    } else {
      Component = components[type]?.[name]?.component;
    }

    if (Component) {
      return (
        <AnimationRevealPage disabled>
          <Component />
        </AnimationRevealPage>
      );
    }

    throw new Error('Component Not Found');
  } catch (e) {
    console.error(e);
    return <div>Error: Component Not Found</div>;
  }
};

export default ComponentRenderer;
