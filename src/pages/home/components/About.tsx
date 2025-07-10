import styles from "./About.module.scss"

export default function About() {
	return (
		<div className={styles.aboutSection}>
			<div className={styles.aboutBG} />
			<div className={styles.aboutContent}>
				<div className={styles.aboutTitleContainer}>
					<h2 className={styles.aboutTitle}>About Us</h2>
					<img className={styles.aboutTitleBottom} src="./assets/images/titleBottomItem.png"></img>
				</div>
				<div className={styles.aboutParaBox}>
					<p className={styles.aboutPara}>Team Anant is a group of passionate undergraduate students harbouring a dream of making BITS-Pilani's first indigenously built nanosatellite. Founded in January 2013 by three students, the team now consists of about forty students from various disciplines, supervised by a panel of faculty members.</p>
				</div>
				<div className={styles.aboutParaBox}>
					<p className={styles.aboutPara}>Our objective is to design, build and launch a 3U nanosatellite with a multispectral camera as a payload. This will be the first of a kind student satellite in India with scope of multispectral imaging implementation. Our mission is the application of imaging in VIS-NIR bands on land. Our primary goal is the implementation of vegetation indices to monitor vegetation. Our primary science output is vegetation mapping and creating a Spatio-temporal analysis for a pre-decided imaging region. We then plan to validate our data against pre-existing satellite data to evaluate the accuracy of our generated values. We also plan to implement secondary missions like the monitoring of crop health, crop yield and biomass.</p>
				</div>
				<div className={styles.aboutParaBox}>
					<p className={styles.aboutPara}>Multispectral Satellite Remote sensing in a 3U satellite is an intensive task that requires ingenious implementations from various branches of engineering. Amongst other things, we are trying to implement Field Programmable Gate Arrays(FPGAs) to implement camera interfacing onboard the satellite with the onboard computer, onboard custom orbit propagators and hardware based task schedulers.</p>
				</div>
			</div>
		</div>
	)
}
