import styles from "./MeetTeam.module.scss";

import { forwardRef, useState } from "react";

import heading from "../../../public/assets/images/meet-team/heading.svg";
import centerHead from "../../../public/assets/images/meet-team/center-head.svg";
import leftHead from "../../../public/assets/images/meet-team/left-head.svg";
import rightHead from "../../../public/assets/images/meet-team/right-head.svg";
import centerHeadbg from "../../../public/assets/images/meet-team/center-head-bg.svg";
import leftHeadbg from "../../../public/assets/images/meet-team/left-head-bg.svg";
import rightHeadbg from "../../../public/assets/images/meet-team/right-head-bg.svg";
import user from "../../../public/assets/images/meet-team/user.png";

import StarBackground from "../commonComponent/starbg/StarBackground";
import Card from "./components/Card/Card";
import TeamContainer from "./components/TeamContainer/TeamContainer";

interface NavItem {
  key: string;
  text: React.ReactNode;
  defaultImg: string;
  activeImg: string;
  className: string;
}
const navData: NavItem[][] = [
  [
    {
      key: "adcs1",
      text: (
        <>
          Attitude Determination and
          <br />
          Control System (ADCS)
        </>
      ),
      defaultImg: leftHead,
      activeImg: leftHeadbg,
      className: "leftHead",
    },
    {
      key: "payload",
      text: "Payload Subsystem",
      defaultImg: centerHead,
      activeImg: centerHeadbg,
      className: "centerHead",
    },
    {
      key: "obc",
      text: "On Board Computer (OBC)",
      defaultImg: rightHead,
      activeImg: rightHeadbg,
      className: "rightHead",
    },
  ],
  [
    {
      key: "adcs2",
      text: "Attitude Determination",
      defaultImg: leftHead,
      activeImg: leftHeadbg,
      className: "leftHead",
    },
    {
      key: "rover",
      text: "Rover Subsystem",
      defaultImg: centerHead,
      activeImg: centerHeadbg,
      className: "centerHead",
    },
    {
      key: "siteComputer",
      text: "On Site Computer",
      defaultImg: rightHead,
      activeImg: rightHeadbg,
      className: "rightHead",
    },
  ],
];

const teamMembers = [
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
];
const teamMembers2 = [
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
  { name: "Some Random Long Name", image: user },
];

const MeetTeam = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeKey, setActiveKey] = useState("adcs1");

  const handleNavClick = (rowIdx: number, colIdx: number, key: string) => {
    setActiveKey(key);
    console.log(`Clicked item: ${key} at [${rowIdx}, ${colIdx}]`);
    // Add any logic (routing, animations, etc.) here
  };

  return (
    <div className={styles.teamPage}>
      <StarBackground numOfStars={15}>
        <div className={styles.meetTeam} ref={ref} id="team">
          {/* <span className={styles.separator}></span> */}
          <div className={styles.topTeam}>
            <img src={heading} alt="heading" className={styles.heading} />
            <Card name="Some Random Long Name" image={user} />
            <TeamContainer
              heading="System Team"
              teamMembers={teamMembers}
              className={styles.systemTeam}
            />
          </div>
          {/* <span className={styles.separator}></span> */}
          <div className={styles.bottomTeam}>
            <div className={styles.navigator_container}>
              {navData.map((row, rowIdx) => (
                <div className={styles.navigator} key={`row-${rowIdx}`}>
                  {row.map((item, colIdx) => (
                    <p
                      className={styles[item.className as keyof typeof styles]}
                      key={item.key}
                      onClick={() => handleNavClick(rowIdx, colIdx, item.key)}
                    >
                      {item.text}
                      <img
                        src={
                          activeKey === item.key
                            ? item.activeImg
                            : item.defaultImg
                        }
                        alt={item.className}
                      />
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <TeamContainer
              heading="Senior Members - 2023"
              teamMembers={teamMembers2}
              className={styles.seniorTeam}
            />
            <TeamContainer
              heading="Junior Members - 2024"
              teamMembers={teamMembers2}
              className={styles.juniorTeam}
            />
          </div>
          {/* <span className={styles.separator}></span> */}
        </div>
      </StarBackground>
    </div>
  );
});

export default MeetTeam;
