import BrowseBySubjects from '@/components/Home/BrowseBySubjects';
import DigitalHero from '@/components/nurui/digital-hero';
import React from 'react';

const Home = () => {
    return (
        <div>
            <DigitalHero></DigitalHero>
            <BrowseBySubjects></BrowseBySubjects>
        </div>
    );
};

export default Home;