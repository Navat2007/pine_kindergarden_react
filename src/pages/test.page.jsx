import React from 'react';
import {motion} from "framer-motion";

const TestPage = () => {

    const variant = {
        hidden: {
            x: 500,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1
            }
        }
    }

    return (
        <motion.div
            whileInView={() => {
                console.log("div in view");
            }}
        >
            <motion.p
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{once: true, amount: 0.2}}
                variants={variant}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
            </motion.p>
            <motion.p
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{once: true, amount: 0.2}}
                variants={variant}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
                <br/>
                <br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores beatae delectus id minus.
                Ad
                aperiam asperiores doloribus error ex id odio quasi quibusdam, repudiandae veritatis! Debitis sint sit
                voluptates.
            </motion.p>
        </motion.div>
    );
};

export default TestPage;