import React from 'react';
import Particles from 'react-tsparticles';

const ParticleSettings = () => {
	return (
		<div>
			<Particles
				height='100vh'
				width='100vw'
				id='tsparticles'
				options={{
					fpsLimit: 60,
					particles: {
						number: {
							value: 100,
							density: {
								enable: true,
								value_area: 1000,
							},
						},
						collisions: {
							enable: true,
						},
						color: {
							value: ['#aa73ff', '#f8c210', '#83d238', '#33b1f8'],
						},
						shape: {
							type: 'circle',
							stroke: {
								width: 0.1,
								color: '#000000',
							},
							polygon: {
								nb_sides: 15,
							},
						},
						opacity: {
							value: 0.5,
							random: false,
							anim: {
								enable: false,
								speed: 1.5,
								opacity_min: 0.15,
								sync: false,
							},
						},
						size: {
							value: 2.5,
							random: false,
							anim: {
								enable: true,
								speed: 2,
								size_min: 0.15,
								sync: false,
							},
						},
						line_linked: {
							enable: true,
							distance: 110,
							color: '#33b1f8',
							opacity: 0.25,
							width: 1,
						},
						move: {
							enable: true,
							speed: 1.6,
							direction: 'none',
							random: false,
							straight: false,
							out_mode: 'out',
							bounce: false,
							attract: {
								enable: false,
								rotateX: 600,
								rotateY: 1200,
							},
						},
					},
					interactivity: {
						detect_on: 'canvas',
						events: {
							onhover: {
								enable: true,
								mode: 'bubble',
							},
							onclick: {
								enable: true,
								mode: 'push',
							},
							resize: true,
						},
						modes: {
							grab: {
								distance: 400,
								line_linked: {
									opacity: 1,
								},
							},
							bubble: {
								distance: 100,
								size: 10,
								duration: 1.5,
								opacity: 3,
								speed: 3,
							},
							repulse: {
								distance: 100,
								duration: 0.4,
							},
							push: {
								particles_nb: 4,
							},
							remove: {
								particles_nb: 2,
							},
						},
					},
					retina_detect: true,
				}}
			/>
		</div>
	);
};

export default ParticleSettings;
