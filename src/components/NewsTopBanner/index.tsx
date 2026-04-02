"use client";

import { Box, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

// import SamplerImg from 'img/sample/img_sample-thumbnail.png';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';
import useScreenSize from '@/hook/useScreenSize';



interface TopbannerPorps {
    image?: string;
}
const Topbanner = ({ image }: TopbannerPorps) => {
    const { device } = useScreenSize();
    const [deviceType, setDeviceType] = useState<string>('');

    useEffect(() => {
        setDeviceType(device);
    }, [device]);

    gsap.registerPlugin(ScrollTrigger);

    const imgRef = useRef(null);
    const dimRef = useRef(null);
    const trigger = useRef(null);

    useEffect(() => {
        gsap.to(imgRef.current, {
            scrollTrigger: {
                trigger: trigger.current,
                start: 'top top',
                scrub: 2,
            },
            // width: '100%',
            scale:deviceType === 'mobile' ? 1.2 : 2.7  ,
            duration: 0.5,
        });

        gsap.to(dimRef.current, {
            scrollTrigger: {
                trigger: trigger.current,
                start: 'top top',
                scrub: true,
            },
            opacity: 1,
            // width: '100%',
            duration: 0.4,
        });
    }, []);

    return (
        <Box h={['auto', '492px']} overflowY={'clip'} ref={trigger} position={'relative'}>
            <Box
                h={['calc((100vw * 360) / 360)', '492px']}
                w={['auto', '100vw']}
                maxW={['auto','100%']}
                m={'0 auto'}
                borderRadius={['0', '40px']}
                overflow={'hidden'}
                ref={imgRef}
                position={'relative'}
            >
                {/* dimmed 용 */}
                <Box
                    position={'absolute'}
                    top={'0'}
                    left={'0'}
                    w={['100%', '100%']}
                    h={'100%'}
                    // backgroundColor={'#131313'}
                    opacity={'0'}
                    zIndex={1}
                    ref={dimRef}
                ></Box>
                <Image
                    alt="banner img"
                    src={image || '/images/common/default_thumbnail.png'}
                    w={'100%'}
                    h={'100%'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                />
            </Box>
        </Box>
    );
};

export default Topbanner;
