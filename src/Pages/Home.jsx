import BrowseBySubjects from '@/components/Home/BrowseBySubjects';
import LatestUpload from '@/components/Home/LatestUpload';
import DigitalHero from '@/components/nurui/digital-hero';
import React from 'react';

const Home = () => {
    return (
        <div>
            <DigitalHero></DigitalHero>
            <BrowseBySubjects></BrowseBySubjects>
            <LatestUpload></LatestUpload>
        </div>
    );
};

export default Home;