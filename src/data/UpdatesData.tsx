export type UpdateItem = {
	id: number;
	title: string;
	image: string;
	date: string;
	category: 'Conference' | 'Workshop' | 'Event';
	description: React.ReactNode;
};

export const updates: UpdateItem[] = [
	{
		id: 1,
		title: 'International Astronautical Congress (IAC) 2024',
		image: '/img1.jpg',
		date: '2025-06-30',
		category: 'Conference',
		description: 'We successfully presented a conference paper at the International Astronautical Congress (IAC) 2024 held in Milan, Italy, followed by its official publication. The paper, titled “Dynamic Simulation of Electrical and Thermal Systems for Rapid Design Iteration and Validation of Power Profiles for 3U Imaging CubeSat,” highlighted our innovative approach to simulating satellite subsystems for efficient and accurate mission planning.',
	},
	{
		id: 2,
		title: 'International Aero-Astro Space Conclave (IAASC)',
		image: ('/image.jpg'),
		date: '2025-07-01',
		category: 'Event',
		description: 'During APOGEE 2024, we successfully organised the International Aero-Astro Space Conclave (IAASC), a landmark event that brought together leaders and enthusiasts from across the space sector. The conclave featured insightful panel talks with industry experts, including a special session with NASA astronaut Dr. Anil Menon. An engaging space-tech expo showcased innovations from over 10 leading companies, including GalaxEye, Paanduv Applications, and SkyServe. Additionally, the team initiated a formal request for a downlink from the International Space Station (ISS), marking a significant step toward real-time satellite communication.',
	},
	{
		id: 3,
		title: 'Finalists at CanSat India',
		image: '/img3.jpg',
		date: '2025-06-25',
		category: 'Event',
		description: 'We reached the finals of CanSat India, a prestigious national-level competition organised by the Aeronautical Society of India, IN-SPACe, and ISRO, held in Ahmedabad. This milestone marked a significant achievement for our team, as we successfully designed, built, and demonstrated a functional CanSat system that met rigorous technical and mission-specific requirements. The competition challenged us to integrate multiple subsystems within strict constraints, reflecting real-world aerospace engineering scenarios. Advancing to the finals validated our team’s capability in satellite systems design, simulation, and deployment, and provided us with valuable exposure to experts from the Indian space ecosystem.',
	},
	{
		id: 4,
		title: 'ISRO Immersion Challenge',
		image: '/img3.jpg',
		date: '2025-06-25',
		category: 'Event',
		description: 'We were among the top 50 teams selected for the ISRO Immersion Challenge, hosted by IIIT Hyderabad. This challenge brought together some of the most innovative student teams from across the country to explore real-world problem statements in the space sector. Being invited to participate provided us with the opportunity to engage closely with experts, present our ideas, and gain deeper insights into cutting-edge developments in space technology, further strengthening our technical and problem-solving capabilities.',
	},
	{
		id: 5,
		title: 'DefSAT by SIA-India',
		image: '/img3.jpg',
		date: '2025-06-25',
		category: 'Conference',
		description: 'We were part of the DefSAT Conference, a prominent space and defence-focused event organised by SIA-India in Delhi. The conference served as a platform to engage with key stakeholders from the aerospace and defence sectors, including policymakers, industry leaders, and researchers. Our participation offered valuable exposure to emerging trends in satellite technology and defence applications, while also opening avenues for collaboration and knowledge exchange within the strategic space domain.',
	},
	{
		id: 6,
		title: 'Planetarium show & Rocketry Workshop',
		image: '/img3.jpg',
		date: '2025-06-25',
		category: 'Workshop',
		description: (<>
			<p>In Apogee 2024, we hosted the Planetarium Show, an immersive astronomical experience that transported attendees through the wonders of the universe. The show featured high-resolution projections of celestial phenomena, guided explanations of constellations, planetary systems, and deep-space objects, and interactive segments that sparked curiosity about space science and exploration. Designed for students and enthusiasts alike, the event aimed to blend education with awe, leaving the audience with a renewed sense of wonder about the cosmos.</p> <p> We also organised a rocketry workshop. The rocketry workshop offered participants a hands-on introduction to the fundamentals of rocket design and launch. It combined theoretical concepts with practical building sessions, sparking curiosity and technical interest among attendees.</p></>),
	},
	{
		id: 7,
		title: '72nd International Astronautical Congress 2021',
		image: '/img3.jpg',
		date: '2021-10-01',
		category: 'Conference',
		description: 'October 2021: Four members of the team represented Anant at the 72nd International Astronautical Congress 2021 held at Dubai, UAE from 25th to 29th. Mridul Saxena,Ahaan Shah,Jay Panchal and Kartikey Srivastava of the structural and thermal subsystem were the authors of two papers presented at the conference. The first paper describes the design and prototyping of noval antenna deployment system for CubeSat . The second paper describes the structure and vibrational analysis of structure of a 3U CubeSat.',
	},
	{
		id: 8,
		title: ("Arsh — Team Anant's premier event"),
		image: '/img3.jpg',
		date: '2025-06-25',
		category: 'Event',
		description: (<>
			<p>
				It was with great pleasure that we hosted <strong>ARSH</strong>, a unique interactive talk session featuring leaders from both the public and private sectors, who shared first-hand accounts of their experiences working in the space industry. Our objective was to create awareness about current opportunities in the space sector and guide students on how to prepare for them.</p>
			<p><strong>Talk 1:</strong> Held on 2nd April, from 9:00 PM to 10:30 PM</p>
			<p><strong>Speaker:</strong> Karthik Dokania, Senior Systems Engineer, NewSpace Research and Technologies</p>
			<p><strong>Talk 2:</strong> Held on 4th April, from 9:00 PM to 10:30 PM</p>
			<p><strong>Speaker:</strong> Debadatta Mishra, Senior Space Systems Design Engineer and Project Manager, ISRO</p></>),
	},
	{
		id: 9,
		title: 'IEEE Aerospace Conference 2020',
		image: '/img3.jpg',
		date: '2020-03-03',
		category: 'Conference',
		description: 'March 2020: Nishant Gupta represented the team at the IEEE Aerospace conference 2020 held at Yellowstone, Montana, USA. Nishant was the telemetry subsystem lead and author of two out of three papers presented at the conference. The first paper describes the design procedure of an onboard and ground station telemetry architecture for a Cubesat. The second paper is primarily authored by Avishek Prasad, and details the interface architecture between the Telemetry and OBC subsystems. Lastly, Nishant presented a paper on behalf of other team members from ADCS. This paper investigates the instabilities in detumbling algorithms, which are used to lower the angular velocity of a satellite.',
	},
	{
		id: 10,
		title: 'International Astronautical Congress 2019',
		image: '/img3.jpg',
		date: '2019-10-01',
		category: 'Conference',
		description: 'October 2019: Nihal Singh represented BITS Pilani at the International Astronautical Congress in Washington D.C., USA. He presented an EPS subsystem paper describing the hardware architecture of the subsystem including an overview of the circuit simulations performed and the hardware testing results obtained.',
	},
	{
		id: 11,
		title: '11th European CubeSat Symposium',
		image: '/img3.jpg',
		date: '2019-09-01',
		category: 'Conference',
		description: (<>
			<p>September 2019: Nishant Gupta represented BITS Pilani at the 11th European CubeSat Symposium held at the University of Luxembourg, Luxembourg. European CubeSat Symposium is the major CubeSat and NanoSat event in Europe.</p>
			<p>Nishant gave a presentation on the flight plan design for a telemetry microcontroller. Basically, various modes, the telemetry microcontroller will undergo during its flight, depending upon the situation.</p></>),
	},
	{
		id: 12,
		title: 'Team Anant visits ICSS Hyderabad',
		image: '/img3.jpg',
		date: '2019-09-01',
		category: 'Event',
		description: "February 2019: The team participated in a student competition and won the third position. ADCS presented their orbital simulator, the Mechanical and Thermal Subsystem presented their thermal control system and the Payload subsystem presented their Filter Wheel prototype. Tushar Goyal's orbit propagator got distinctly praised by Mr. V.K. Saraswat, member of NITI Aayog. The members also attended a workshop on small satellite design and various presentations.",
	},
	{
		id: 13,
		title: 'The team at IIT Bombay',
		image: '/img3.jpg',
		date: '2019-09-01',
		category: 'Workshop',
		description: 'January 2019: 4 members of the team visited IIT Bombay, home of the Pratham nano-satellite to attend their workshop on ground station development. In addition, the KJ Somaiya Institute of Engineering and Information Technology presented their lessons on ground station manufacturing.',
	}
];
