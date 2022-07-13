import React from 'react'
import { Card } from '../../components'

import lightyear from '../../assets/lightyear.jpeg'
import capgemini from '../../assets/capgemini.jpeg'
import maastricht from '../../assets/maastricht.jpeg'

export default function Experience() {
  return (
    <div className="px-10 pt-2 pb-10 h-full">
        <div className="flex flex-col items-center">
            <h2 className='font-semibold text-2xl py-5'>Experience</h2>
            <div className="flex flex-col md:grid grid-cols-2 gap-5">
            <Card 
                company="Capgemini"
                position="Master Thesis Intern"
                date="FEBRUARY 2022 - JULY 2022, Utrecht"
                description="
                My thesis explores the possible models and data types for Crop Classification 
                in Satellite images. For this, an understanding of Deep Learning is required 
                to implement and improve models, and analytic skills are required to assess 
                the different outcomes and benchmarks of the implemented models. The new discovered vision 
                transformers are applied to the problem to evaluate whether they perform better
                than traditional CNN models.
                "
                image={capgemini}
            />
            <Card 
                company="Lightyear"
                position="Working Student"
                date="FEBRUARY 2022 - JULY 2022, Helmond"
                description="
                During one day in the week I have assisted in creating an API which allows 
                the car to get access to weather data, with the aim of creating ML models that can 
                give insights on whether the car is parked correctly with regards to the sun.
                This has taught me how to structure a project that will have many different use cases,
                in the future, especially in the domain of Data Engineering. 
                "
                image={lightyear}
            />
            <Card 
                company="Lightyear"
                position="Business Development Intern"
                date="SEPTEMBER  2021 - JANUARI 2022, Helmond"
                description="
                For this internship I have worked on creating a Business Intelligence tool 
                that can search and analyze patents based on high-level queries, 
                removing the need of in-depth knowledge about patent classifications.
                The results of the search are then translated to an intuitive dashboard 
                allowing any employee to get a clear competition landscape. 
                "
                image={lightyear}
            />
            <Card 
                company="Maastricht University"
                position="Teaching Assistant"
                date="NOVEMBER 2020 - DECEMBER 2021, Maastricht"
                description="
                As a teaching assistant I led hands-on tutorials on campus and online, 
                where the students had to work on assignments. Next to the tutorials, 
                me and my fellow teaching assistants graded the assignments and provided 
                feedback for the students that missed some points.
                "
                image={maastricht}
            />
            </div>
        </div>
    </div>
  )
}