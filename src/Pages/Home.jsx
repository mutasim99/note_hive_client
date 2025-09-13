import BrowseBySubjects from '@/components/Home/BrowseBySubjects';
import CallToAction from '@/components/Home/CallToAction';
import GradientAccordion from '@/components/Home/FrequentlyAsked';
import HowItWorks from '@/components/Home/HowItWorks';
import LatestUpload from '@/components/Home/LatestUpload';
import DigitalHero from '@/components/nurui/digital-hero';
import React from 'react';

const Home = () => {
    return (
        <div>
            <DigitalHero></DigitalHero>
            <BrowseBySubjects></BrowseBySubjects>
            <LatestUpload></LatestUpload>
            <HowItWorks></HowItWorks>
            <CallToAction></CallToAction>
            <GradientAccordion></GradientAccordion>
        </div>
    );
};

export default Home;