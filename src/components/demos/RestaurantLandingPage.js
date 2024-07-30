import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";

export default () => {
  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Delicious & Affordable <span className="bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block">Meals Near You.</span>
          </>
        }
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        imageCss="rounded-4xl"
        imageDecoratorBlob={true}
        primaryButtonText="Order Now"
        watchVideoButtonText="Meet The Chefs"
      />
      <MainFeature
        subheading={<span className="tracking-wider text-sm font-medium">Established Since 2014</span>}
        heading={
          <>
            We've been serving for
            <wbr /> <span className="bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block">over 5 years.</span>
          </>
        }
        description={
          <span className="inline-block mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
            <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </span>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="Latest Offers"
        imageSrc="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        imageCss="rounded-4xl"
        imageDecoratorBlob={true}
        imageDecoratorBlobCss="absolute left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25"
      />
      <TabGrid
        heading={
          <>
            Checkout our <span className="bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block">menu.</span>
          </>
        }
      />
      <Features
        heading={
          <>
            Amazing <span className="bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block">Services.</span>
          </>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "230+ Locations",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://google.com"
          },
          {
            imageSrc: chefIconImageSrc,
            title: "Professional Chefs",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://timerse.com"
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Birthday Catering",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://reddit.com"
          }
        ]}
        imageContainerCss="p-2"
        imageCss="w-20 h-20"
      />
      <MainFeature2
        subheading={<span className="tracking-wider text-sm font-medium">A Reputed Brand</span>}
        heading={<>Why <span className="bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block">Choose Us ?</span></>}
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+"
          },
          {
            key: "Chefs",
            value: "1500+"
          }
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
        imageCss="bg-cover rounded-4xl"
        imageContainerCss="md:w-1/2 h-auto"
        imageDecoratorBlob={true}
        imageDecoratorBlobCss="absolute left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25"
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={<>Customers <span className="bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block">Love Us.</span></>}
      />
      <DownloadApp
        text={<>People around you are ordering delicious meals using the <span className="bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block">Treact App.</span></>}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
